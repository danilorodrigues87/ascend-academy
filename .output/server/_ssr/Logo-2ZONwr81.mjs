import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-2ZONwr81.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ collapsed = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand/cti-logo.png",
			alt: "CTI Educacional",
			className: "h-9 w-9 shrink-0 rounded-xl object-contain"
		}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "CTI Educacional"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
				children: "Portal do Aluno"
			})]
		})]
	});
}
//#endregion
export { Logo as t };
