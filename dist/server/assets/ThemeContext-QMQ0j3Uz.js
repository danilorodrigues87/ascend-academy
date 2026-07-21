import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/contexts/ThemeContext.tsx
var Ctx = createContext(null);
var KEY = "ead.theme";
function ThemeProvider({ children }) {
	const [theme, setThemeState] = useState("dark");
	useEffect(() => {
		const initial = (typeof window !== "undefined" ? localStorage.getItem(KEY) : null) ?? "dark";
		setThemeState(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const setTheme = (t) => {
		setThemeState(t);
		document.documentElement.classList.toggle("dark", t === "dark");
		localStorage.setItem(KEY, t);
	};
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value: {
			theme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
			setTheme
		},
		children
	});
}
var useTheme = () => {
	const v = useContext(Ctx);
	if (!v) throw new Error("useTheme must be inside ThemeProvider");
	return v;
};
//#endregion
export { useTheme as n, ThemeProvider as t };
