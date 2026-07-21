import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as authService } from "./authService-DJollOv2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-D4cYmnFW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function readSession() {
	if (typeof window === "undefined") return null;
	return authService.getSession();
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(() => readSession());
	const [loading, setLoading] = (0, import_react.useState)(() => typeof window === "undefined");
	(0, import_react.useEffect)(() => {
		setSession(authService.getSession());
		setLoading(false);
	}, []);
	const login = (0, import_react.useCallback)(async (c) => {
		const s = await authService.login(c);
		setSession(s);
	}, []);
	const logout = (0, import_react.useCallback)(async () => {
		await authService.logout();
		setSession(null);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			user: session?.user ?? null,
			loading,
			login,
			logout,
			isAuthenticated: !!session
		},
		children
	});
}
var useAuth = () => {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useAuth must be inside AuthProvider");
	return v;
};
//#endregion
export { useAuth as n, AuthProvider as t };
