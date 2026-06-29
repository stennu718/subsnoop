"""Pydantic v2 schemas for request/response validation."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# --- User schemas ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    plan: str = "free"
    is_active: bool
    created_at: datetime


# --- Subscription schemas ---
class SubscriptionBase(BaseModel):
    merchant_name: str
    amount: float
    currency: str = "EUR"
    category: Optional[str] = None
    billing_cycle: str = "monthly"
    confidence: float = Field(0.0, ge=0.0, le=1.0)
    first_seen: Optional[datetime] = None
    last_seen: Optional[datetime] = None
    source: str = "csv"


class SubscriptionResponse(SubscriptionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    is_active: bool
    created_at: datetime


# --- Bank Connection schemas ---
class BankConnectionBase(BaseModel):
    bank_name: str
    iban: Optional[str] = None


class BankConnectionCreate(BankConnectionBase):
    pass


class BankConnectionResponse(BankConnectionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    is_active: bool
    created_at: datetime


# --- Scan Result schemas ---
class ScanResultResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    filename: Optional[str]
    bank_type: Optional[str]
    total_transactions: int
    detected_subscriptions: int
    scan_duration_ms: Optional[int]
    created_at: datetime


# --- CSV Upload / Parsed result ---
class ParsedTransaction(BaseModel):
    date: datetime
    description: str
    amount: float
    currency: str = "EUR"
    transaction_type: Optional[str] = None


class DetectedSubscription(BaseModel):
    merchant_name: str
    amount: float
    currency: str
    category: Optional[str] = None
    billing_cycle: str
    confidence: float
    occurrences: int
    first_seen: Optional[datetime] = None
    last_seen: Optional[datetime] = None


class CSVParseResponse(BaseModel):
    bank_type: Optional[str]
    total_transactions: int
    detected_subscriptions: list[DetectedSubscription]


# --- Auth schemas ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    refresh_token: str


# --- Category Override ---
class CategoryOverrideCreate(BaseModel):
    merchant_pattern: str
    category: str


class CategoryOverrideResponse(CategoryOverrideCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    created_at: datetime
