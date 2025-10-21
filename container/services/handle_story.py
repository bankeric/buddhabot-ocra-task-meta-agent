from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import COLLECTION_CATEGORIES, COLLECTION_FEED_COMMENTS, COLLECTION_STORIES, search_non_vector_collection, update_collection_object, insert_to_collection, delete_collection_object
from weaviate.classes.query import Filter, Sort
from data_classes.common_classes import CreateStoryRequest

class StoryError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def create_story(request: CreateStoryRequest) -> str:
    """Create a new story"""
    data = {
        "author": request.author,
        "title": request.title,
        "content": request.content,
        "language": request.language,
        "category_id": request.category_id,
        "status": request.status,
        "image_url": request.image_url,
        "audio_url": request.audio_url,
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    story_id = insert_to_collection(COLLECTION_STORIES, data)
    return story_id

def get_all_stories(limit: int, offset: int) -> list[dict]:
    """Get all stories with pagination"""
    properties = ["author", "title", "content", "language", "category_id", "status", "created_at", "updated_at", "image_url", "audio_url"]
    stories = search_non_vector_collection(COLLECTION_STORIES, limit=limit, properties=properties, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def update_story(story_id: str, updated_data: dict) -> None:
    """Update a story"""
    updated_data["updated_at"] = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    update_collection_object(COLLECTION_STORIES, story_id, updated_data)
    return 'Story updated successfully'

def delete_story(story_id: str) -> None:
    """Delete a story"""
    delete_collection_object(COLLECTION_STORIES, story_id)
    return 'Story deleted successfully'

def get_story_by_id(story_id: str) -> dict:
    """Get a story by its ID"""
    filters = Filter.by_id().equal(story_id)
    properties = ["author", "title", "content", "language", "category_id", "status", "created_at", "updated_at", "image_url", "audio_url"]
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, properties=properties)

    if not stories:
        raise StoryError("Story not found", 404)
    
    return stories[0]

def get_stories_by_author(author: str, limit: int, offset: int) -> list[dict]:
    """Get stories by author with pagination"""
    filters = Filter("author").eq(author)
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def get_stories_by_category(category_id: str, limit: int, offset: int) -> list[dict]:
    """Get stories by category with pagination"""
    filters = Filter("category_id").eq(category_id)
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def get_stories_by_status(status: str, limit: int, offset: int) -> list[dict]:
    """Get stories by status with pagination"""
    filters = Filter("status").eq(status)
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def get_stories_by_language(language: str, limit: int, offset: int) -> list[dict]:
    """Get stories by language with pagination"""
    filters = Filter("language").eq(language)
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def get_stories_by_type(story_type: str, limit: int, offset: int) -> list[dict]:
    """Get stories by type with pagination"""
    filters = Filter("type").eq(story_type)
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return stories

def get_stories_by_filters(filters: dict, limit: int = 10, offset: int = 0) -> list[dict]:
    """Get stories by multiple filters with pagination"""
    weaviate_filters = []
    for key, value in filters.items():
        weaviate_filters.append(Filter(key).eq(value))
    
    if weaviate_filters:
        combined_filter = weaviate_filters[0]
        for f in weaviate_filters[1:]:
            combined_filter = combined_filter.and_(f)
    else:
        combined_filter = None

    properties = ["author", "title", "content", "language", "category_id", "status", "created_at", "updated_at", "image_url", "audio_url"]
    stories = search_non_vector_collection(COLLECTION_STORIES, filters=combined_filter, limit=limit, offset=offset, sort=Sort.by_property("created_at", ascending=False), properties=properties)
    return stories