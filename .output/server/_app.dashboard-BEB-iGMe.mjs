import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./_ssr/AuthContext-D4cYmnFW.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./_ssr/avatar-gunzrkKA.mjs";
import { i as relativeTime, n as formatMinutes, r as initials } from "./_ssr/format-BkgF6Xya.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { J as CirclePlay, L as Flame, W as Clock, et as BookOpen, it as ArrowRight, nt as Bell, o as Trophy, p as Sparkles, rt as Award, s as TrendingUp, t as lucide_react_exports } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { t as Progress } from "./_ssr/progress-DOIEKRJF.mjs";
import { t as coursesService } from "./_ssr/coursesService-DXN4SuWd.mjs";
import { t as CourseCard } from "./_ssr/CourseCard-hBq-YhYx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-BEB-iGMe.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, hint, icon: Icon, accent = "primary" }) {
	const accentClass = {
		primary: "bg-primary/10 text-primary",
		success: "bg-success/15 text-success",
		warning: "bg-warning/20 text-warning-foreground",
		"chart-2": "bg-chart-2/15 text-chart-2"
	}[accent];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "gradient-card relative overflow-hidden p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl font-semibold leading-none",
						children: value
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: hint
					})
				]
			}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accentClass}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
function DashboardPage() {
	const { user } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => coursesService.getDashboard()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-3xl border border-border/60 gradient-hero p-6 md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:flex-wrap sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-14 w-14 shrink-0 border-2 border-primary/30 shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: user?.avatarUrl,
								alt: user?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: user ? initials(user.name) : "AA" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Olá, bem-vinda de volta 👋"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-display text-2xl font-semibold sm:text-3xl",
									children: user?.name
								}),
								data?.currentCourse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 truncate text-sm text-muted-foreground",
									children: ["Estudando ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: data.currentCourse.title
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Sequência"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-lg font-semibold leading-none",
							children: [data?.streakDays ?? 0, " dias"]
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Progresso geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [data?.overallProgress ?? 0, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: data?.overallProgress ?? 0,
						className: "h-2"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Cursos",
						value: data?.coursesCount ?? 0,
						icon: BookOpen,
						hint: "matriculados"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Concluído",
						value: `${data?.overallProgress ?? 0}%`,
						icon: TrendingUp,
						accent: "success",
						hint: "progresso geral"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Tempo estudado",
						value: formatMinutes(data?.studyMinutes ?? 0),
						icon: Clock,
						accent: "chart-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Sequência",
						value: `${data?.streakDays ?? 0} dias`,
						icon: Flame,
						accent: "warning",
						hint: "consecutivos"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "lg:col-span-2 overflow-hidden p-0",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" }) : data?.continueLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-primary/60 to-muted",
							children: [data.continueLesson.course.bannerUrl || data.continueLesson.course.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: data.continueLesson.course.bannerUrl || data.continueLesson.course.coverUrl || "",
								alt: "",
								className: "h-full w-full object-cover"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col justify-end p-6 md:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "w-fit",
									children: (data.continueLesson.course.progressPercent ?? 0) > 0 ? "Continue de onde parou" : "Comece agora"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-2xl font-semibold text-balance md:text-3xl",
									children: data.continueLesson.lesson.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										data.continueLesson.course.title,
										" · ",
										data.continueLesson.lesson.durationMinutes,
										"min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/courses/$courseId/lessons/$lessonId",
											params: {
												courseId: data.continueLesson.course.id,
												lessonId: data.continueLesson.lesson.id
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-5 w-5" }), (data.continueLesson.course.progressPercent ?? 0) > 0 ? "Continuar aula" : "Começar aula"]
										})
									})
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-64 flex-col items-center justify-center gap-3 p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Nenhum curso para continuar. Matricule-se e publique o EAD no painel."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/courses",
								children: "Meus cursos"
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium",
								children: "Notificações"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notifications",
							className: "text-xs text-primary hover:underline",
							children: "Ver todas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: isLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-lg" }, i)) : data?.notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-1 text-xs text-muted-foreground",
										children: n.message
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[10px] uppercase tracking-wider text-muted-foreground",
										children: relativeTime(n.createdAt)
									})
								]
							})]
						}, n.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Últimos cursos acessados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Continue seus estudos onde parou."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "gap-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/courses",
						children: ["Ver tudo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-xl" }, i)) : data?.recentCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "gradient-card p-6 lg:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Seu nível"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-4xl font-semibold",
							children: ["Nv. ", data?.level ?? 1]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-primary-foreground" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [data?.xp ?? 0, " XP"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [data?.nextLevelXp ?? 0, " XP"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: (data?.xp ?? 0) / (data?.nextLevelXp || 1) * 100,
								className: "h-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Faltam ",
									(data?.nextLevelXp ?? 0) - (data?.xp ?? 0),
									" XP para o próximo nível."
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium",
							children: "Conquistas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-muted-foreground" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: data?.achievements.slice(0, 6).map((a) => {
							const IconComp = lucide_react_exports[a.icon] ?? Award;
							const unlocked = !!a.unlockedAt;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-xl border p-3 transition ${unlocked ? "border-primary/40 bg-primary/5" : "border-border/60 opacity-70"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-9 w-9 place-items-center rounded-lg ${unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 truncate text-sm font-medium",
										children: a.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-1 text-xs text-muted-foreground",
										children: a.description
									}),
									!unlocked && a.progress != null && a.goal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: a.progress / a.goal * 100,
										className: "mt-2 h-1"
									})
								]
							}, a.id);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold",
						children: "Ranking semanal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Sua posição entre os alunos mais dedicados."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-primary" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: data?.ranking.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-3 rounded-xl border p-3 transition ${r.isCurrentUser ? "border-primary/40 bg-primary/5" : "border-border/60"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold ${r.position === 1 ? "bg-warning/25 text-warning-foreground" : "bg-muted"}`,
								children: r.position
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-9 w-9",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: r.avatarUrl,
									alt: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(r.name) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium",
									children: [
										r.name,
										" ",
										r.isCurrentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-primary",
											children: "(você)"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "shrink-0 text-sm font-medium",
								children: [r.xp.toLocaleString("pt-BR"), " XP"]
							})
						]
					}, r.id))
				})]
			}) })
		]
	});
}
//#endregion
export { DashboardPage as component };
