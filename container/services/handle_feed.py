from datetime import datetime, UTC
from warnings import filters
from data_classes.common_classes import CreateFeedRequest, FeedType
from libs.weaviate_lib import COLLECTION_FEEDS, delete_collection_object, search_non_vector_collection, update_collection_object, insert_to_collection, delete_collection_objects_many
from weaviate.classes.query import Filter, Sort

class FeedError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

# Feed Management Functions
def create_feed_entry(feed_data: CreateFeedRequest) -> None:
    """Create a new feed entry"""
    data = {
        "user_id": feed_data.user_id,
        "content": feed_data.content,
        "agent_id": feed_data.agent_id,
        "agent_content": feed_data.agent_content,
        "like_ids": [],
        "retweet_ids": [],
        "type": FeedType.POST.value,
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    feed_id = insert_to_collection(COLLECTION_FEEDS, data)

    return feed_id

# List Operations
def get_new_feeds(limit: int, offset: int, filters: dict) -> list[dict]:
    """Get new feeds"""
    weaviate_filters = []
    for key, value in filters.items():
        weaviate_filters.append(Filter(key).eq(value))
    
    if weaviate_filters:
        combined_filter = weaviate_filters[0]
        for f in weaviate_filters[1:]:
            combined_filter = combined_filter.and_(f)
    else:
        combined_filter = None

    sort = Sort.by_property("created_at", True)
    feeds = search_non_vector_collection(COLLECTION_FEEDS, filters=combined_filter, limit=limit, offset=offset, sort=sort, properties=["user_id", "content", "agent_id", "agent_content", "like_ids", "retweet_ids", "type", "created_at", "updated_at"])
    return feeds

# Read Operations
def get_feeds_by_user_id(user_id: str, limit: int, offset: int) -> list[dict]:
    """Get feeds by user ID"""
    filters = Filter("user_id").eq(user_id)
    feeds = search_non_vector_collection(COLLECTION_FEEDS, filters=filters, limit=limit, offset=offset, sort_by="created_at", sort_order="desc")
    return feeds

# Update Operations
def update_feed_entry(feed_id: str, updated_data: dict) -> None:
    """Update a feed entry"""
    updated_data["updated_at"] = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    update_collection_object(COLLECTION_FEEDS, feed_id, updated_data)
    return 'Feed updated successfully'

def delete_feed_entry(feed_id: str) -> None:
    """Delete a feed entry"""
    delete_collection_object(COLLECTION_FEEDS, feed_id)
    return 'Feed deleted successfully'

# Delete Operations
def delete_feeds_by_user_id(user_id: str) -> None:
    """Delete feeds by user ID"""
    filters = Filter("user_id").eq(user_id)
    delete_collection_objects_many(COLLECTION_FEEDS, filters=filters)
    return 'Feeds deleted successfully'

# Social Interactions
def like_feed_entry(feed_id: str, user_id: str) -> None:
    """Toggle like or dislike a feed entry"""
    filters = Filter("id").eq(feed_id)
    feeds = search_non_vector_collection(COLLECTION_FEEDS, filters=filters, limit=1)
    if not feeds:
        raise FeedError(f"Feed with ID {feed_id} not found", 404)
    
    feed = feeds[0]
    like_ids: list[str] = feed.get("like_ids", [])
    if user_id in like_ids:
        like_ids.remove(user_id)
    else:
        like_ids.append(user_id)

    update_data = {"like_ids": like_ids}
    update_feed_entry(feed_id, update_data)
    return 'Feed liked successfully'
    

def retweet_feed_entry(user_id: str, feed_id: str, user_content: str) -> None:
    """Retweet a feed entry"""
    filters = Filter("id").eq(feed.feed_id)
    feeds = search_non_vector_collection(COLLECTION_FEEDS, filters=filters, limit=1)
    if not feeds:
        raise FeedError(f"Feed with ID {feed_id} not found", 404)

    feed = feeds[0]
    data = {
        "user_id": user_id,
        "content": user_content,
        "agent_id": feed.agent_id,
        "agent_content": feed.agent_content,
        "like_ids": [],
        "retweet_ids": [],
        "type": FeedType.RETWEET.value,
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }

    retweet_id = insert_to_collection(COLLECTION_FEEDS, data)
    

    retweet_ids: list[str] = feed.get("retweet_ids", [])
    if user_id not in retweet_ids:
        retweet_ids.append(user_id)

    update_data = {"retweet_ids": retweet_ids}
    update_feed_entry(feed.id, update_data)
    return retweet_id

def get_feed_by_id(feed_id: str) -> dict:
    """Get a feed by its ID"""
    filters = Filter.by_id().equal(feed_id)
    feeds = search_non_vector_collection(COLLECTION_FEEDS, filters=filters, limit=1, properties=["user_id", "content", "agent_id", "agent_content", "like_ids", "retweet_ids", "type", "created_at", "updated_at"])
    if not feeds:
        raise FeedError(f"Feed with ID {feed_id} not found", 404)
    
    return feeds[0]