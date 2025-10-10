import os
import stripe
from flask import Flask, request, jsonify, g
from __init__ import app, login_required
from data_classes.common_classes import CreateSubscriptionRequest
from services.handle_stripe import get_level_from_price_id
from services.handle_subscription import create_subscription



stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@app.route("/api/v1/stripe/create-checkout-session", methods=["POST"])
@login_required
def create_checkout_session():

    params = request.get_json()

    price_id = params.get("price_id")
    email = params.get("email")


    if(not price_id or not email):
        return jsonify(error="Missing required fields"), 400

    try:
        session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            customer_email=email,
            metadata={
                "user_id": g.user_id
            },
            subscription_data={
                "metadata": {
                    "user_id": g.user_id
                }
            },  
            mode="subscription",
            success_url=os.getenv("FRONTEND_URL") + "/payment/success",
            cancel_url=os.getenv("FRONTEND_URL") + "/payment/cancel",
        )
        return jsonify({"id": session.id, "url": session.url})
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/api/v1/stripe/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        intent = stripe.PaymentIntent.create(
            amount=2000,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return jsonify({"clientSecret": intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/api/v1/stripe/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")

    try:
        # Xác minh tính hợp lệ của webhook (Stripe ký request)
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        # Dữ liệu không hợp lệ
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError:
        # Chữ ký sai (có thể request giả mạo)
        return "Invalid signature", 400

    # ✅ Xử lý các loại event mà bạn cần
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print(f"💰 Thanh toán thành công: {session['id']}")
        # TODO: cập nhật đơn hàng trong DB ở đây

    elif event["type"] == "customer.subscription.created":
        subscription = event["data"]["object"]
        create_subscription(
            params=(create_subscription_request := CreateSubscriptionRequest(
                user_id=subscription['metadata']['user_id'] if 'metadata' in subscription and 'user_id' in subscription['metadata'] else 'unknown',
                tx_id=subscription['id'],
                level=get_level_from_price_id(subscription['items']['data'][0]['price']['id']),
                status=subscription['status'],
                start_date=subscription['items']['data'][0]['current_period_start'],
                ended_at=subscription['items']['data'][0]['current_period_end']
            ))
        )

    # Luôn trả về 200 để Stripe biết webhook đã nhận
    return jsonify(success=True)