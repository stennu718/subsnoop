"""JWT (RS256) encode/decode stubs for authentication."""
from datetime import datetime, timedelta, timezone
from typing import Any

from jose import jwt, JWTError

from app.core.config import get_settings


def _using_rsa_keys() -> bool:
    """Check if RSA key files are available."""
    settings = get_settings()
    try:
        with open(settings.JWT_PRIVATE_KEY_PATH, "r") as f:
            content = f.read()
        return "BEGIN PRIVATE KEY" in content or "BEGIN RSA PRIVATE KEY" in content
    except FileNotFoundError:
        return False


def create_access_token(
    subject: str | int,
    expires_delta: timedelta | None = None,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    """Create a JWT access token.

    Uses RS256 with RSA keys when available, falls back to HS256 with
    SECRET_KEY for local development.
    """
    settings = get_settings()
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)

    expire = datetime.now(timezone.utc) + expires_delta
    to_encode: dict[str, Any] = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    if extra_claims:
        to_encode.update(extra_claims)

    if _using_rsa_keys():
        private_key = _load_private_key()
        algorithm = settings.JWT_ALGORITHM  # RS256
    else:
        private_key = settings.SECRET_KEY
        algorithm = "HS256"

    return jwt.encode(to_encode, private_key, algorithm=algorithm)


def decode_token(token: str) -> dict[str, Any]:
    """Decode and verify a JWT token.

    Uses RS256 with RSA keys when available, falls back to HS256.
    Raises jose.JWTError on invalid/expired tokens.
    """
    settings = get_settings()
    if _using_rsa_keys():
        public_key = _load_public_key()
        algorithms = [settings.JWT_ALGORITHM]
    else:
        public_key = settings.SECRET_KEY
        algorithms = ["HS256"]
    return jwt.decode(token, public_key, algorithms=algorithms)


def _load_private_key() -> str:
    """Load RSA private key from disk, fall back to SECRET_KEY."""
    settings = get_settings()
    try:
        with open(settings.JWT_PRIVATE_KEY_PATH, "r") as f:
            return f.read()
    except FileNotFoundError:
        return settings.SECRET_KEY


def _load_public_key() -> str:
    """Load RSA public key from disk, fall back to SECRET_KEY."""
    settings = get_settings()
    try:
        with open(settings.JWT_PUBLIC_KEY_PATH, "r") as f:
            return f.read()
    except FileNotFoundError:
        return settings.SECRET_KEY
