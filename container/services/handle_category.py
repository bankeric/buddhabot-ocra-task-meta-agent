from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import COLLECTION_CATEGORIES, COLLECTION_STORIES, delete_collection_object, search_non_vector_collection, update_collection_object, insert_to_collection, delete_collection_objects_many
from weaviate.classes.query import Filter
from data_classes.common_classes import CreateCategoryRequest, StoryStatus

class CategoryError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def create_category(request: CreateCategoryRequest) -> str:
    """Create a new category"""
    data = {
        "name": request.name,
        "description": request.description,
        "type": request.type,
        "author_group": request.author_group,
        "language": request.language,
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    category_id = insert_to_collection(COLLECTION_CATEGORIES, data)
    return category_id

def get_all_categories(limit: int, offset: int, include_stories: bool, filters: dict) -> list[dict]:
    """Get all categories with pagination"""
    weaviate_filters = []
    for key, value in filters.items():
        weaviate_filters.append(Filter.by_property(key).equal(value))
    
    if weaviate_filters:
        combined_filter = weaviate_filters[0]
        for f in weaviate_filters[1:]:
            combined_filter = combined_filter.and_(f)
    else:
        combined_filter = None
    properties = ["name", "description","type", "author_group", "language", "created_at", "updated_at"]
    categories = search_non_vector_collection(COLLECTION_CATEGORIES, limit=limit, offset=offset, properties=properties, filters=combined_filter)
    if include_stories:
        for category in categories:
            filters = Filter.by_property("category_id").equal(category["uuid"]).__and__(Filter.by_property("status").equal(StoryStatus.PUBLISHED.value))
            story_properties = ["author", "title", "content", "language", "category_id", "status", "created_at", "updated_at", "image_url", "audio_url"]
            category["stories"] = search_non_vector_collection(COLLECTION_STORIES, filters=filters, properties=story_properties)
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
    properties = ["name", "description","type", "author_group", "language", "created_at", "updated_at"]
    categories = search_non_vector_collection(COLLECTION_CATEGORIES, filters=filters, properties=properties)

    if not categories:
        raise CategoryError("Category not found", 404)
    
    return categories[0]

