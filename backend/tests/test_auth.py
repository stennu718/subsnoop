"""Tests for authentication system: register, login, refresh, me, delete, export."""
import pytest
from fastapi.testclient import TestClient


class TestPasswordHashing:
    """Test bcrypt password hashing utilities."""

    def test_hash_password_returns_string(self):
        from app.core.security import hash_password
        result = hash_password("securepassword123")
        assert isinstance(result, str)
        assert len(result) > 0

    def test_verify_password_correct(self):
        from app.core.security import hash_password, verify_password
        hashed = hash_password("securepassword123")
        assert verify_password("securepassword123", hashed) is True

    def test_verify_password_incorrect(self):
        from app.core.security import hash_password, verify_password
        hashed = hash_password("securepassword123")
        assert verify_password("wrongpassword", hashed) is False

    def test_hash_password_unique_salts(self):
        from app.core.security import hash_password
        hash1 = hash_password("samepassword")
        hash2 = hash_password("samepassword")
        assert hash1 != hash2  # bcrypt uses random salt


class TestRegister:
    """Test POST /auth/register endpoint."""

    def test_register_success(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "newuser@test.com", "password": "password123"},
        )
        assert response.status_code == 201
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"
        assert "user" in data
        assert data["user"]["email"] == "newuser@test.com"

    def test_register_duplicate_email(self, client: TestClient):
        # Register first user
        client.post(
            "/api/v1/auth/register",
            json={"email": "dupuser@test.com", "password": "password123"},
        )
        # Try duplicate
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "dupuser@test.com", "password": "password123"},
        )
        assert response.status_code == 409
        assert "already" in response.json()["detail"].lower()

    def test_register_invalid_email(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "not-an-email", "password": "password123"},
        )
        assert response.status_code == 422

    def test_register_short_password(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "shortpw@test.com", "password": "short"},
        )
        assert response.status_code == 422

    def test_register_missing_password(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "nopw@test.com"},
        )
        assert response.status_code == 422


class TestLogin:
    """Test POST /auth/login endpoint."""

    def _register_user(self, client: TestClient, email: str = "loginuser@test.com", password: str = "password123"):
        return client.post(
            "/api/v1/auth/register",
            json={"email": email, "password": password},
        )

    def test_login_success(self, client: TestClient):
        self._register_user(client)
        response = client.post(
            "/api/v1/auth/login",
            json={"email": "loginuser@test.com", "password": "password123"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    def test_login_wrong_password(self, client: TestClient):
        self._register_user(client)
        response = client.post(
            "/api/v1/auth/login",
            json={"email": "loginuser@test.com", "password": "wrongpassword"},
        )
        assert response.status_code == 401
        assert "incorrect" in response.json()["detail"].lower()

    def test_login_nonexistent_user(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/login",
            json={"email": "nobody@test.com", "password": "password123"},
        )
        assert response.status_code == 401

    def test_login_invalid_email_format(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/login",
            json={"email": "notvalid", "password": "password123"},
        )
        assert response.status_code == 422


class TestRefreshToken:
    """Test POST /auth/refresh endpoint."""

    def _register_and_get_tokens(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "refreshuser@test.com", "password": "password123"},
        )
        return response.json()

    def test_refresh_valid_token(self, client: TestClient):
        tokens = self._register_and_get_tokens(client)
        response = client.post(
            "/api/v1/auth/refresh",
            json={"refresh_token": tokens["refresh_token"]},
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        # Verify the new token is valid by using it
        me_response = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {data['access_token']}"},
        )
        assert me_response.status_code == 200

    def test_refresh_invalid_token(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/refresh",
            json={"refresh_token": "invalid.token.here"},
        )
        assert response.status_code == 401

    def test_refresh_missing_token(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/refresh",
            json={},
        )
        assert response.status_code == 422


class TestGetCurrentUser:
    """Test GET /auth/me endpoint."""

    def _register_user(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "meuser@test.com", "password": "password123"},
        )
        return response.json()["access_token"]

    def test_get_me_valid_token(self, client: TestClient):
        token = self._register_user(client)
        response = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "meuser@test.com"
        assert "id" in data
        assert "created_at" in data

    def test_get_me_no_token(self, client: TestClient):
        response = client.get("/api/v1/auth/me")
        assert response.status_code == 401

    def test_get_me_invalid_token(self, client: TestClient):
        response = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": "Bearer invalidtoken"},
        )
        assert response.status_code == 401

    def test_get_me_expired_token(self, client: TestClient, test_settings):
        from datetime import timedelta
        from app.core.security import create_access_token

        # Create an already-expired token
        token = create_access_token(
            data={"sub": "1"},
            expires_delta=timedelta(minutes=-1),
        )
        response = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 401


class TestDeleteAccount:
    """Test DELETE /auth/account endpoint."""

    def _register_user(self, client: TestClient, email: str = "deleteuser@test.com"):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": email, "password": "password123"},
        )
        return response.json()["access_token"]

    def test_delete_account_success(self, client: TestClient):
        token = self._register_user(client)
        response = client.delete(
            "/api/v1/auth/account",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 204

        # Verify user is really gone - login should fail
        login_response = client.post(
            "/api/v1/auth/login",
            json={"email": "deleteuser@test.com", "password": "password123"},
        )
        assert login_response.status_code == 401

    def test_delete_account_no_token(self, client: TestClient):
        response = client.delete("/api/v1/auth/account")
        assert response.status_code == 401


class TestExportData:
    """Test GET /auth/export endpoint (GDPR Art. 20)."""

    def _register_user(self, client: TestClient):
        response = client.post(
            "/api/v1/auth/register",
            json={"email": "exportuser@test.com", "password": "password123"},
        )
        return response.json()["access_token"]

    def test_export_returns_json(self, client: TestClient):
        token = self._register_user(client)
        response = client.get(
            "/api/v1/auth/export",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "user" in data
        assert "export_date" in data
        assert data["user"]["email"] == "exportuser@test.com"

    def test_export_no_token(self, client: TestClient):
        response = client.get("/api/v1/auth/export")
        assert response.status_code == 401
