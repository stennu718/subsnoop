"""Heuristic subscription categorizer.

Maps merchant names to categories using keyword matching.
Supports user-defined overrides that take precedence over defaults.
"""
from __future__ import annotations

from typing import Optional


# Keyword → category mapping (checked in order)
DEFAULT_CATEGORIES: dict[str, str] = {
    # Entertainment
    "netflix": "Entertainment",
    "spotify": "Entertainment",
    "hbo": "Entertainment",
    "disney+": "Entertainment",
    "disney plus": "Entertainment",
    "youtube": "Entertainment",
    "twitch": "Entertainment",
    "steam": "Entertainment",
    "playstation": "Entertainment",
    "xbox": "Entertainment",
    # Telecom
    "telia": "Telecom",
    "elisa": "Telecom",
    "tele2": "Telecom",
    "bite": "Telecom",
    " Telia": "Telecom",
    # Banking & Finance
    "swedbank": "Banking",
    "lhv": "Banking",
    "seb": "Banking",
    "luminor": "Banking",
    "coop pank": "Banking",
    "inbank": "Banking",
    # Productivity & Software
    "google workspace": "Productivity",
    "microsoft 365": "Productivity",
    "notion": "Productivity",
    "figma": "Productivity",
    "slack": "Productivity",
    "github": "Productivity",
    "atlassian": "Productivity",
    "adobe": "Productivity",
    # Health & Fitness
    "gym": "Health & Fitness",
    "fitness": "Health & Fitness",
    "strava": "Health & Fitness",
    "myfitnesspal": "Health & Fitness",
    # Utilities
    "electric": "Utilities",
    "water": "Utilities",
    "gas": "Utilities",
    "district heating": "Utilities",
}


def categorize(
    merchant_name: str,
    custom_overrides: dict[str, str] | None = None,
) -> str | None:
    """Categorize a merchant name into a subscription category.

    Checks custom overrides first, then falls back to default keyword map.

    Args:
        merchant_name: The merchant/payee name from a transaction.
        custom_overrides: Optional dict mapping merchant substrings → category.

    Returns:
        Category string or None if no match.
    """
    if not merchant_name:
        return None

    merchant_lower = merchant_name.lower().strip()

    # Check custom overrides first (case-insensitive)
    if custom_overrides:
        for pattern, category in custom_overrides.items():
            if pattern.lower() in merchant_lower:
                return category

    # Check default categories
    for keyword, category in DEFAULT_CATEGORIES.items():
        if keyword in merchant_lower:
            return category

    return None


def categorize_batch(
    merchant_names: list[str],
    custom_overrides: dict[str, str] | None = None,
) -> dict[str, str | None]:
    """Categorize a list of merchant names.

    Returns:
        Dict mapping merchant_name → category (or None).
    """
    return {name: categorize(name, custom_overrides) for name in merchant_names}


def get_category_for_merchant(merchant_name: str) -> str | None:
    """Public API: returns category for a single merchant."""
    return categorize(merchant_name)
