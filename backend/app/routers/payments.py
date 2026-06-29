"""Payments/Open Banking router (stub)."""
from fastapi import APIRouter

from app.schemas.schemas import BankConnectionCreate, BankConnectionResponse

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/banks", response_model=list[BankConnectionResponse])
async def list_bank_connections():
    """List user's connected bank connections."""
    # TODO: query bank connections from DB
    return []


@router.post("/banks/connect", response_model=BankConnectionResponse)
async def connect_bank(connection: BankConnectionCreate):
    """Initiate Open Banking connection to a bank (stub)."""
    # TODO: integrate with PSD2 API
    from datetime import datetime, timezone
    return BankConnectionResponse(
        id=1,
        bank_name=connection.bank_name,
        iban=connection.iban,
        user_id=0,
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )


@router.post("/banks/{connection_id}/sync")
async def sync_transactions(connection_id: int):
    """Sync transactions via Open Banking API (stub)."""
    # TODO: call PSD2 API and ingest transactions
    return {"connection_id": connection_id, "synced": 0}
