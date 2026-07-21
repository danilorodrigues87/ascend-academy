import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { authService, type AuthSession } from "@/services/authService";
import type { LoginCredentials, User } from "@/types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (c: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  return authService.getSession();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // No cliente, lê a sessão já no 1º render (evita spinner eterno após F5)
  const [session, setSession] = useState<AuthSession | null>(() => readSession());
  const [loading, setLoading] = useState(() => typeof window === "undefined");

  useEffect(() => {
    setSession(authService.getSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (c: LoginCredentials) => {
    const s = await authService.login(c);
    setSession(s);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  return (
    <Ctx.Provider
      value={{
        user: session?.user ?? null,
        loading,
        login,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
};
