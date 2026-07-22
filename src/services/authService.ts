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

  async forgotPassword(email: string): Promise<{ ok: true }> {
    if (!email) throw new Error("Informe seu email.");
    if (USE_API) {
      return http.post<{ ok: true }>("/auth/forgot-password", { email }, { token: null });
    }
    await delay(500);
    return { ok: true };
  },

  async resetPassword(token: string, password: string): Promise<{ ok: true; message?: string }> {
    if (!token) throw new Error("Link inválido.");
    if (!password || password.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres.");
    if (USE_API) {
      return http.post<{ ok: true; message?: string }>(
        "/auth/reset-password",
        { token, password },
        { token: null },
      );
    }
    await delay(500);
    return { ok: true, message: "Senha atualizada." };
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

  /** Atualiza o user na sessão (XP, avatar, cidade…) via GET /me. */
  async refreshUser(): Promise<User | null> {
    const session = this.getSession();
    if (!session) return null;
    if (!USE_API) return session.user;
    const user = await http.get<User>("/me");
    persist({ ...session, user });
    return user;
  },

  patchUser(partial: Partial<User>): User | null {
    const session = this.getSession();
    if (!session) return null;
    const user = { ...session.user, ...partial };
    persist({ ...session, user });
    return user;
  },

  async uploadAvatar(file: File): Promise<User> {
    if (!USE_API) {
      const url = URL.createObjectURL(file);
      const user = this.patchUser({ avatarUrl: url });
      if (!user) throw new Error("Sessão inválida.");
      return user;
    }
    const fd = new FormData();
    fd.append("foto", file);
    const data = await http.postForm<{ ok: boolean; user: User; message?: string }>("/me/avatar", fd);
    const session = this.getSession();
    if (!session) throw new Error("Sessão inválida.");
    persist({ ...session, user: data.user });
    return data.user;
  },

  /** Altera senha do aluno logado. */
  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<{ ok: true; message?: string }> {
    if (!currentPassword) throw new Error("Informe a senha atual.");
    if (!newPassword || newPassword.length < 8) throw new Error("A nova senha deve ter pelo menos 8 caracteres.");
    if (newPassword !== confirmPassword) throw new Error("A confirmação da nova senha não confere.");
    if (USE_API) {
      return http.post<{ ok: true; message?: string }>("/me/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
    }
    await delay(400);
    return { ok: true, message: "Senha alterada com sucesso." };
  },
};
