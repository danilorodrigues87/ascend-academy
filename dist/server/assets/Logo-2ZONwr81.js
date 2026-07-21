import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/common/Logo.tsx
function Logo({ collapsed = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ jsx("img", {
			src: "/brand/cti-logo.png",
			alt: "CTI Educacional",
			className: "h-9 w-9 shrink-0 rounded-xl object-contain"
		}), !collapsed && /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "CTI Educacional"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
				children: "Portal do Aluno"
			})]
		})]
	});
}
//#endregion
export { Logo as t };
