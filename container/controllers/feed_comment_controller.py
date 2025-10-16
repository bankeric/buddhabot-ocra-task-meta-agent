from __init__ import app, login_required
from flask import  request, jsonify, g
from services.handle_feed import FeedError, create_feed_entry, get_feeds_by_user_id, get_new_feeds, update_feed_entry, delete_feeds_by_user_id, like_feed_entry, retweet_feed_entry
from data_classes.common_classes import  CreateCommentFeedRequest
from services.handle_feed_comment import FeedCommentError, create_feed_comment, delete_comments_by_feed_id, delete_feed_comment, get_comments_by_feed_id, like_feed_comment, update_feed_comment



@app.route('/api/v1/feed-comment', methods=['POST'])
@login_required
def create_feed_comment_endpoint():
    """Create a new comment entry"""
    try:
        data = request.json
        user_id = g.user_id  # Assuming user_id is set in g by authentication middleware
        feed_id = data.get('feed_id')
        content = data.get('content')

        if not all([user_id, feed_id, content]):
            return jsonify({"error": "Missing required fields"}), 400

        comment_data = CreateCommentFeedRequest(
            user_id=user_id,
            feed_id=feed_id,
            content=content
        )
        comment_id = create_feed_comment(comment_data)
        return jsonify({"message": "Comment created successfully", "comment_id": comment_id}), 201
    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/v1/feed/<feed_id>/comments', methods=['GET'])
@login_required
def get_feed_comments_endpoint(feed_id: str):
    """Get comments for a specific feed"""
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))

        comments = get_comments_by_feed_id(feed_id, limit, offset)

        return jsonify({
            "status": "success",
            "data": comments
        }), 200

    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_feed_comments_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed-comment/<comment_id>', methods=['PUT'])
@login_required
def update_feed_comment_endpoint(comment_id: str):
    """Update a feed comment"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided for update"}), 400

        result = update_feed_comment(comment_id, data)
        return jsonify({"message": result}), 200

    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in update_feed_comment_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500 
    
@app.route('/api/v1/feed-comment/<comment_id>', methods=['DELETE'])
@login_required
def delete_feed_comment_endpoint(comment_id: str):
    """Delete a feed comment"""
    try:
        result = delete_feed_comment(comment_id)
        return jsonify({"message": result}), 200

    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_feed_comment_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed/<feed_id>/comments', methods=['DELETE'])
@login_required
def delete_feed_comments_by_feed_id_endpoint(feed_id: str):
    """Delete all comments associated with a specific feed ID"""
    try:
        result = delete_comments_by_feed_id(feed_id)
        return jsonify({"message": result}), 200

    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_feed_comments_by_feed_id_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/feed-comment/<comment_id>/like', methods=['POST'])
@login_required
def like_feed_comment_endpoint(comment_id: str):
    """Like a feed comment"""
    try:
        user_id = g.user_id  # Assuming user_id is set in g by authentication middleware
        if not user_id:
            return jsonify({"error": "User not authenticated"}), 401

        result = like_feed_comment(comment_id, user_id)
        return jsonify({"message": result}), 200

    except FeedCommentError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in like_feed_comment_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500