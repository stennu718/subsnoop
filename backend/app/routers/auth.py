"""Authentication router: register, login, refresh, me, delete, export."""
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.deps import get_db, get_current_user
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.models import BankConnection, CategoryOverride, ScanResult, Subscription, User
from app.schemas.schemas import Token, TokenRefresh, UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(body: UserCreate, db: Session = Depends(get_db)):
    """Register a new user account."""
    # Check if email already exists
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    # Create user
    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Generate tokens
    token_data = {"sub": str(user.id)}
    access_token = create_access_token(data=token_data)
    refresh_token = create_refresh_token(data=token_data)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user).model_dump(),
    }


@router.post("/login", response_model=Token)
async def login(body: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return access + refresh tokens."""
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    token_data = {"sub": str(user.id)}
    access_token = create_access_token(data=token_data)
    refresh_token = create_refresh_token(data=token_data)

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post("/refresh", response_model=dict)
async def refresh(body: TokenRefresh, db: Session = Depends(get_db)):
    """Exchange a valid refresh token for a new access token."""
    from app.core.security import decode_token
    import jose

    try:
        payload = decode_token(body.refresh_token)
    except (jose.JWTError, Exception):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    token_data = {"sub": str(user.id)}
    access_token = create_access_token(data=token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me", response_model=UserResponse)
async def me(current_user: User = Depends(get_current_user)):
    """Get the current authenticated user's profile."""
    return current_user


@router.delete("/account", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Hard-delete the current user and all associated data (GDPR Art. 17)."""
    user_id = current_user.id
    # Delete related records (cascade handles most, but be explicit)
    db.query(Subscription).filter(Subscription.user_id == user_id).delete()
    db.query(BankConnection).filter(BankConnection.user_id == user_id).delete()
    db.query(CategoryOverride).filter(CategoryOverride.user_id == user_id).delete()
    db.query(ScanResult).filter(ScanResult.user_id == user_id).delete()
    db.query(User).filter(User.id == user_id).delete()
    db.commit()


@router.get("/export")
async def export_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Export all user data as JSON (GDPR Art. 20 — data portability)."""
    user_data = {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "plan": current_user.plan,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
    }

    # Export subscriptions
    subscriptions = db.query(Subscription).filter(Subscription.user_id == current_user.id).all()
    subscriptions_data = [
        {
            "id": s.id,
            "merchant_name": s.merchant_name,
            "amount": s.amount,
            "currency": s.currency,
            "category": s.category,
            "billing_cycle": s.billing_cycle,
            "confidence": s.confidence,
            "is_active": s.is_active,
            "first_seen": s.first_seen.isoformat() if s.first_seen else None,
            "last_seen": s.last_seen.isoformat() if s.last_seen else None,
        }
        for s in subscriptions
    ]

    # Export scan results
    scan_results = db.query(ScanResult).filter(ScanResult.user_id == current_user.id).all()
    scan_data = [
        {
            "id": sr.id,
            "filename": sr.filename,
            "bank_type": sr.bank_type,
            "total_transactions": sr.total_transactions,
            "detected_subscriptions": sr.detected_subscriptions,
            "scan_duration_ms": sr.scan_duration_ms,
            "created_at": sr.created_at.isoformat() if sr.created_at else None,
        }
        for sr in scan_results
    ]

    return {
        "export_date": datetime.now(timezone.utc).isoformat(),
        "user": user_data,
        "subscriptions": subscriptions_data,
        "scan_results": scan_data,
    }
