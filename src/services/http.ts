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
  const isForm = typeof FormData !== "undefined" && rest.body instanceof FormData;
  const hdrs: Record<string, string> = {
    ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
    ...(headers as Record<string, string> | undefined),
  };
  if (!isForm && !hdrs["Content-Type"]) {
    hdrs["Content-Type"] = "application/json";
  }
  // FormData: não forçar Content-Type (boundary automático)
  if (isForm) {
    delete hdrs["Content-Type"];
  }
  const res = await fetch(url, {
    ...rest,
    headers: hdrs,
  });

  const contentType = res.headers.get("content-type") || "";
  // Remove BOM / lixo no início (alguns setups PHP no Windows)
  let raw = (await res.text()).replace(/^\uFEFF/, "");
  const trimmed = raw.trim();

  let body: unknown = undefined;
  let parsedOk = false;
  if (trimmed) {
    try {
      body = JSON.parse(trimmed);
      parsedOk = true;
    } catch {
      // Se veio warning PHP antes do JSON, tenta achar o primeiro { ou [
      const iObj = trimmed.indexOf("{");
      const iArr = trimmed.indexOf("[");
      let start = -1;
      if (iObj >= 0 && iArr >= 0) start = Math.min(iObj, iArr);
      else start = Math.max(iObj, iArr);
      if (start > 0) {
        try {
          body = JSON.parse(trimmed.slice(start));
          parsedOk = true;
        } catch {
          parsedOk = false;
        }
      }
    }
  }

  if (!parsedOk && (trimmed.startsWith("<!") || trimmed.toLowerCase().startsWith("<!doctype") || contentType.includes("text/html"))) {
    throw new Error(
      "A API respondeu HTML em vez de JSON. No local use o proxy do Vite (VITE_API_BASE_URL=/api/v1/student) " +
        `e reinicie o npm run dev. URL: ${url}`,
    );
  }

  if (!parsedOk && trimmed) {
    const preview = trimmed.replace(/\s+/g, " ").slice(0, 180);
    throw new Error(`Resposta inválida da API (${res.status}). URL: ${url}. Corpo: ${preview}`);
  }

  if (!trimmed && res.status !== 204) {
    throw new Error(`API retornou corpo vazio (${res.status}). URL: ${url}`);
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
  postForm: <T>(path: string, formData: FormData, opts?: HttpOptions) =>
    request<T>(path, { ...opts, method: "POST", body: formData }),
  /** HTML autenticado (ex.: certificado). Não exige JSON. */
  async getHtml(path: string, opts?: HttpOptions): Promise<string> {
    const { token, headers, ...rest } = opts ?? {};
    const bearer = token === null ? null : token ?? getStoredToken();
    const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await fetch(url, {
      ...rest,
      method: "GET",
      headers: {
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
        ...(headers as Record<string, string> | undefined),
      },
    });
    const raw = await res.text();
    if (!res.ok) {
      if (res.status === 403) {
        throw new Error("Certificado desatualizado. Conclua o conteúdo novo do curso para renovar.");
      }
      throw new Error(`Não foi possível abrir o certificado (${res.status}).`);
    }
    return raw;
  },
};

/** Utility to simulate network latency for mocks. */
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const USE_API = Boolean(import.meta.env.VITE_API_BASE_URL);
