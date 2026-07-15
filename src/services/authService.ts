/**
 * Auth service — simulated JWT flow.
 * Swap the `delay + mock` bodies for `http.post(...)` calls when the PHP API exists.
 */
import type { AuthTokens, LoginCredentials, User } from "@/types";
import { delay } from "./http";
import { mockUser } from "./mocks/data";

const STORAGE_KEY = "ead.auth";

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await delay(600);
    if (!credentials.email || !credentials.password) {
      throw new Error("Informe email e senha.");
    }
    // Simulated JWT
    const tokens: AuthTokens = {
      accessToken: "mock.jwt." + btoa(credentials.email),
      refreshToken: "mock.refresh." + Date.now(),
      expiresIn: 3600,
    };
    const session: AuthSession = { user: mockUser, tokens };
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    return session;
  },

  async firstAccess(payload: { email: string; password: string; token: string }): Promise<AuthSession> {
    await delay(600);
    if (!payload.token) throw new Error("Token de primeiro acesso inválido.");
    return this.login({ email: payload.email, password: payload.password });
  },

  async forgotPassword(email: string): Promise<{ ok: true }> {
    await delay(500);
    if (!email) throw new Error("Informe seu email.");
    return { ok: true };
  },

  async logout(): Promise<void> {
    await delay(150);
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  },

  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  },
};
