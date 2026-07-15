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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

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
