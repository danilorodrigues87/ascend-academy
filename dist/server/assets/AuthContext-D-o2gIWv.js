import { t as authService } from "./authService-BLjk4SS7.js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/contexts/AuthContext.tsx
var Ctx = createContext(null);
function readSession() {
	if (typeof window === "undefined") return null;
	return authService.getSession();
}
function AuthProvider({ children }) {
	const [session, setSession] = useState(() => readSession());
	const [loading, setLoading] = useState(() => typeof window === "undefined");
	useEffect(() => {
		setSession(authService.getSession());
		setLoading(false);
	}, []);
	const login = useCallback(async (c) => {
		const s = await authService.login(c);
		setSession(s);
	}, []);
	const logout = useCallback(async () => {
		await authService.logout();
		setSession(null);
	}, []);
	const refreshUser = useCallback(async () => {
		const user = await authService.refreshUser();
		setSession(authService.getSession());
		return user;
	}, []);
	const setUser = useCallback((user) => {
		authService.patchUser(user);
		setSession(authService.getSession());
	}, []);
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value: {
			user: session?.user ?? null,
			loading,
			login,
			logout,
			refreshUser,
			setUser,
			isAuthenticated: !!session
		},
		children
	});
}
var useAuth = () => {
	const v = useContext(Ctx);
	if (!v) throw new Error("useAuth must be inside AuthProvider");
	return v;
};
//#endregion
export { useAuth as n, AuthProvider as t };
