/**
 * Thin HTTP client stub.
 *
 * Today: not used — services return mock data directly.
 * Tomorrow: swap the `mock*` functions in each service for `http.get/post`
 * calls against the PHP REST API. The rest of the app won't need changes.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type HttpOptions = RequestInit & { token?: string | null };

async function request<T>(path: string, options: HttpOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${body || res.statusText}`);
  }
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

/** Utility to simulate network latency for a premium loading UX. */
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
