import { n as delay, r as http, t as USE_API } from "./http-BO5E21SS.js";
import { c as mockUser } from "./data-gIza-OcL.js";
//#region src/services/authService.ts
var STORAGE_KEY = "ead.auth";
function persist(session) {
	if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
var authService = {
	async login(credentials) {
		if (!credentials.email || !credentials.password) throw new Error("Informe email e senha.");
		if (USE_API) {
			const data = await http.post("/auth/login", {
				email: credentials.email,
				password: credentials.password
			}, { token: null });
			const session = {
				user: data.user,
				tokens: data.tokens
			};
			persist(session);
			return session;
		}
		await delay(600);
		const session = {
			user: mockUser,
			tokens: {
				accessToken: "mock.jwt." + btoa(credentials.email),
				refreshToken: "mock.refresh." + Date.now(),
				expiresIn: 3600
			}
		};
		persist(session);
		return session;
	},
	async firstAccess(payload) {
		if (!payload.token) throw new Error("Token de primeiro acesso inválido.");
		if (USE_API) {
			const data = await http.post("/auth/first-access", payload, { token: null });
			const session = {
				user: data.user,
				tokens: data.tokens
			};
			persist(session);
			return session;
		}
		return this.login({
			email: payload.email,
			password: payload.password
		});
	},
	async forgotPassword(email) {
		if (!email) throw new Error("Informe seu email.");
		if (USE_API) return http.post("/auth/forgot-password", { email }, { token: null });
		await delay(500);
		return { ok: true };
	},
	async logout() {
		if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
	},
	getSession() {
		if (typeof window === "undefined") return null;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}
};
//#endregion
export { authService as t };
