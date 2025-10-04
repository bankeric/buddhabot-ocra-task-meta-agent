import os
import stripe
from flask import Flask, request, jsonify
from __init__ import app



stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/api/v1/stripe/create-checkout-session", methods=["POST"])
def create_checkout_session():

    params = request.get_json()
    currency = params.get("currency")
    amount = params.get("amount")
    product_name = params.get("product_name")

    if(not currency or not amount or not product_name):
        return jsonify(error="Missing required fields"), 400

    try:

        print("Creating checkout session for:", product_name, amount, currency)
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],  
            line_items=[
                {
                    "price_data": {
                        "currency": currency,
                        "product_data": {"name": product_name},
                        "unit_amount": amount,  
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=os.getenv("FRONTEND_URL") + "/payment/success",
            cancel_url=os.getenv("FRONTEND_URL") + "/cancel",
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
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError:
        return "Invalid signature", 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print("💰 Payment success:", session)
