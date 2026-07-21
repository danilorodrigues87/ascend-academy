//#region src/services/http.ts
/**
* HTTP client for the painel-cti student API.
* Base URL: VITE_API_BASE_URL (ex: http://localhost/pjt/painel-cti/api/v1/student)
*/
var BASE_URL = "/api/v1/student".replace(/\/$/, "") ?? "/api";
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
	const res = await fetch(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
		...rest,
		headers: {
			"Content-Type": "application/json",
			...bearer ? { Authorization: `Bearer ${bearer}` } : {},
			...headers
		}
	});
	if (!res.ok) {
		let message = res.statusText;
		try {
			const body = await res.json();
			message = body?.message || body?.erro || message;
		} catch {}
		throw new Error(message || `HTTP ${res.status}`);
	}
	if (res.status === 204) return void 0;
	return res.json();
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
	})
};
/** Utility to simulate network latency for mocks. */
var delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
var USE_API = Boolean("/api/v1/student");
//#endregion
export { delay as n, http as r, USE_API as t };
