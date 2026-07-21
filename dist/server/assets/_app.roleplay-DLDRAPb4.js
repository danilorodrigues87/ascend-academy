import { t as rolePlayService } from "./rolePlayService-MRT-hpz1.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, CheckCircle2, Clock, Flame, MessageSquare, RefreshCw, Sparkles, Users } from "lucide-react";
//#region src/routes/_app.roleplay.tsx?tsr-split=component
var difficultyLabel = {
	easy: "Fácil",
	medium: "Médio",
	hard: "Difícil",
	expert: "Especialista"
};
var difficultyTone = {
	easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
	medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
	hard: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
	expert: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
};
var statusMeta = {
	pending: {
		label: "Não iniciado",
		className: "bg-muted text-muted-foreground"
	},
	in_progress: {
		label: "Em andamento",
		className: "bg-primary/10 text-primary"
	},
	approved: {
		label: "Aprovado",
		className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
	},
	retry: {
		label: "Refazer",
		className: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
	}
};
function formatDuration(seconds) {
	return `${Math.floor(seconds / 60)}m ${(seconds % 60).toString().padStart(2, "0")}s`;
}
function RolePlayListPage() {
	const scenarios = useQuery({
		queryKey: ["roleplay:scenarios"],
		queryFn: () => rolePlayService.listScenarios()
	});
	const history = useQuery({
		queryKey: ["roleplay:history"],
		queryFn: () => rolePlayService.listHistory()
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-6xl space-y-10 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs(Badge, {
						variant: "outline",
						className: "gap-1.5 border-primary/30 bg-primary/5 text-primary",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }), " Novo tipo de atividade"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-3xl font-semibold md:text-4xl",
						children: "Simulações Práticas com IA"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "max-w-2xl text-muted-foreground",
						children: "Pratique situações reais antes de concluir cada módulo. Converse com personagens controlados por IA, receba avaliação por competência e feedback personalizado."
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-semibold",
						children: "Simulações disponíveis"
					})
				}), scenarios.isLoading ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-52 rounded-2xl" }, i))
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: scenarios.data?.map((s) => /* @__PURE__ */ jsxs(Card, {
						className: "group relative overflow-hidden border-border/60 p-6 transition hover:border-primary/40 hover:shadow-elegant",
						children: [
							/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-1 gradient-primary opacity-70" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-start gap-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${difficultyTone[s.difficulty]}`,
										children: [
											/* @__PURE__ */ jsx(Flame, { className: "h-3 w-3" }),
											" ",
											difficultyLabel[s.difficulty]
										]
									}),
									/* @__PURE__ */ jsxs(Badge, {
										variant: "secondary",
										className: "gap-1",
										children: [
											/* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
											" ",
											s.estimatedMinutes,
											" min"
										]
									}),
									/* @__PURE__ */ jsxs(Badge, {
										variant: "secondary",
										className: "gap-1",
										children: [
											/* @__PURE__ */ jsx(BookOpen, { className: "h-3 w-3" }),
											" ",
											s.courseTitle
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-4 font-display text-xl font-semibold leading-snug",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground",
								children: s.moduleTitle
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-4 grid gap-2 text-sm",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ jsx(Users, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ jsxs("span", { children: [
										"Você é ",
										/* @__PURE__ */ jsx("strong", { children: s.userRole }),
										". A IA será",
										" ",
										/* @__PURE__ */ jsx("strong", { children: s.aiRole }),
										"."
									] })]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-5 flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground",
									children: ["Nota mínima ", /* @__PURE__ */ jsx("strong", {
										className: "text-foreground",
										children: s.minScore
									})]
								}), /* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "sm",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/roleplay/$simulationId",
										params: { simulationId: s.id },
										children: "Iniciar simulação"
									})
								})]
							})
						]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-xl font-semibold",
					children: "Histórico de simulações"
				}), history.isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-2xl" }) : (history.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsx(Card, {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "Você ainda não realizou nenhuma simulação."
				}) : /* @__PURE__ */ jsx(Card, {
					className: "overflow-hidden border-border/60",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Data"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Curso / Módulo"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Tema"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Nota"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Tempo"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Msgs"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-4 py-3 text-left font-medium",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", { children: history.data?.map((h) => /* @__PURE__ */ jsxs("tr", {
								className: "border-t border-border/60",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: new Date(h.startedAt).toLocaleDateString("pt-BR", {
											day: "2-digit",
											month: "short",
											year: "numeric"
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-medium",
											children: h.courseTitle
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: h.moduleTitle
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: h.theme
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 font-semibold",
										children: h.score ?? "—"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: formatDuration(h.durationSeconds)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: h.messages.length || "—"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusMeta[h.status].className}`,
											children: [h.status === "approved" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3 w-3" }) : h.status === "retry" ? /* @__PURE__ */ jsx(RefreshCw, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(MessageSquare, { className: "h-3 w-3" }), statusMeta[h.status].label]
										})
									})
								]
							}, h.id)) })]
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { RolePlayListPage as component };
