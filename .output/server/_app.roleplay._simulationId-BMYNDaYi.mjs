import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./_ssr/AuthContext-D4cYmnFW.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./_ssr/avatar-gunzrkKA.mjs";
import { r as initials } from "./_ssr/format-BkgF6Xya.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { L as Flame, N as Lightbulb, T as MessageCircle, X as CircleAlert, Y as CircleCheck, Z as ChevronRight, at as ArrowLeft, c as TimerReset, et as BookOpen, h as Send, i as Users, j as ListChecks, l as Target, o as Trophy, p as Sparkles, q as CircleX, v as Play } from "./_libs/lucide-react.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { t as Progress } from "./_ssr/progress-DOIEKRJF.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as rolePlayService } from "./_ssr/rolePlayService-Dus-U4cn.mjs";
import { t as Route } from "./_app.roleplay._simulationId-DhAHAytC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.roleplay._simulationId-BMYNDaYi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var difficultyLabel = {
	easy: "Fácil",
	medium: "Médio",
	hard: "Difícil",
	expert: "Especialista"
};
var difficultyOptions = [
	"easy",
	"medium",
	"hard",
	"expert"
];
function RolePlayRunnerPage() {
	const { simulationId } = Route.useParams();
	const navigate = useNavigate();
	const { data: boot, isLoading } = useQuery({
		queryKey: ["roleplay:boot", simulationId],
		queryFn: async () => {
			const existing = await rolePlayService.getSimulation(simulationId);
			if (existing) return {
				mode: "simulation",
				simulation: existing,
				scenario: await rolePlayService.getScenario(existing.scenarioId)
			};
			const scenario = await rolePlayService.getScenario(simulationId);
			if (scenario) return {
				mode: "scenario",
				scenario,
				simulation: null
			};
			return null;
		}
	});
	const [phase, setPhase] = (0, import_react.useState)("briefing");
	const [difficulty, setDifficulty] = (0, import_react.useState)("medium");
	const [simulation, setSimulation] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (boot?.scenario) setDifficulty(boot.scenario.difficulty);
		if (boot?.mode === "simulation" && boot.simulation) {
			setSimulation(boot.simulation);
			setPhase(boot.simulation.endedAt ? "evaluation" : "chat");
		}
	}, [boot]);
	const start = useMutation({
		mutationFn: () => rolePlayService.startSimulation(simulationId, difficulty),
		onSuccess: (sim) => {
			setSimulation(sim);
			setPhase("chat");
		},
		onError: (e) => toast.error(e.message)
	});
	const scenario = boot?.scenario ?? null;
	if (isLoading || !scenario) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-4 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-2xl" })]
	});
	if (phase === "briefing" && boot?.mode === "scenario") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingScreen, {
		scenario,
		difficulty,
		onChangeDifficulty: setDifficulty,
		onStart: () => start.mutate(),
		starting: start.isPending,
		onBack: () => navigate({ to: "/roleplay" })
	});
	const activeSim = simulation ?? (boot?.mode === "simulation" ? boot.simulation : null);
	if (phase === "chat" && activeSim) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatScreen, {
		scenario,
		simulation: activeSim,
		difficulty,
		onUpdated: setSimulation,
		onFinish: (finished) => {
			setSimulation(finished);
			setPhase("evaluation");
		}
	});
	if ((phase === "evaluation" || activeSim?.endedAt) && activeSim) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvaluationScreen, {
		scenario,
		simulation: activeSim,
		onReplay: () => {
			setSimulation(null);
			setPhase("briefing");
		}
	});
	return null;
}
function BriefingScreen({ scenario, difficulty, onChangeDifficulty, onStart, starting, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onBack,
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "gap-1.5 border-primary/30 bg-primary/5 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Simulação Prática"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold md:text-4xl",
						children: scenario.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							scenario.courseTitle,
							" · ",
							scenario.moduleTitle
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingBlock, {
						icon: BookOpen,
						title: "Cenário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: scenario.scenario
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingBlock, {
							icon: Users,
							title: "Seu papel",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Você será ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: scenario.userRole
									}),
									"."
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingBlock, {
							icon: MessageCircle,
							title: "Papel da IA",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"A IA será ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: scenario.aiRole
									}),
									" ",
									"(",
									scenario.aiCharacterName,
									")."
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingBlock, {
						icon: Target,
						title: "Objetivos da atividade",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: scenario.objectives.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o })]
							}, i))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingBlock, {
						icon: ListChecks,
						title: "Critérios de avaliação",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: scenario.criteria.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "font-normal",
								children: c.label
							}, c.key))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BriefingBlock, {
						icon: Flame,
						title: "Nível de dificuldade",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: difficultyOptions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onChangeDifficulty(d),
								className: `rounded-full border px-4 py-1.5 text-sm transition ${difficulty === d ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border hover:border-primary/50"}`,
								children: difficultyLabel[d]
							}, d))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Quanto maior a dificuldade, mais objeções, perguntas profundas e menos dicas. Nota mínima para aprovação: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scenario.minScore }),
								"."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onBack,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					onClick: onStart,
					disabled: starting,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), starting ? "Preparando..." : "Iniciar simulação"]
				})]
			})
		]
	});
}
function BriefingBlock({ icon: Icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pl-10",
			children
		})]
	});
}
function ChatScreen({ scenario, simulation, difficulty, onUpdated, onFinish }) {
	const { user } = useAuth();
	const [input, setInput] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const messages = simulation.messages;
	const { data: allScenarios = [] } = useQuery({
		queryKey: ["roleplay:scenarios"],
		queryFn: () => rolePlayService.listScenarios()
	});
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages.length, typing]);
	const send = useMutation({
		mutationFn: async (content) => {
			const userMsg = {
				id: `m_${Date.now()}`,
				role: "user",
				content,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			onUpdated({
				...simulation,
				messages: [...simulation.messages, userMsg]
			});
			setTyping(true);
			return {
				userMsg,
				aiMsg: await rolePlayService.sendMessage(simulation.id, content)
			};
		},
		onSuccess: ({ aiMsg }) => {
			onUpdated({
				...simulation,
				messages: [...simulation.messages, aiMsg].filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
			});
			setTyping(false);
			rolePlayService.getSimulation(simulation.id).then((s) => s && onUpdated(s));
		},
		onError: (e) => {
			setTyping(false);
			toast.error(e.message);
		}
	});
	const finish = useMutation({
		mutationFn: () => rolePlayService.finishSimulation(simulation.id),
		onSuccess: (s) => onFinish(s),
		onError: (e) => toast.error(e.message)
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const value = input.trim();
		if (!value || send.isPending || finish.isPending) return;
		setInput("");
		send.mutate(value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[360px_1fr] bg-[#f0f2f5] dark:bg-[#111b21]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden min-h-0 flex-col border-r border-black/10 bg-white dark:border-white/10 dark:bg-[#111b21] md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-black/5 bg-[#f0f2f5] px-4 py-3 dark:border-white/5 dark:bg-[#202c33]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/roleplay",
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Simulações"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "gap-1 border-primary/30 bg-primary/5 text-[10px] text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), " IA"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-black/5 px-3 py-2 dark:border-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg bg-[#f0f2f5] px-3 py-1.5 text-xs text-muted-foreground dark:bg-[#202c33]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pesquisar simulações" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: allScenarios.map((s) => {
						const active = s.id === scenario.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/roleplay/$simulationId",
							params: { simulationId: s.id },
							className: `flex items-start gap-3 border-b border-black/[0.04] px-4 py-3 transition-colors dark:border-white/[0.04] ${active ? "bg-[#f0f2f5] dark:bg-[#2a3942]" : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-11 w-11 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: s.aiCharacterAvatarUrl,
									alt: s.aiCharacterName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(s.aiCharacterName) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold",
											children: s.aiCharacterName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-[10px] text-muted-foreground",
											children: difficultyLabel[s.difficulty]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 truncate text-[11px] text-muted-foreground/80",
										children: s.courseTitle
									})
								]
							})]
						}, s.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-black/5 p-3 dark:border-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => finish.mutate(),
						disabled: finish.isPending,
						className: "w-full gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }), finish.isPending ? "Avaliando..." : "Finalizar simulação"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-0 min-w-0 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-black/10 bg-[#f0f2f5] px-4 py-2.5 dark:border-white/5 dark:bg-[#202c33]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-10 w-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: scenario.aiCharacterAvatarUrl,
								alt: scenario.aiCharacterName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(scenario.aiCharacterName) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-semibold leading-tight",
								children: scenario.aiCharacterName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: typing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400",
									children: "digitando..."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["online · ", scenario.aiRole] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "hidden gap-1 border-primary/30 bg-primary/5 text-[10px] text-primary sm:inline-flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3" }),
								" ",
								difficultyLabel[difficulty]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => finish.mutate(),
							disabled: finish.isPending,
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Finalizar"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scrollRef,
					className: "min-h-0 flex-1 overflow-y-auto bg-[#efeae2] px-3 py-4 md:px-16 md:py-6 dark:bg-[#0b141a]",
					style: {
						backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><g fill='none' stroke='%23000' stroke-opacity='0.05' stroke-width='1.2'><path d='M20 30 q10 -10 20 0 t20 0'/><circle cx='100' cy='40' r='8'/><path d='M30 90 l14 -8 l14 8 l-14 8 z'/><path d='M90 100 q10 -6 20 0'/><circle cx='60' cy='120' r='5'/></g></svg>\")",
						backgroundRepeat: "repeat"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-white/70 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur dark:bg-[#182229]/80",
								children: "Hoje"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-md rounded-lg bg-[#fff3c4] px-4 py-2 text-center text-[11px] leading-relaxed text-[#5a4a1a] shadow-sm dark:bg-[#182229] dark:text-amber-200/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "mr-1 inline h-3 w-3" }),
									"Simulação: você é ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scenario.userRole }),
									". A IA está no papel de ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scenario.aiRole }),
									"."
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-3xl flex-col gap-1",
							children: [messages.map((m, i) => {
								const prev = messages[i - 1];
								const grouped = prev && prev.role === m.role;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
									message: m,
									aiName: scenario.aiCharacterName,
									userName: user?.name,
									grouped
								}, m.id);
							}), typing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 flex items-end gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative rounded-lg rounded-bl-none bg-white px-4 py-2.5 shadow-sm dark:bg-[#202c33]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60",
												style: { animationDelay: "0.15s" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60",
												style: { animationDelay: "0.3s" }
											})
										]
									})
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "flex items-end gap-2 border-t border-black/10 bg-[#f0f2f5] px-3 py-2.5 dark:border-white/5 dark:bg-[#202c33] md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 items-end rounded-lg bg-white px-3 py-1 shadow-sm dark:bg-[#2a3942]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							autoFocus: true,
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSubmit(e);
								}
							},
							placeholder: `Digite uma mensagem como ${scenario.userRole}...`,
							className: "min-h-[40px] max-h-40 resize-none border-0 bg-transparent px-1 py-2 focus-visible:ring-0",
							disabled: finish.isPending
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						className: "h-10 w-10 shrink-0 rounded-full bg-[#00a884] text-white hover:bg-[#008f72] dark:bg-[#00a884]",
						disabled: !input.trim() || send.isPending || finish.isPending,
						"aria-label": "Enviar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				})
			]
		})]
	});
}
function MessageBubble({ message, aiName, userName, grouped }) {
	const isUser = message.role === "user";
	const time = new Date(message.createdAt).toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit"
	});
	const label = isUser ? userName ?? "Você" : aiName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex ${isUser ? "justify-end" : "justify-start"} ${grouped ? "mt-0.5" : "mt-2"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-message-id": message.id,
			className: `relative max-w-[78%] px-3 py-1.5 text-sm leading-relaxed shadow-sm ${isUser ? "rounded-lg rounded-br-none bg-[#d9fdd3] text-[#111b21] dark:bg-[#005c4b] dark:text-white" : "rounded-lg rounded-bl-none bg-white text-[#111b21] dark:bg-[#202c33] dark:text-white"}`,
			children: [
				!grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mb-0.5 text-[11px] font-semibold ${isUser ? "text-emerald-800/80 dark:text-emerald-200/90" : "text-primary"}`,
					children: label
				}),
				message.content.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: i > 0 ? "mt-1" : "",
					children: line
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `float-right ml-2 mt-1 inline-flex items-center gap-0.5 text-[10px] ${isUser ? "text-emerald-900/60 dark:text-emerald-100/70" : "text-muted-foreground"}`,
					children: [time, isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 16 11",
						width: "14",
						height: "11",
						className: "ml-0.5",
						"aria-hidden": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							d: "M11.071.653a.457.457 0 0 0-.304-.102.436.436 0 0 0-.311.15L4.85 7.256 2.081 4.463a.454.454 0 0 0-.317-.135.446.446 0 0 0-.32.13l-.94.941a.45.45 0 0 0-.13.318c0 .12.048.235.13.318L4.61 10.157a.454.454 0 0 0 .318.13.446.446 0 0 0 .32-.135L14.55 1.834a.457.457 0 0 0 0-.647z"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							d: "M15.396.653a.457.457 0 0 0-.303-.102.436.436 0 0 0-.311.15L9.176 7.256 8.5 6.582l-.94.94a.451.451 0 0 0 0 .64l1.28 1.294a.454.454 0 0 0 .318.13.446.446 0 0 0 .32-.135l9.301-9.318a.457.457 0 0 0 0-.647z"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "clear-both" })
			]
		})
	});
}
function EvaluationScreen({ scenario, simulation, onReplay }) {
	const evaluation = simulation.evaluation;
	const [highlightId, setHighlightId] = (0, import_react.useState)(null);
	const [showReference, setShowReference] = (0, import_react.useState)(false);
	const messagesById = (0, import_react.useMemo)(() => {
		return new Map(simulation.messages.map((m) => [m.id, m]));
	}, [simulation.messages]);
	(0, import_react.useEffect)(() => {
		if (!highlightId) return;
		document.querySelector(`[data-review-msg="${highlightId}"]`)?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
		const t = setTimeout(() => setHighlightId(null), 2400);
		return () => clearTimeout(t);
	}, [highlightId]);
	const passed = evaluation.passed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/roleplay",
					className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Voltar às simulações"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: onReplay,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { className: "h-4 w-4" }), " Refazer simulação"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "relative overflow-hidden p-6 md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 gradient-primary opacity-[0.08]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid gap-6 md:grid-cols-[auto_1fr] md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-background/70 p-6 shadow-soft md:w-56",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Pontuação geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-5xl font-semibold",
									children: evaluation.overallScore
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg text-muted-foreground",
									children: "/100"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: `mt-3 gap-1 ${passed ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"}`,
								variant: "outline",
								children: [passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), passed ? "Aprovado" : "Refazer"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-semibold md:text-3xl",
							children: scenario.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								scenario.courseTitle,
								" · ",
								scenario.moduleTitle
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed",
							children: evaluation.summary
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Competências avaliadas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: evaluation.competencies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: c.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-muted-foreground",
									children: [c.score, "/100"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: c.score,
								className: "h-2"
							}),
							c.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: c.comment
							})
						]
					}, c.key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackCard, {
						icon: CircleCheck,
						tone: "emerald",
						title: "O que foi bem",
						items: evaluation.strengths
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackCard, {
						icon: Lightbulb,
						tone: "amber",
						title: "Como melhorar",
						items: evaluation.improvements
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackCard, {
						icon: CircleAlert,
						tone: "rose",
						title: "Onde houve erros",
						items: evaluation.mistakes
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Conceitos para revisar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: evaluation.reviewTopics.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t })]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Linha do tempo da conversa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Clique para destacar a mensagem"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: evaluation.timeline.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
						event,
						onClick: () => setHighlightId(event.messageId),
						active: highlightId === event.messageId
					}, event.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Transcrição"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2",
					children: [
						simulation.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-review-msg": m.id,
							className: `rounded-xl border p-3 text-sm transition ${highlightId === m.id ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 bg-card"} ${m.role === "user" ? "ml-6 md:ml-16" : "mr-6 md:mr-16"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: [
									m.role === "user" ? "Você" : scenario.aiCharacterName,
									" · ",
									new Date(m.createdAt).toLocaleTimeString("pt-BR", {
										hour: "2-digit",
										minute: "2-digit"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed",
								children: m.content
							})]
						}, m.id)),
						simulation.messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhuma mensagem registrada."
						}),
						highlightId && !messagesById.has(highlightId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "A mensagem referenciada não está mais disponível."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Resposta de referência"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Uma possível condução por um profissional experiente. Existem várias formas corretas de resolver o problema — use como material de estudo."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: showReference ? "outline" : "default",
						onClick: () => setShowReference((v) => !v),
						children: showReference ? "Ocultar" : "Ver uma possível resposta de referência"
					})]
				}), showReference && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: evaluation.referenceConversation.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-xl border border-border/60 bg-muted/40 p-3 text-sm ${m.role === "user" ? "ml-6 md:ml-16" : "mr-6 md:mr-16"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: m.role === "user" ? "Profissional (aluno)" : scenario.aiCharacterName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-relaxed",
							children: m.content
						})]
					}, m.id))
				})]
			})
		]
	});
}
function FeedbackCard({ icon: Icon, tone, title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-8 w-8 place-items-center rounded-lg ${{
					emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
					amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
					rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10"
				}[tone]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-3 space-y-2 text-sm text-muted-foreground",
			children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-xs italic",
				children: "Nada a destacar."
			}), items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "leading-relaxed",
				children: ["• ", it]
			}, i))]
		})]
	});
}
function TimelineItem({ event, onClick, active }) {
	const map = {
		success: {
			icon: CircleCheck,
			className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
		},
		error: {
			icon: CircleX,
			className: "text-rose-600 dark:text-rose-400 bg-rose-500/10"
		},
		opportunity: {
			icon: Lightbulb,
			className: "text-amber-600 dark:text-amber-400 bg-amber-500/10"
		},
		decision: {
			icon: Sparkles,
			className: "text-primary bg-primary/10"
		}
	};
	const Icon = map[event.type].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${active ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 hover:border-primary/40 hover:bg-accent/40"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-8 w-8 shrink-0 place-items-center rounded-lg ${map[event.type].className}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: event.detail
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mt-1 h-4 w-4 text-muted-foreground" })
		]
	});
}
//#endregion
export { RolePlayRunnerPage as component };
