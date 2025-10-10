from datetime import datetime, UTC
from warnings import filters
from libs.weaviate_lib import search_non_vector_collection, update_collection_object, insert_to_collection
from weaviate.classes.query import Filter

class GuessError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

def store_ip_guess(ip_address: str) -> None:
    """Store a guess made by an IP address"""

    # Get the first day of the current month
    now = datetime.now(UTC)
    first_time_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
    end_time_of_day = now.replace(hour=23, minute=59, second=59, microsecond=999999)

    filters = Filter.by_property("ip").equal(ip_address) & \
                Filter.by_property("created_at").greater_than(first_time_of_day.strftime("%Y-%m-%dT%H:%M:%SZ")) & \
                Filter.by_property("created_at").less_than(end_time_of_day.strftime("%Y-%m-%dT%H:%M:%SZ"))

    existing_guesses = search_non_vector_collection("Guesses", filters=filters)
    if existing_guesses and len(existing_guesses) >= 2:
        print(f"IP {ip_address} has reached the guess limit.")
        raise GuessError("Guess limit reached for today", 429)
    guess_data = {
        "ip": ip_address,
        "created_at" : datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    insert_to_collection("Guesses", guess_data)

  