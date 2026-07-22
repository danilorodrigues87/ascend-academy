import { r as http, t as USE_API } from "./http-B1eFK7Op.js";
import { n as cn, t as Button } from "./button-DRsC1qZi.js";
import { t as Skeleton } from "./skeleton-wE5XVTSu.js";
import { t as EmptyState } from "./EmptyState-CuuisWFT.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DYLv5Rbv.js";
import { r as initials } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-BLWafi8D.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
//#region src/routes/_app.ranking.tsx?tsr-split=component
async function fetchRanking(scope) {
	if (!USE_API) return {
		entries: [],
		me: null,
		scope
	};
	return http.get(`/ranking?scope=${scope}`);
}
function RankingPage() {
	const [scope, setScope] = useState("school");
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["ranking", scope],
		queryFn: () => fetchRanking(scope)
	});
	const periodDays = data?.periodDays ?? 30;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl font-semibold",
					children: scope === "global" ? "Ranking global" : "Ranking da escola"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-muted-foreground",
					children: scope === "global" ? `XP ganho nos últimos ${periodDays} dias — todas as escolas (cidade/UF). Assim quem estuda com constância compete de forma justa, independente do tamanho do catálogo.` : "Pontuação total dos alunos desta escola (XP por aulas, atividades e role plays)."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: scope === "school" ? "default" : "outline",
						onClick: () => setScope("school"),
						children: "Escola"
					}), /* @__PURE__ */ jsxs(Button, {
						size: "sm",
						variant: scope === "global" ? "default" : "outline",
						onClick: () => setScope("global"),
						children: [
							"Global · ",
							periodDays,
							"d"
						]
					})]
				})
			] }),
			data?.me && /* @__PURE__ */ jsxs(Card, {
				className: "flex items-center gap-4 border-primary/30 bg-primary/5 p-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ jsx(Trophy, { className: "h-6 w-6" })
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: ["Sua posição", scope === "global" ? ` (últimos ${periodDays} dias)` : ""]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "font-display text-xl font-semibold",
						children: [
							"#",
							data.me.position,
							" · ",
							data.me.xp,
							" XP · Nível ",
							data.me.level
						]
					}),
					data.me.city ? /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: data.me.city
					}) : null
				] })]
			}),
			/* @__PURE__ */ jsx(Card, {
				className: "divide-y divide-border/60 overflow-hidden p-0",
				children: isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-16 rounded-none" }, i)) : isError ? /* @__PURE__ */ jsx("div", {
					className: "p-4",
					children: /* @__PURE__ */ jsx(EmptyState, {
						icon: Trophy,
						title: "Não foi possível carregar o ranking",
						description: "Se o SQL de XP ainda não rodou no painel, peça para a escola executar database/lms_xp.sql.",
						onRetry: () => void refetch(),
						className: "border-0 bg-transparent py-10"
					})
				}) : (data?.entries ?? []).length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "p-4",
					children: /* @__PURE__ */ jsx(EmptyState, {
						icon: Trophy,
						title: "Ainda sem pontuações",
						description: "Conclua aulas e atividades para aparecer no ranking.",
						actionLabel: "Ver cursos",
						actionTo: "/courses",
						className: "border-0 bg-transparent py-10"
					})
				}) : (data?.entries ?? []).map((e) => /* @__PURE__ */ jsxs("div", {
					className: cn("flex items-center gap-3 px-4 py-3", e.isCurrentUser && "bg-primary/5"),
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "w-8 text-sm font-semibold text-muted-foreground",
							children: ["#", e.position ?? "-"]
						}),
						/* @__PURE__ */ jsxs(Avatar, {
							className: "h-9 w-9",
							children: [/* @__PURE__ */ jsx(AvatarImage, { src: e.avatarUrl }), /* @__PURE__ */ jsx(AvatarFallback, { children: initials(e.name) })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "truncate text-sm font-medium",
								children: e.name
							}), /* @__PURE__ */ jsxs("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									e.city ? `${e.city} · ` : "",
									"Nível ",
									e.level
								]
							})]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-sm font-semibold",
							children: [e.xp, " XP"]
						})
					]
				}, e.id))
			})
		]
	});
}
//#endregion
export { RankingPage as component };
