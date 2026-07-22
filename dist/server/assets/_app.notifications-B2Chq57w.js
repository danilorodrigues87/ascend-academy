import { n as notificationsService } from "./notificationsService-DL4GnbI-.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { i as relativeTime } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, Bell, BookOpen, CheckCheck, Info, Sparkles } from "lucide-react";
//#region src/routes/_app.notifications.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Notificações"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-muted-foreground",
				children: "Novidades sobre seus cursos, IA e conquistas."
			})] }), /* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				size: "sm",
				className: "gap-2",
				onClick: () => markAll.mutate(),
				children: [/* @__PURE__ */ jsx(CheckCheck, { className: "h-4 w-4" }), " Marcar todas como lidas"]
			})]
		}), /* @__PURE__ */ jsx(Card, {
			className: "divide-y divide-border/60",
			children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-20" }, i)) : list.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "p-12 text-center text-muted-foreground",
				children: [/* @__PURE__ */ jsx(Bell, { className: "mx-auto h-8 w-8" }), /* @__PURE__ */ jsx("p", {
					className: "mt-3",
					children: "Sem notificações por enquanto."
				})]
			}) : list.map((n) => {
				const Icon = iconFor[n.type];
				return /* @__PURE__ */ jsxs("div", {
					className: `flex gap-4 p-4 transition ${!n.read ? "bg-primary/5" : ""}`,
					children: [/* @__PURE__ */ jsx("div", {
						className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${!n.read ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
						children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: n.title
							}), /* @__PURE__ */ jsx("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: relativeTime(n.createdAt)
							})]
						}), /* @__PURE__ */ jsx("p", {
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
