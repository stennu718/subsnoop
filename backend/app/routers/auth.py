"""Authentication router (stub)."""
from fastapi import APIRouter, HTTPException, status

from app.schemas.schemas import TokenRequest, TokenResponse
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token", response_model=TokenResponse)
async def login(request: TokenRequest):
    """Authenticate user and return JWT token."""
    # TODO: verify credentials against database
    # Stub: always succeeds for dev
    if not request.email or not request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_access_token(subject=request.email)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=1800,
    )
