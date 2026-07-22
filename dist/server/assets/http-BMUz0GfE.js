//#region src/services/http.ts
/**
* HTTP client for the painel-cti student API.
* Base URL: VITE_API_BASE_URL (ex: http://localhost/pjt/painel-cti/api/v1/student)
*/
var BASE_URL = "https://admin.ctieducacional.com.br/api/v1/student".replace(/\/$/, "") ?? "/api";
var STORAGE_KEY = "ead.auth";
function getStoredToken() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw)?.tokens?.accessToken ?? null;
	} catch {
		return null;
	}
}
async function request(path, options = {}) {
	const { token, headers, ...rest } = options;
	const bearer = token === null ? null : token ?? getStoredToken();
	const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
	const isForm = typeof FormData !== "undefined" && rest.body instanceof FormData;
	const hdrs = {
		...bearer ? { Authorization: `Bearer ${bearer}` } : {},
		...headers
	};
	if (!isForm && !hdrs["Content-Type"]) hdrs["Content-Type"] = "application/json";
	if (isForm) delete hdrs["Content-Type"];
	const res = await fetch(url, {
		...rest,
		headers: hdrs
	});
	const contentType = res.headers.get("content-type") || "";
	const raw = await res.text();
	if (raw.trimStart().startsWith("<!") || contentType.includes("text/html")) throw new Error(`A API respondeu HTML em vez de JSON. Confira VITE_API_BASE_URL no build (agora: ${BASE_URL}) e STUDENT_CORS_ORIGINS no painel. URL: ${url}`);
	let body = void 0;
	if (raw) try {
		body = JSON.parse(raw);
	} catch {
		throw new Error(`Resposta inválida da API (${res.status}). URL: ${url}`);
	}
	if (!res.ok) {
		const errBody = body;
		const message = errBody?.message || errBody?.erro || res.statusText || `HTTP ${res.status}`;
		throw new Error(message);
	}
	if (res.status === 204) return void 0;
	return body;
}
var http = {
	get: (path, opts) => request(path, {
		...opts,
		method: "GET"
	}),
	post: (path, body, opts) => request(path, {
		...opts,
		method: "POST",
		body: JSON.stringify(body ?? {})
	}),
	put: (path, body, opts) => request(path, {
		...opts,
		method: "PUT",
		body: JSON.stringify(body ?? {})
	}),
	del: (path, opts) => request(path, {
		...opts,
		method: "DELETE"
	}),
	postForm: (path, formData, opts) => request(path, {
		...opts,
		method: "POST",
		body: formData
	}),
	/** HTML autenticado (ex.: certificado). Não exige JSON. */
	async getHtml(path, opts) {
		const { token, headers, ...rest } = opts ?? {};
		const bearer = token === null ? null : token ?? getStoredToken();
		const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
		const res = await fetch(url, {
			...rest,
			method: "GET",
			headers: {
				...bearer ? { Authorization: `Bearer ${bearer}` } : {},
				...headers
			}
		});
		const raw = await res.text();
		if (!res.ok) throw new Error(`Não foi possível abrir o certificado (${res.status}).`);
		return raw;
	}
};
/** Utility to simulate network latency for mocks. */
var delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
var USE_API = Boolean("https://admin.ctieducacional.com.br/api/v1/student");
//#endregion
export { delay as n, http as r, USE_API as t };
