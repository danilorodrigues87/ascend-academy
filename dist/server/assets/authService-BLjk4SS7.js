import { n as delay, r as http, t as USE_API } from "./http-B1eFK7Op.js";
import { c as mockUser } from "./data-ebpVXPb2.js";
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
	async forgotPassword(email) {
		if (!email) throw new Error("Informe seu email.");
		if (USE_API) return http.post("/auth/forgot-password", { email }, { token: null });
		await delay(500);
		return { ok: true };
	},
	async resetPassword(token, password) {
		if (!token) throw new Error("Link inválido.");
		if (!password || password.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres.");
		if (USE_API) return http.post("/auth/reset-password", {
			token,
			password
		}, { token: null });
		await delay(500);
		return {
			ok: true,
			message: "Senha atualizada."
		};
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
	},
	/** Atualiza o user na sessão (XP, avatar, cidade…) via GET /me. */
	async refreshUser() {
		const session = this.getSession();
		if (!session) return null;
		if (!USE_API) return session.user;
		const user = await http.get("/me");
		persist({
			...session,
			user
		});
		return user;
	},
	patchUser(partial) {
		const session = this.getSession();
		if (!session) return null;
		const user = {
			...session.user,
			...partial
		};
		persist({
			...session,
			user
		});
		return user;
	},
	async uploadAvatar(file) {
		if (!USE_API) {
			const url = URL.createObjectURL(file);
			const user = this.patchUser({ avatarUrl: url });
			if (!user) throw new Error("Sessão inválida.");
			return user;
		}
		const fd = new FormData();
		fd.append("foto", file);
		const data = await http.postForm("/me/avatar", fd);
		const session = this.getSession();
		if (!session) throw new Error("Sessão inválida.");
		persist({
			...session,
			user: data.user
		});
		return data.user;
	},
	/** Altera senha do aluno logado. */
	async changePassword(currentPassword, newPassword, confirmPassword) {
		if (!currentPassword) throw new Error("Informe a senha atual.");
		if (!newPassword || newPassword.length < 8) throw new Error("A nova senha deve ter pelo menos 8 caracteres.");
		if (newPassword !== confirmPassword) throw new Error("A confirmação da nova senha não confere.");
		if (USE_API) return http.post("/me/password", {
			currentPassword,
			newPassword,
			confirmPassword
		});
		await delay(400);
		return {
			ok: true,
			message: "Senha alterada com sucesso."
		};
	}
};
//#endregion
export { authService as t };
