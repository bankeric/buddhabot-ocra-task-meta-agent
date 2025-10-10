from datetime import datetime, UTC
from flask import request, jsonify, g
from __init__ import admin_required, app, login_required
from services.handle_permissions import check_permissions_to_delete_user
from services.handle_social import get_social_share
from services.handle_subscription import count_subscription_in_month
from services.handle_user import (
    count_new_users, get_all_users, count_active_users, get_user_by_id, update_user, delete_user, 
    check_user_permissions, UserError, get_user_stats, create_user, get_retention_rate
)
from data_classes.common_classes import UserRole


@app.route('/api/v1/users', methods=['POST'])
@login_required
def create_user_endpoint():
    """Create a new user - Admin only"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404

        # Check if user has permission to create users (admin only)
        if not check_user_permissions(current_user["uuid"], action="create"):
            return jsonify({"error": "Insufficient permissions"}), 403

        # Get request data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ["email", "password"]
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Field '{field}' is required"}), 400

        # Validate email format (basic validation)
        if "@" not in data["email"]:
            return jsonify({"error": "Invalid email format"}), 400

        # Prepare user data
        user_data = {
            "email": data["email"],
            "password": data["password"],
            "name": data.get("name", data["email"]),  # Use email as name if not provided
            "role": data.get("role", UserRole.VIEWER.value)  # Default to viewer role
        }

        # Validate role if provided
        if "role" in data:
            valid_roles = [role.value for role in UserRole]
            if data["role"] not in valid_roles:
                return jsonify({"error": f"Invalid role. Must be one of: {', '.join(valid_roles)}"}), 400

        # Create user
        user_id = create_user(user_data)
        
        # Get created user
        created_user = get_user_by_id(user_id)
        
        return jsonify({
            "message": "User created successfully",
            "user": created_user
        }), 201

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in create_user_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/users', methods=['GET'])
@admin_required
def get_users():
    """Get list of users - Admin only"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404

        # Get query parameters for pagination
        limit = request.args.get('limit', 100, type=int)
        offset = request.args.get('offset', 0, type=int)
        search = request.args.get('search', '', type=str)
        # Ensure reasonable limits
        limit = min(limit, 1000)  # Max 1000 users per request
        offset = max(offset, 0)

        # Get users
        users = get_all_users(limit=limit, offset=offset, search=search)
        
        return jsonify({
            "users": users,
            "limit": limit,
            "offset": offset,
            "count": len(users)
        }), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_users: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/users/<user_id>', methods=['GET'])
@admin_required
def get_user(user_id):
    """Get single user by ID"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404
        # Get user
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"user": user}), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_user: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/users/<user_id>', methods=['PUT'])
@admin_required
def update_user_endpoint(user_id):
    """Update user by ID"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404

        # Get request data
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        allowed_fields = ["name", "password", "role"]
        update_data = {}
        
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return jsonify({"error": "No valid fields to update"}), 400

        # Update user
        success = update_user(user_id, update_data)
        if not success:
            return jsonify({"error": "Failed to update user"}), 500

        # Get updated user
        updated_user = get_user_by_id(user_id)
        
        return jsonify({
            "message": "User updated successfully",
            "user": updated_user
        }), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in update_user_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/users/<user_id>', methods=['DELETE'])
@admin_required
def delete_user_endpoint(user_id):
    """Delete user by ID"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404

        is_permission_valid = check_permissions_to_delete_user(
            current_user_role=current_user["role"],
            target_user_role=get_user_by_id(user_id)["role"] if get_user_by_id(user_id) else '',
            is_self_deletion=(current_user["uuid"] == user_id)
        )

        if not is_permission_valid:
            return jsonify({"error": "Insufficient permissions to delete user"}), 403

        # Delete user
        success = delete_user(user_id)
        if not success:
            return jsonify({"error": "Failed to delete user"}), 500

        return jsonify({"message": "User deleted successfully"}), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_user_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# get current user
@app.route('/api/v1/users/me', methods=['GET'])
@login_required
def get_current_user():
    """Get current user"""
    try:
        current_user = get_user_by_id(g.user_id)
        update_user(g.user_id, {"last_login_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")})
        if not current_user:
            return jsonify({"error": "User not found"}), 404
        return jsonify({"user": current_user}), 200
    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_current_user: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/users/stats', methods=['GET'])
@login_required
def get_user_stats_endpoint():
    """Get user statistics - Admin only"""
    try:
        # Get current user to check permissions
        current_user = get_user_by_id(g.user_id)
        if not current_user:
            return jsonify({"error": "User not found"}), 404

        # Check if user has permission to view stats (admin only)
        if not check_user_permissions(current_user["uuid"], action="stats"):
            return jsonify({"error": "Insufficient permissions"}), 403

        stats = get_user_stats()        
        return jsonify(stats), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_user_stats: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/api/v1/users/statistic', methods=['GET'])
def get_user_statistics():
    """Get user statistics - Admin only"""
    try: 
        new_users = count_new_users()
        active_users = count_active_users()
        retention_rate = get_retention_rate()
        social_share = get_social_share()
        subscription_count = count_subscription_in_month()
        
        return jsonify({
            "new_users": new_users,
            "active_users": active_users,
            "retention_rate": retention_rate,
            "social_share": social_share,
            "subscriptions_this_month": subscription_count
        }), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_user_statistics: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Add one time endpoint to set owner 
@app.route('/api/v1/users/set_owner/<user_id>', methods=['PUT'])
def set_owner(user_id):
    """Set initial owner user - One time use"""
    try:
        # Check if any owner already exists
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Set user as owner
        success = update_user(user_id, {"role": UserRole.OWNER.value})
        if not success:
            return jsonify({"error": "Failed to set user as owner"}), 500

        # Get updated user
        updated_user = get_user_by_id(user_id)
        
        return jsonify({
            "message": "User set as owner successfully",
            "user": updated_user
        }), 200

    except UserError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in set_owner: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500