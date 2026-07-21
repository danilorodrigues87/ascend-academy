/**
 * HTTP client for the painel-cti student API.
 * Base URL: VITE_API_BASE_URL (ex: http://localhost/pjt/painel-cti/api/v1/student)
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "/api";

const STORAGE_KEY = "ead.auth";

type HttpOptions = RequestInit & { token?: string | null };

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as { tokens?: { accessToken?: string } };
    return session?.tokens?.accessToken ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const bearer = token === null ? null : token ?? getStoredToken();
  const res = await fetch(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = (await res.json()) as { message?: string; erro?: string };
      message = body?.message || body?.erro || message;
    } catch {
      /* ignore */
    }
    throw new Error(message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const http = {
  get: <T>(path: string, opts?: HttpOptions) => request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: unknown, opts?: HttpOptions) =>
    request<T>(path, { ...opts, method: "POST", body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown, opts?: HttpOptions) =>
    request<T>(path, { ...opts, method: "PUT", body: JSON.stringify(body ?? {}) }),
  del: <T>(path: string, opts?: HttpOptions) => request<T>(path, { ...opts, method: "DELETE" }),
};

/** Utility to simulate network latency for mocks. */
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const USE_API = Boolean(import.meta.env.VITE_API_BASE_URL);
