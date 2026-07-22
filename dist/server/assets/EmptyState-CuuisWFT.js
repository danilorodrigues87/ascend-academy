import { n as cn, t as Button } from "./button-DRsC1qZi.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/common/EmptyState.tsx
/** Empty / error state padrão do portal. */
function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, onRetry, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/80 bg-card/40 px-6 py-14 text-center", className),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "font-display text-xl font-semibold",
				children: title
			}),
			description ? /* @__PURE__ */ jsx("p", {
				className: "max-w-md text-sm text-muted-foreground",
				children: description
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap items-center justify-center gap-2",
				children: [onRetry ? /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: onRetry,
					children: "Tentar de novo"
				}) : null, actionLabel && actionTo ? /* @__PURE__ */ jsx(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ jsx(Link, {
						to: actionTo,
						children: actionLabel
					})
				}) : null]
			})
		]
	});
}
//#endregion
export { EmptyState as t };
