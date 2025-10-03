
from __init__ import app, login_required
from flask import  request, jsonify, g
from data_classes.common_classes import CreateSubscriptionRequest
from services.handle_subscription import SubscriptionError, get_one_subscription, create_subscription



@app.route('/api/v1/subscription', methods=['POST'])
@login_required
def create_subscription():
    """Create a new subscription"""
    try:
        params = request.get_json()
        
        payload: CreateSubscriptionRequest = {
            "user_id": g.user_id,
            "level": params.get("level"),
            "tx_id": params.get("tx_id")
        }
      
        subscription = create_subscription(payload)

        if not subscription:
            return jsonify({"error": "Subscription not found"}), 404

        return jsonify({
            "message": "Subscription retrieved successfully",
            "data": subscription
        }), 200

    except SubscriptionError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_one_subscription: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/subscription/<user_id>', methods=['GET'])
def get_subscription(user_id: str):
    """Get one subscription by user_id"""
    try:

        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
      
        subscription = get_one_subscription(user_id)

        if not subscription:
            return jsonify({"error": "Subscription not found"}), 404

        return jsonify({
            "message": "Subscription retrieved successfully",
            "data": subscription
        }), 200

    except SubscriptionError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_one_subscription: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


