from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import COLLECTION_FEED_COMMENTS, search_non_vector_collection, update_collection_object, insert_to_collection, delete_collection_objects_many, delete_collection_object
from weaviate.classes.query import Filter, Sort
from data_classes.common_classes import CreateCommentFeedRequest

class FeedCommentError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

# Create Comment Function
def create_feed_comment(comment_data: CreateCommentFeedRequest) -> None:
    """Create a new comment for a feed entry"""
    data = {
        "user_id": comment_data.user_id,
        "feed_id": comment_data.feed_id,
        "content": comment_data.content,
        "like_ids": [],
        "created_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    comment_id = insert_to_collection(COLLECTION_FEED_COMMENTS, data)

    return comment_id

# List Comments for a Feed
def get_comments_by_feed_id(feed_id: str, limit: int, offset: int) -> list[dict]:
    """Get comments by feed ID"""
    filters = Filter.by_property("feed_id").equal(feed_id)
    sort = Sort.by_creation_time(ascending=True)
    comments = search_non_vector_collection(COLLECTION_FEED_COMMENTS, filters=filters, limit=limit, offset=offset, sort=sort, properties=["user_id", "feed_id", "content", "like_ids", "created_at", "updated_at"])
    return comments

# Update Comment
def update_feed_comment(comment_id: str, updated_data: dict) -> None:
    """Update a feed comment"""
    updated_data["updated_at"] = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    update_collection_object(COLLECTION_FEED_COMMENTS, comment_id, updated_data)
    return 'Comment updated successfully'

# Delete Comment
def delete_feed_comment(comment_id: str) -> None:
    """Delete a feed comment"""
    delete_collection_object(COLLECTION_FEED_COMMENTS, comment_id)
    return 'Comment deleted successfully'

# Delete Comments by Feed ID
def delete_comments_by_feed_id(feed_id: str) -> None:
    """Delete all comments associated with a specific feed ID"""
    filters = Filter.by_property("feed_id").equal(feed_id)
    delete_collection_objects_many(COLLECTION_FEED_COMMENTS, filters)
    return f'Deleted comments associated with feed ID {feed_id}'

# Like in comments
def like_feed_comment(comment_id: str, user_id: str) -> None:
    """Toggle Like a comment"""
    filters = Filter.by_id().equal(comment_id)
    comments = search_non_vector_collection(COLLECTION_FEED_COMMENTS, filters=filters, properties=["like_ids"])
    
    if not comments:
        raise FeedCommentError("Comment not found", 404)
    
    comment = comments[0]
    like_ids: list[str] = comment.get("like_ids", [])
    
    if user_id in like_ids:
        # User has already liked the comment, so we remove the like
        like_ids.remove(user_id)
    else:
        # User is liking the comment for the first time
        like_ids.append(user_id)

    update_collection_object(COLLECTION_FEED_COMMENTS, comment_id, {"like_ids": like_ids, "updated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")})

    return 'Comment liked successfully'