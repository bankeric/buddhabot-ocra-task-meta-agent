from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import COLLECTION_CATEGORIES, COLLECTION_STORIES, delete_collection_object, search_non_vector_collection, update_collection_object, insert_to_collection, delete_collection_objects_many
from weaviate.classes.query import Filter
from data_classes.common_classes import CreateCommentFeedRequest

class CategoryError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def create_category(name: str, description: str, type: str, author_group:str) -> str:
    """Create a new category"""
    data = {
        "name": name,
        "description": description,
        "type": type,
        "author_group": author_group,
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    category_id = insert_to_collection(COLLECTION_CATEGORIES, data)
    return category_id

def get_all_categories(limit: int, offset: int, include_stories: bool) -> list[dict]:
    """Get all categories with pagination"""
    categories = search_non_vector_collection(COLLECTION_CATEGORIES, limit=limit, offset=offset, properties=["name", "description","type", "author_group", "created_at", "updated_at"])
    if include_stories:
        for category in categories:
            filters = Filter.by_property("category_id").equal(category["uuid"])
            category["stories"] = search_non_vector_collection(COLLECTION_STORIES, filters=filters, properties=["author", "title", "content", "language", "category_id", "status", "created_at", "updated_at"])
    return categories

def update_category(category_id: str, updated_data: dict) -> None:
    """Update a category"""
    updated_data["updated_at"] = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    update_collection_object(COLLECTION_CATEGORIES, category_id, updated_data)
    return 'Category updated successfully'

def delete_category(category_id: str) -> None:
    """Delete a category"""
    delete_collection_object(COLLECTION_CATEGORIES, category_id)
    return 'Category deleted successfully'

def get_category_by_id(category_id: str) -> dict:
    """Get a category by its ID"""
    filters = Filter.by_id().equal(category_id)
    categories = search_non_vector_collection(COLLECTION_CATEGORIES, filters=filters, properties=["name", "description","type", "author_group", "created_at", "updated_at"])
    
    if not categories:
        raise CategoryError("Category not found", 404)
    
    return categories[0]

