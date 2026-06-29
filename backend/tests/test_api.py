"""API integration tests using httpx TestClient."""
import io

import pytest
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


class TestHealthEndpoint:
    def test_health_returns_ok(self):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["app"] == "SubSnoop"
        assert "version" in data


class TestScanUpload:
    def test_upload_swedbank_csv(self):
        csv_content = (
            "Kuupäev;Kirjeldus;Summa;Valuuta;Laekumine/Makse\n"
            "01.01.2024;NETFLIX.COM;-9.99;EUR;Makse\n"
            "01.02.2024;NETFLIX.COM;-9.99;EUR;Makse\n"
            "01.03.2024;NETFLIX.COM;-9.99;EUR;Makse\n"
            "01.04.2024;NETFLIX.COM;-9.99;EUR;Makse\n"
        )
        response = client.post(
            "/api/v1/scan/upload",
            files={"file": ("swedbank.csv", io.BytesIO(csv_content.encode("utf-8-sig")), "text/csv")},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["bank_type"] == "swedbank"
        assert data["total_transactions"] == 4
        assert len(data["detected_subscriptions"]) >= 1

    def test_upload_seb_csv(self):
        csv_content = (
            "Date,Description,Amount,Type,Balance\n"
            "2024-01-05,Spotify AB,-11.99,Debit,1200.00\n"
            "2024-02-05,Spotify AB,-11.99,Debit,1188.01\n"
            "2024-03-05,Spotify AB,-11.99,Debit,1176.02\n"
        )
        response = client.post(
            "/api/v1/scan/upload",
            files={"file": ("seb.csv", io.BytesIO(csv_content.encode("utf-8")), "text/csv")},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["bank_type"] == "seb"
        assert data["total_transactions"] == 3
        assert len(data["detected_subscriptions"]) == 1
        assert "Spotify" in data["detected_subscriptions"][0]["merchant_name"]


class TestAuth:
    def test_login_returns_token(self):
        response = client.post(
            "/api/v1/auth/token",
            json={"email": "test@subsnoop.ee", "password": "testpassword123"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_missing_fields(self):
        response = client.post(
            "/api/v1/auth/token",
            json={"email": "", "password": ""},
        )
        assert response.status_code == 422  # validation error
