/**
 * Auth service — JWT against painel-cti /api/v1/student
 */
import type { AuthTokens, LoginCredentials, User } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockUser } from "./mocks/data";

const STORAGE_KEY = "ead.auth";

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

function persist(session: AuthSession) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    if (!credentials.email || !credentials.password) {
      throw new Error("Informe email e senha.");
    }
    if (USE_API) {
      const data = await http.post<{ user: User; tokens: AuthTokens }>("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      }, { token: null });
      const session: AuthSession = { user: data.user, tokens: data.tokens };
      persist(session);
      return session;
    }
    await delay(600);
    const tokens: AuthTokens = {
      accessToken: "mock.jwt." + btoa(credentials.email),
      refreshToken: "mock.refresh." + Date.now(),
      expiresIn: 3600,
    };
    const session: AuthSession = { user: mockUser, tokens };
    persist(session);
    return session;
  },

  async firstAccess(payload: { email: string; password: string; token: string }): Promise<AuthSession> {
    if (!payload.token) throw new Error("Token de primeiro acesso inválido.");
    if (USE_API) {
      const data = await http.post<{ user: User; tokens: AuthTokens }>("/auth/first-access", payload, {
        token: null,
      });
      const session: AuthSession = { user: data.user, tokens: data.tokens };
      persist(session);
      return session;
    }
    return this.login({ email: payload.email, password: payload.password });
  },

  async forgotPassword(email: string): Promise<{ ok: true }> {
    if (!email) throw new Error("Informe seu email.");
    if (USE_API) {
      return http.post<{ ok: true }>("/auth/forgot-password", { email }, { token: null });
    }
    await delay(500);
    return { ok: true };
  },

  async logout(): Promise<void> {
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
