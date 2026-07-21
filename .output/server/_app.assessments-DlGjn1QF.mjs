import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { C as MessageSquare, K as Circle, W as Clock, Y as CircleCheck, l as Target, p as Sparkles, rt as Award } from "./_libs/lucide-react.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as assessmentsService } from "./_ssr/assessmentsService-BIlrrkBP.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Progress } from "./_ssr/progress-DOIEKRJF.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "./_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.assessments-DlGjn1QF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
function AssessmentsPage() {
	const { data: list = [], isLoading } = useQuery({
		queryKey: ["assessments"],
		queryFn: () => assessmentsService.list()
	});
	const [active, setActive] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	if (active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentRunner, {
		assessment: active,
		onExit: () => {
			setActive(null);
			setResult(null);
		},
		onDone: setResult,
		result
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-semibold",
			children: "Avaliações"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Teste seu conhecimento e receba feedback inteligente."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: isLoading ? Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-xl" }, i)) : list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: a.description
						})] }), a.bestScore != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
							"Melhor: ",
							a.bestScore,
							"%"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
									" ",
									a.durationMinutes,
									" min"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3.5 w-3.5" }),
									" ",
									a.questions.length,
									" questões"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5" }),
									" ",
									a.attempts,
									" tentativas"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1",
							onClick: () => setActive(a),
							children: "Iniciar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							children: "Histórico"
						})]
					})
				]
			}, a.id))
		})]
	});
}
function AssessmentRunner({ assessment, onExit, onDone, result }) {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const submit = useMutation({
		mutationFn: () => assessmentsService.submit(assessment.id, answers),
		onSuccess: (r) => {
			onDone(r);
			toast.success("Avaliação enviada!");
		}
	});
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultView, {
		result,
		onExit
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Avaliação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: assessment.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onExit,
					children: "Sair"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: assessment.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: [
								"Questão ",
								i + 1,
								" · ",
								typeLabel(q.type)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-medium",
							children: q.prompt
						}),
						q.type === "roleplay" && q.roleplayCharacter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "mt-3 gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }),
								" IA como: ",
								q.roleplayCharacter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								q.type === "multiple" && q.options && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
									value: answers[q.id] ?? "",
									onValueChange: (v) => setAnswers((a) => ({
										...a,
										[q.id]: v
									})),
									children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-lg border border-border/60 p-3 transition hover:bg-accent/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											value: o.id,
											id: `${q.id}_${o.id}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: `${q.id}_${o.id}`,
											className: "flex-1 cursor-pointer",
											children: o.label
										})]
									}, o.id))
								}),
								q.type === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: ["true", "false"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: answers[q.id] === v ? "default" : "outline",
										onClick: () => setAnswers((a) => ({
											...a,
											[q.id]: v
										})),
										children: v === "true" ? "Verdadeiro" : "Falso"
									}, v))
								}),
								(q.type === "essay" || q.type === "roleplay") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									placeholder: q.type === "roleplay" ? "Sua resposta ao personagem..." : "Sua resposta...",
									className: "min-h-[120px]",
									value: answers[q.id] ?? "",
									onChange: (e) => setAnswers((a) => ({
										...a,
										[q.id]: e.target.value
									}))
								})
							]
						})
					]
				}, q.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "w-full",
				disabled: submit.isPending,
				onClick: () => submit.mutate(),
				children: submit.isPending ? "Corrigindo..." : "Enviar avaliação"
			})
		]
	});
}
function ResultView({ result, onExit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "gradient-hero p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-8 w-8 text-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm uppercase tracking-wider text-muted-foreground",
						children: "Sua nota"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-6xl font-semibold",
						children: result.score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 mx-auto max-w-xl text-sm text-muted-foreground",
						children: result.feedback
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-3 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), " Pontos fortes"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: result.strengths.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-success",
									children: "•"
								}),
								" ",
								s
							]
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-3 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-warning-foreground" }), " A melhorar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: result.improvements.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "•"
								}),
								" ",
								s
							]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-medium",
					children: "Competências avaliadas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: result.competencies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [c.score, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: c.score,
						className: "mt-1 h-2"
					})] }, c.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: onExit,
				children: "Voltar às avaliações"
			})
		]
	});
}
function typeLabel(t) {
	return {
		multiple: "Alternativa",
		boolean: "Verdadeiro / Falso",
		essay: "Dissertativa",
		roleplay: "Role Play com IA"
	}[t];
}
//#endregion
export { AssessmentsPage as component };
