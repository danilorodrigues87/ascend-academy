import { n as notificationsService } from "./notificationsService-CuilXXX3.js";
import { t as Button } from "./button-DRsC1qZi.js";
import { t as Skeleton } from "./skeleton-wE5XVTSu.js";
import { t as EmptyState } from "./EmptyState-CuuisWFT.js";
import { i as relativeTime } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-BLWafi8D.js";
import { n as useNotificationPrefs, t as filterNotificationsByPrefs } from "./notificationPrefs-C1vBJD-L.js";
import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, Bell, BookOpen, CheckCheck, Info, Settings, Sparkles } from "lucide-react";
//#region src/routes/_app.notifications.tsx?tsr-split=component
var iconFor = {
	lesson: BookOpen,
	course: BookOpen,
	certificate: Award,
	ai: Sparkles,
	system: Info
};
function NotificationsPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [prefs] = useNotificationPrefs();
	const { data: list = [], isLoading, isError, refetch } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => notificationsService.list()
	});
	const visible = useMemo(() => filterNotificationsByPrefs(list, prefs), [list, prefs]);
	const markAll = useMutation({
		mutationFn: () => notificationsService.markAllRead(),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["notifications"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		}
	});
	const markOne = useMutation({
		mutationFn: (id) => notificationsService.markRead(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["notifications"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		}
	});
	const openNotification = (n) => {
		if (!n.read) markOne.mutate(n.id);
		if (n.link) navigate({ to: n.link });
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Notificações"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-muted-foreground",
				children: "Novidades sobre seus cursos, IA e conquistas."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "gap-2",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/settings",
						children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), " Preferências"]
					})
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					className: "gap-2",
					onClick: () => markAll.mutate(),
					disabled: !visible.length,
					children: [/* @__PURE__ */ jsx(CheckCheck, { className: "h-4 w-4" }), " Marcar todas como lidas"]
				})]
			})]
		}), !prefs.enabled ? /* @__PURE__ */ jsx(EmptyState, {
			icon: Bell,
			title: "Notificações desativadas",
			description: "Ative em Configurações para voltar a ver avisos no portal.",
			actionLabel: "Abrir configurações",
			actionTo: "/settings"
		}) : /* @__PURE__ */ jsx(Card, {
			className: "divide-y divide-border/60 overflow-hidden p-0",
			children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-20 rounded-none" }, i)) : isError ? /* @__PURE__ */ jsx("div", {
				className: "p-4",
				children: /* @__PURE__ */ jsx(EmptyState, {
					icon: Bell,
					title: "Falha ao carregar notificações",
					onRetry: () => void refetch(),
					className: "border-0 bg-transparent py-10"
				})
			}) : visible.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "p-4",
				children: /* @__PURE__ */ jsx(EmptyState, {
					icon: Bell,
					title: "Sem notificações por enquanto",
					description: "Avisos de aulas, certificados e conquistas aparecem aqui.",
					className: "border-0 bg-transparent py-10"
				})
			}) : visible.map((n) => {
				const Icon = iconFor[n.type] ?? Info;
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => openNotification(n),
					className: "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-accent/40",
					children: [
						/* @__PURE__ */ jsx("span", { className: `mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted" : "bg-primary"}` }),
						/* @__PURE__ */ jsx("div", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "truncate text-sm font-medium",
									children: n.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "line-clamp-2 text-xs text-muted-foreground",
									children: n.message
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 text-[10px] uppercase tracking-wider text-muted-foreground",
									children: relativeTime(n.createdAt)
								})
							]
						})
					]
				}, n.id);
			})
		})]
	});
}
//#endregion
export { NotificationsPage as component };
