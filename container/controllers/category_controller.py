from __init__ import app, login_required, contributor_required, admin_required
from flask import request, jsonify, g
from data_classes.common_classes import CreateCategoryRequest
from services.handle_category import get_all_categories, CategoryError, create_category, get_category_by_id, update_category, delete_category




@app.route('/api/v1/categories', methods=['POST'])
@admin_required
def create_category_endpoint():
    """ Create a new category """
    try:
        data = request.json
        name = data.get('name')
        description = data.get('description')
        type = data.get('type')
        author_group = data.get('author_group')
        language = data.get('language')

        if not all([name, description, type, author_group, language]):
            return jsonify({"error": "Missing required fields"}), 400
        
        category_id = create_category(
            CreateCategoryRequest(
                name=name,
                description=description,
                type=type,
                author_group=author_group,
                language=language
            )
        )

        return jsonify({
            "message": "Feed created successfully",
            "category_id": category_id
        }), 201

    except CategoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in create_category_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/categories', methods=['GET'])
def get_categories_endpoint():
    """ Get all categories with optional filters and pagination """
    try:
        data = request.args
        # Potentially handle filters from query params in future

        limit = int(data.get('limit', 10))
        offset = int(data.get('offset', 0))
        include_stories = data.get('include_stories', 'false').lower() == 'true'
        filters = {
            "language": data.get('language')
        }
        # Remove None values from filters
        filters = {k: v for k, v in filters.items() if v is not None}
        categories = get_all_categories(limit=limit, offset=offset, include_stories=include_stories, filters=filters)

        return jsonify({
            "status": "success",
            "data": categories
        }), 200

    except CategoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_categories_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/categories/<category_id>', methods=['GET'])
def get_category_endpoint(category_id: str):
    """ Get a specific category by ID """
    try:
        category = get_category_by_id(category_id)
        return jsonify({
            "status": "success",
            "data": category
        }), 200

    except CategoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_category_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Update category endpoint -- Admin only
@app.route('/api/v1/categories/<category_id>', methods=['PUT'])
@admin_required
def update_category_endpoint(category_id):
    """ Update a specific category by ID """
    try:
        data = request.json
        name = data.get('name')
        description = data.get('description')
        type = data.get('type')
        author_group = data.get('author_group')
        language = data.get('language')

        if not any([name, description, type, author_group, language]):
            return jsonify({"error": "No fields to update"}), 400

        category = get_category_by_id(category_id)
        if not category:
            return jsonify({"error": "Category not found"}), 404
        
        update_data = {k: v for k, v in {
            "name": name,
            "description": description,
            "type": type,
            "author_group": author_group,
            "language": language
        }.items() if v is not None}

        update_category(category_id, update_data)

        return jsonify({
            "message": "Category updated successfully"
        }), 200

    except CategoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in update_category_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Delete category endpoint -- Admin only
@app.route('/api/v1/categories/<category_id>', methods=['DELETE'])
@admin_required
def delete_category_endpoint(category_id):
    """ Delete a specific category by ID """
    try:
        category = get_category_by_id(category_id)
        if not category:
            return jsonify({"error": "Category not found"}), 404

        delete_category(category_id)

        return jsonify({
            "message": "Category deleted successfully"
        }), 200

    except CategoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_category_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500