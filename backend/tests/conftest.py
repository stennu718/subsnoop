"""Pytest configuration and shared fixtures for SubSnoop backend tests."""
import io

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.models.models import Base
from app.core.config import get_settings
from app.core.deps import get_db


# --- Sample CSV data fixtures ---

SWAEDBANK_CSV = """\ufeffKuupäev;Kirjeldus;Summa;Valuuta;Laekumine/Makse
01.01.2024;NETFLIX.COM;-9.99;EUR;Makse
02.01.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.01.2024;LHV PANK;-5.00;EUR;Makse
05.01.2024;Some Random Store;-23.99;EUR;Makse
01.02.2024;NETFLIX.COM;-9.99;EUR;Makse
02.02.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.02.2024;LHV PANK;-5.00;EUR;Makse
01.03.2024;NETFLIX.COM;-9.99;EUR;Makse
02.03.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.03.2024;LHV PANK;-5.00;EUR;Makse
01.04.2024;NETFLIX.COM;-9.99;EUR;Makse
02.04.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.04.2024;LHV PANK;-5.00;EUR;Makse
"""

SEB_CSV = """Date,Description,Amount,Type,Balance
2024-01-05,Spotify AB,-11.99,Debit,1200.00
2024-01-10,Elisa Eesti,-25.00,Debit,1175.00
2024-01-15,Grocery Store,-45.30,Debit,1129.70
2024-02-05,Spotify AB,-11.99,Debit,1117.71
2024-02-10,Elisa Eesti,-25.00,Debit,1092.71
2024-03-05,Spotify AB,-11.99,Debit,1080.72
2024-03-10,Elisa Eesti,-25.00,Debit,1055.72
2024-04-05,Spotify AB,-11.99,Debit,1043.73
2024-04-10,Elisa Eesti,-25.00,Debit,1018.73
"""

LHV_CSV = """\"Booking date\",\"Beneficiary/Payer name\",\"Amount\",\"Currency\",\"Payment type\"
15.01.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.01.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.02.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.02.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.03.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.03.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.04.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.04.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.05.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.05.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
"""

ONETIME_CSV = """Date,Description,Amount
2024-01-15,iStore Purchase,49.99
2024-02-20,Restaurant Dinner,35.00
"""


@pytest.fixture
def swedbank_csv_bytes():
    return SWAEDBANK_CSV.encode("utf-8-sig")


@pytest.fixture
def sebb_csv_bytes():
    return SEB_CSV.encode("utf-8")


@pytest.fixture
def lhv_csv_bytes():
    return LHV_CSV.encode("utf-8-sig")


@pytest.fixture
def onetime_csv_bytes():
    return ONETIME_CSV.encode("utf-8")


@pytest.fixture
def swedbank_csv_fileobj(swedbank_csv_bytes):
    return io.BytesIO(swedbank_csv_bytes)


@pytest.fixture
def seb_csv_fileobj(sebb_csv_bytes):
    return io.BytesIO(sebb_csv_bytes)


@pytest.fixture
def lhv_csv_fileobj(lhv_csv_bytes):
    return io.BytesIO(lhv_csv_bytes)


# --- Database / Auth test fixtures ---

@pytest.fixture(scope="session")
def test_settings():
    """Override settings for testing."""
    # Reset the lru_cache to get fresh settings
    get_settings.cache_clear()
    import os
    os.environ["DATABASE_URL"] = "sqlite:///./test_subsnoop.db"
    os.environ["SECRET_KEY"] = "test-secret-key-for-testing-only-do-not-use-in-prod"
    os.environ["JWT_ACCESS_TOKEN_EXPIRE_MINUTES"] = "15"
    settings = get_settings()
    return settings


@pytest.fixture(scope="session")
def test_engine(test_settings):
    """Create a SQLAlchemy engine for testing."""
    engine = create_engine(
        test_settings.DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
    Base.metadata.create_all(bind=engine)
    yield engine
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="session")
def TestingSessionLocal(test_engine):
    """Create a session factory for testing."""
    return sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture
def db_session(TestingSessionLocal):
    """Provide a transactional DB session that rolls back after each test."""
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


@pytest.fixture
def client(db_session, TestingSessionLocal):
    """FastAPI test client with overridden DB dependency."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
