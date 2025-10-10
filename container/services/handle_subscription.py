from datetime import datetime, UTC, timedelta
from weaviate.classes.query import Filter
from data_classes.common_classes import CreateSubscriptionRequest, SubscriptionStatus
from libs.weaviate_lib import get_aggregate, COLLECTION_SUBSCRIPTIONS, insert_to_collection

class SubscriptionError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def count_subscription_in_month() -> int:
    """Get subscription in the current month."""
    try:
        # Get the first day of the current month
        now = datetime.now(UTC)
        first_day_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        cutoff_str = first_day_of_month.strftime("%Y-%m-%dT%H:%M:%SZ")
        
        filters = Filter.by_property("created_at").greater_than(cutoff_str)
        
        aggregate_result = get_aggregate(
            collection_name=COLLECTION_SUBSCRIPTIONS,
            filters=filters
        )
        
        return aggregate_result.total_count
    except Exception as e:
        print(f"Error counting active subscriptions: {str(e)}")
        raise SubscriptionError("Failed to count active subscriptions", 500)


def get_one_subscription(user_id: str) -> dict | None:
    """Get one subscription by user_id."""
    try:
        filters = Filter.by_property("user_id").equal_to(user_id)
        
        aggregate_result = get_aggregate(
            collection_name=COLLECTION_SUBSCRIPTIONS,
            filters=filters
        )
        
        if aggregate_result.total_count > 0:
            return aggregate_result.items[0]
        return None
    except Exception as e:
        print(f"Error retrieving subscription for user {user_id}: {str(e)}")
        raise SubscriptionError("Failed to retrieve subscription", 500)
    
def create_subscription(params: CreateSubscriptionRequest) -> dict:
    """Create a new subscription."""
    try:
        start_date = datetime.fromtimestamp(params.start_date, UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
        end_date = datetime.fromtimestamp(params.ended_at, UTC).strftime("%Y-%m-%dT%H:%M:%SZ")

        print(f"Creating subscription for user {params.user_id} with tx_id {params.tx_id}, level {params.level}, start_date {start_date}, end_date {end_date}")
        data = {
            "user_id": params.user_id,
            "level": params.level,
            "status": params.status,
            "start_date": start_date,
            "end_date": end_date,
            "tx_id": params.tx_id
        }
        
        new_subscription = insert_to_collection(
            COLLECTION_SUBSCRIPTIONS,
            data
        )
        
        return new_subscription
    except Exception as e:
        print(f"Error creating subscription: {str(e)}")
        raise SubscriptionError("Failed to create subscription", 500)