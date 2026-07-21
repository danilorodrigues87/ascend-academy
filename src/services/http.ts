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
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...headers,
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const raw = await res.text();

  // Resposta HTML = URL da API errada (ex.: build com /api relativo no subdomínio do portal)
  if (raw.trimStart().startsWith("<!") || contentType.includes("text/html")) {
    throw new Error(
      "A API respondeu HTML em vez de JSON. Confira VITE_API_BASE_URL no build " +
        `(agora: ${BASE_URL}) e STUDENT_CORS_ORIGINS no painel. URL: ${url}`,
    );
  }

  let body: unknown = undefined;
  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch {
      throw new Error(`Resposta inválida da API (${res.status}). URL: ${url}`);
    }
  }

  if (!res.ok) {
    const errBody = body as { message?: string; erro?: string } | undefined;
    const message = errBody?.message || errBody?.erro || res.statusText || `HTTP ${res.status}`;
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return body as T;
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
