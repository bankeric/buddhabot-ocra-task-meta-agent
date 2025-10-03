
from __init__ import app
from flask import  request, jsonify, g
from services.handle_social import SocialError, share_on_social_media



@app.route('/api/v1/social', methods=['POST'])
def create_social_share():
    """Create a new social media share"""
    try:
        data = request.json
        platform = data.get('platform')

        if not platform:
            return jsonify({"error": "Platform is required"}), 400
        
        total_shares = share_on_social_media(platform)

        return jsonify({
            "message": "Social shared successfully",
            "count": total_shares
        }), 201

    except SocialError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in create_social_share: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

