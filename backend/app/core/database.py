"""SQLAlchemy database engine and session setup."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings

_settings = None
_engine = None
_SessionLocal = None


def _ensure_engine():
    """Lazily create the engine and session factory."""
    global _engine, _SessionLocal, _settings
    if _engine is None:
        if _settings is None:
            _settings = get_settings()
        db_url = _settings.DATABASE_URL
        connect_args = {}
        if "sqlite" in db_url:
            connect_args["check_same_thread"] = False
        _engine = create_engine(db_url, connect_args=connect_args, pool_pre_ping=True)
        _SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=_engine)
    return _engine, _SessionLocal


def get_db():
    """Yield a SQLAlchemy database session."""
    _, SessionLocal = _ensure_engine()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
