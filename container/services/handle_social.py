from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import search_non_vector_collection, update_collection_object, insert_to_collection
from weaviate.classes.query import Filter

class SocialError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

def get_social_share(platform: str = None):
    """Get social media share data"""
    try:
        platforms = search_non_vector_collection(
            collection_name="SocialMedia",
            filters=Filter.by_property("platform").equal(platform) if platform else None,
            properties=["platform", "share_count"]
        )
        
        # Get total shares
        total_shares = sum(p['share_count'] for p in platforms) if platforms else 0
        return total_shares
    except Exception as e:
        print(f"Error getting social media platform data: {str(e)}")
        raise SocialError("Failed to get social media platform data", 500)
    
def share_on_social_media(platform: str) -> int:
    """Increment share count on a given social media platform"""
    try:
        platforms = search_non_vector_collection(
            collection_name="SocialMedia",
            filters=Filter.by_property("platform").equal(platform),
            properties=["platform", "share_count"]
        )
        
        # if not exist create it, else increment count
        if not platforms:
            platform_data = {
                "platform": platform,
                "share_count": 1,
                "created_at" : datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "updated_at" : datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
            }
            # Here you would typically insert the new record into the database
            insert_to_collection("SocialMedia", platform_data)
            
        else:
            platform_data = platforms[0]
            print(f"Found existing platform data: {platform_data}")
            platform_data['share_count'] += 1
            platform_data['updated_at'] = datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
            update_collection_object("SocialMedia", platform_data['uuid'], platform_data)

        return platform_data['share_count']
    except Exception as e:
        print(f"Error sharing on social media: {str(e)}")
        raise SocialError("Failed to share on social media", 500)