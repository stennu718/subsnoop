"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export interface ApiError {
  status: number;
  message: string;
}

function buildHeaders(token?: string | null): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/**
 * Mock mode — when NEXT_PUBLIC_API_URL is not set we simulate a
 * realistic round-trip (600 ms) and return a deterministic fake token
 * so the auth UI is testable without a real backend.
 */
const MOCK_DELAY = 600;
const MOCK_ACCESS = "mock_access_token_sess_CN4sMAaaRV2Yfki0";
const MOCK_ACCESS_HEAD = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const MOCK_ACCESS_BODY = "eyJzdWIiOiJzdGVuQHN1YnNub29wLmVlIiwiZXhwIjo5OTk5OTk5OTk5fQ";
const MOCK_ACCESS_SIG = "mock_signature";

function mockDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY));
}

function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("subsnoop_access_token");
  } catch {
    return null;
  }
}

function setStoredAccessToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem("subsnoop_access_token", token);
      // Refresh token goes to a cookie-shaped localStorage slot for the mock;
      // real backend will set an httpOnly cookie server-side.
      localStorage.setItem(
        "subsnoop_refresh_cookie",
        "mock_refresh_token_httpOnly_fallback"
      );
    } else {
      localStorage.removeItem("subsnoop_access_token");
      localStorage.removeItem("subsnoop_refresh_cookie");
    }
  } catch {
    /* storage disabled — fail silently */
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  plan: "free" | "pro" | "premium";
}

export interface AuthResponse {
  accessToken: string;
  tokenType: "Bearer";
  user: User;
}

export interface ExportPayload {
  format: "json" | "csv";
}

/** POST /auth/register — create an account. */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (!API_BASE) {
    return mockDelay<AuthResponse>({
      accessToken: `${MOCK_ACCESS_HEAD}.${MOCK_ACCESS_BODY}.${MOCK_ACCESS_SIG}`,
      tokenType: "Bearer",
      user: {
        id: "usr_mock_001",
        email: payload.email,
        createdAt: new Date().toISOString(),
        plan: "free",
      },
    });
  }

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err: ApiError = { status: res.status, message: await safeMsg(res) };
    throw err;
  }
  const data: AuthResponse = await res.json();
  setStoredAccessToken(data.accessToken);
  return data;
}

/** POST /auth/login — authenticate. */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (!API_BASE) {
    return mockDelay<AuthResponse>({
      accessToken: `${MOCK_ACCESS_HEAD}.${MOCK_ACCESS_BODY}.${MOCK_ACCESS_SIG}`,
      tokenType: "Bearer",
      user: {
        id: "usr_mock_001",
        email: payload.email,
        createdAt: "2026-01-15T10:00:00Z",
        plan: "free",
      },
    });
  }

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err: ApiError = { status: res.status, message: await safeMsg(res) };
    throw err;
  }
  const data: AuthResponse = await res.json();
  setStoredAccessToken(data.accessToken);
  return data;
}

/** POST /auth/refresh — swap refresh cookie for a fresh token. */
export async function refreshToken(): Promise<AuthResponse> {
  const current = getStoredAccessToken();
  if (!API_BASE) {
    return mockDelay<AuthResponse>({
      accessToken: `${MOCK_ACCESS_HEAD}.${MOCK_ACCESS_BODY}.${MOCK_ACCESS_SIG}`,
      tokenType: "Bearer",
      user: {
        id: "usr_mock_001",
        email: "demo@subsnoop.ee",
        createdAt: "2026-01-15T10:00:00Z",
        plan: "free",
      },
    });
  }

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: buildHeaders(current),
    credentials: "include",
  });
  if (!res.ok) {
    setStoredAccessToken(null);
    throw { status: res.status, message: "Session expired" } satisfies ApiError;
  }
  return res.json();
}

/** GET /me — fetch the current user. */
export async function getMe(): Promise<User> {
  const token = getStoredAccessToken();
  if (!API_BASE) {
    return mockDelay<User>({
      id: "usr_mock_001",
      email: "demo@subsnoop.ee",
      createdAt: "2026-01-15T10:00:00Z",
      plan: "free",
    });
  }

  const res = await fetch(`${API_BASE}/me`, {
    headers: buildHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw { status: res.status, message: await safeMsg(res) };
  return res.json();
}

/** DELETE /me — delete the account and all data. */
export async function deleteAccount(): Promise<{ deleted: true }> {
  const token = getStoredAccessToken();
  if (!API_BASE) {
    return mockDelay({ deleted: true } as const);
  }

  const res = await fetch(`${API_BASE}/me`, {
    method: "DELETE",
    headers: buildHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw { status: res.status, message: await safeMsg(res) };
  setStoredAccessToken(null);
  return res.json();
}

/** POST /me/export — request a data export. */
export async function exportData(
  payload: ExportPayload = { format: "json" }
): Promise<{ downloadUrl: string }> {
  const token = getStoredAccessToken();
  if (!API_BASE) {
    return mockDelay({ downloadUrl: "https://api.subsnoop.ee/exports/mock.zip" });
  }

  const res = await fetch(`${API_BASE}/me/export`, {
    method: "POST",
    headers: buildHeaders(token),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw { status: res.status, message: await safeMsg(res) };
  return res.json();
}

/** Clear the locally-stored token (logout helper). */
export function logout() {
  setStoredAccessToken(null);
}

/* ------------------------------------------------------------------ */
/* Internal helpers                                                    */
/* ------------------------------------------------------------------ */

async function safeMsg(res: Response): Promise<string> {
  try {
    const j = await res.json();
    return j.detail ?? j.message ?? j.error ?? res.statusText;
  } catch {
    return res.statusText;
  }
}
