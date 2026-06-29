"""Subscriptions router (stub)."""
from fastapi import APIRouter

from app.schemas.schemas import SubscriptionResponse

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.get("/", response_model=list[SubscriptionResponse])
async def list_subscriptions():
    """List all detected subscriptions for authenticated user."""
    # TODO: query from DB for current user
    return []


@router.put("/{subscription_id}")
async def update_subscription(subscription_id: int):
    """Update a subscription (category, active status, etc.)."""
    # TODO: update subscription in DB
    return {"id": subscription_id, "status": "updated"}


@router.delete("/{subscription_id}")
async def delete_subscription(subscription_id: int):
    """Delete/archive a subscription."""
    # TODO: soft-delete from DB
    return {"id": subscription_id, "status": "deleted"}
