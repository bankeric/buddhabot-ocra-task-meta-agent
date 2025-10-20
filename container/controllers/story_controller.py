from __init__ import app, login_required, contributor_required
from flask import request, jsonify
from services.handle_story import create_story, update_story, delete_story, StoryError, get_story_by_id, get_stories_by_filters
from data_classes.common_classes import CreateStoryRequest



# Story Controller
# Create a new story
@app.route('/api/v1/stories', methods=['POST'])
@contributor_required
def create_story_endpoint():
    """ Create a new story """
    try:
        data = request.get_json()
        author = data.get('author', '')
        title = data.get('title', '')
        content = data.get('content', '')
        language = data.get('language', 'en')
        category_id = data.get('category_id', '')
        status = data.get('status', 'draft')

        if not all([title, content]):
            return jsonify({"error": "Missing required fields"}), 400

        data = CreateStoryRequest(
            author=author,
            title=title,
            content=content,
            language=language,
            category_id=category_id,
            status=status
        )

        
        story_id = create_story(data)
        return jsonify({"message": "Story created successfully", "story_id": story_id}), 201
    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in create_story_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/stories/<story_id>', methods=['GET'])
def get_story_endpoint(story_id):
    """ Get a specific story by ID """
    try:
        story = get_story_by_id(story_id)
        return jsonify({
            "status": "success",
            "data": story
        }), 200
    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_story_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/v1/stories/<story_id>', methods=['PUT'])
@contributor_required
def update_story_endpoint(story_id):
    """ Update a specific story by ID """
    try:
        data = request.json
        title = data.get('title')
        content = data.get('content')
        language = data.get('language')
        category_id = data.get('category_id')
        status = data.get('status')

        if not any([title, content, language, category_id, status]):
            return jsonify({"error": "No fields to update"}), 400

        story = get_story_by_id(story_id)
        if not story:
            return jsonify({"error": "Story not found"}), 404

        update_data = {k: v for k, v in {
            "title": title,
            "content": content,
            "language": language,
            "category_id": category_id,
            "status": status
        }.items() if v is not None}

        update_story(story_id, update_data)

        return jsonify({
            "message": "Story updated successfully"
        }), 200

    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in update_story_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/v1/stories/<story_id>', methods=['DELETE'])
@contributor_required
def delete_story_endpoint(story_id):
    """ Delete a specific story by ID """
    try:
        story = get_story_by_id(story_id)
        if not story:
            return jsonify({"error": "Story not found"}), 404

        delete_story(story_id)
        return jsonify({
            "message": "Story deleted successfully"
        }), 200

    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in delete_story_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Get all stories with optional filters
@app.route('/api/v1/stories', methods=['GET'])
def get_stories_endpoint():
    """ Get all stories with optional filters """
    try:
        filters = {
            "author": request.args.get('author'),
            "language": request.args.get('language'),
            "category": request.args.get('category'),
            "status": request.args.get('status')
        }
        # Remove None values from filters
        filters = {k: v for k, v in filters.items() if v is not None}

        stories = get_stories_by_filters(filters)
        return jsonify({
            "status": "success",
            "data": stories
        }), 200

    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_stories_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
# Get one story by ID
@app.route('/api/v1/stories/<story_id>', methods=['GET'])
def get_one_story_endpoint(story_id):
    """ Get one story by ID """
    try:
        story = get_story_by_id(story_id)
        return jsonify({
            "status": "success",
            "data": story
        }), 200
    except StoryError as e:
        return jsonify({"error": e.message}), e.status_code
    except Exception as e:
        print(f"Error in get_one_story_endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500