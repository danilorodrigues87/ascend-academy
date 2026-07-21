import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { n as notificationsService } from "./_ssr/notificationsService-W8l6LgJg.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { i as relativeTime } from "./_ssr/format-BkgF6Xya.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { I as Info, Q as CheckCheck, et as BookOpen, nt as Bell, p as Sparkles, rt as Award } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.notifications-n2VmwjF3.js
var import_jsx_runtime = require_jsx_runtime();
var iconFor = {
	lesson: BookOpen,
	course: BookOpen,
	certificate: Award,
	ai: Sparkles,
	system: Info
};
function NotificationsPage() {
	const qc = useQueryClient();
	const { data: list = [], isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => notificationsService.list()
	});
	const markAll = useMutation({
		mutationFn: () => notificationsService.markAllRead(),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Notificações"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Novidades sobre seus cursos, IA e conquistas."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "gap-2",
				onClick: () => markAll.mutate(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), " Marcar todas como lidas"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "divide-y divide-border/60",
			children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20" }, i)) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-12 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mx-auto h-8 w-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3",
					children: "Sem notificações por enquanto."
				})]
			}) : list.map((n) => {
				const Icon = iconFor[n.type];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex gap-4 p-4 transition ${!n.read ? "bg-primary/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${!n.read ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: relativeTime(n.createdAt)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: n.message
						})]
					})]
				}, n.id);
			})
		})]
	});
}
//#endregion
export { NotificationsPage as component };
