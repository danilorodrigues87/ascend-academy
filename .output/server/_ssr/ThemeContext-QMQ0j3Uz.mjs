import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeContext-QMQ0j3Uz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var KEY = "ead.theme";
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const initial = (typeof window !== "undefined" ? localStorage.getItem(KEY) : null) ?? "dark";
		setThemeState(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const setTheme = (t) => {
		setThemeState(t);
		document.documentElement.classList.toggle("dark", t === "dark");
		localStorage.setItem(KEY, t);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			theme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
			setTheme
		},
		children
	});
}
var useTheme = () => {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useTheme must be inside ThemeProvider");
	return v;
};
//#endregion
export { useTheme as n, ThemeProvider as t };
