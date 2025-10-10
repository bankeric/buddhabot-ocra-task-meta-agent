


def get_level_from_price_id(price_id: str) -> int:
    """Map price IDs to subscription levels."""
    price_map = {
        "price_1SFoVMRvqbhgU2bC0yhgJqU0": 2,  # Gói nâng cao
        "price_1SG9pCRvqbhgU2bCx3UXqMml": 2,  # Gói nâng cao
        "price_1SFoWVRvqbhgU2bCe0VU3dtr": 3,  # Gói chuyên nghiệp
        "price_1SG9qCRvqbhgU2bCjDZpNDRt": 3,  # Gói chuyên nghiệp
    }
    return price_map.get(price_id, 1)  # Mặc định là gói cơ bản nếu không tìm thấy