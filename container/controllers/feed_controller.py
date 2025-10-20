from __init__ import app, login_required
from flask import  request, jsonify, g
from services.handle_feed import FeedError, create_feed_entry, get_feed_by_id, get_feeds_by_user_id, get_new_feeds, update_feed_entry, delete_feeds_by_user_id, like_feed_entry, retweet_feed_entry, delete_feed_entry
from data_classes.common_classes import CreateFeedRequest



@app.route('/api/v1/feed', methods=['POST'])
@login_required
def create_feed_endpoint():
    """Create a new feed entry"""
    try:
        data = request.json
        user_id = g.user_id  # Assuming user_id is set in g by authentication middleware
        content = data.get('content')
        agent_id = data.get('agent_id')
        agent_content = data.get('agent_content')
        user_question = data.get('user_question')

        if not all([user_id, content, agent_id, agent_content, user_question]):
            return jsonify({"error": "Missing required fields"}), 400

        feed_data = CreateFeedRequest(
            user_id=user_id,
            content=content,
            agent_id=agent_id,
            agent_content=agent_content,
            user_question=user_question
        )
        feed_id = create_feed_entry(feed_data)

        return jsonify({
            "message": "Feed created successfully",
            "feed_id": feed_id
        }), 201

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in create_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/user/feeds/<user_id>', methods=['GET'])
@login_required
def get_user_feeds_endpoint(user_id: str):
    """Get feeds by user ID"""
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))

        feeds = get_feeds_by_user_id(user_id, limit, offset)

        return jsonify({
            "status": "success",
            "data": feeds
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_user_feeds_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500 

@app.route('/api/v1/feeds', methods=['GET'])
@login_required
def get_feeds_endpoint():
    """Get feeds by user ID"""
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))

        filters = {
            "user_id": request.args.get('user_id'),
            "agent_id": request.args.get('agent_id'),
            "type": request.args.get('type'),
        }

        # Remove None values from filters
        filters = {k: v for k, v in filters.items() if v is not None}

        feeds = get_new_feeds(limit, offset, filters=filters)

        return jsonify({
            "status": "success",
            "data": feeds
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_feeds_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/feed/<feed_id>', methods=['PUT'])
@login_required
def update_feed_endpoint(feed_id: str):
    """Update a feed entry"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided for update"}), 400

        update_feed_entry(feed_id, data)

        return jsonify({
            "message": "Feed updated successfully"
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in update_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/user/feeds/<user_id>', methods=['DELETE'])
@login_required
def delete_user_feeds_endpoint(user_id: str):
    """Delete feeds by user ID"""
    try:
        delete_feeds_by_user_id(user_id)

        return jsonify({
            "message": "Feeds deleted successfully"
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_user_feeds_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed/<feed_id>/like', methods=['POST'])
@login_required
def like_feed_endpoint(feed_id: str):
    """Like or dislike a feed entry"""
    try:
        user_id = g.user_id  # Assuming user_id is set in g by authentication middleware
        if not user_id:
            return jsonify({"error": "User not authenticated"}), 401

        like_feed_entry(feed_id, user_id)

        return jsonify({
            "message": "Feed liked successfully"
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in like_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed/<feed_id>/retweet', methods=['POST'])
@login_required
def retweet_feed_endpoint(feed_id: str):
    """Retweet a feed entry"""
    try:
        user_id = g.user_id
        data = request.json
        content: str = data.get('content', '')

        retweet_feed_entry(user_id, feed_id, content)

        return jsonify({
            "message": "Feed retweeted successfully"
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in retweet_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed/<feed_id>', methods=['GET'])
@login_required
def get_feed_endpoint(feed_id: str):
    """Get a feed by its ID"""
    try:
        feed = get_feed_by_id(feed_id)

        return jsonify({
            "status": "success",
            "data": feed
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Delete a feed by its ID - Optional, not implemented in service layer
@app.route('/api/v1/feed/<feed_id>', methods=['DELETE'])
@login_required
def delete_feed_endpoint(feed_id: str):
    """Delete a feed by its ID"""
    try:

        delete_feed_entry(feed_id)

        return jsonify({
            "message": "Feed deleted successfully"
        }), 200

    except FeedError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_feed_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500