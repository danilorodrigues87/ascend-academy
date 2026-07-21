import { t as assessmentsService } from "./assessmentsService-BIlrrkBP.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Award, CheckCircle2, Circle, Clock, MessageSquare, Sparkles, Target } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/ui/radio-group.tsx
var RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/routes/_app.assessments.tsx?tsr-split=component
function AssessmentsPage() {
	const { data: list = [], isLoading } = useQuery({
		queryKey: ["assessments"],
		queryFn: () => assessmentsService.list()
	});
	const [active, setActive] = useState(null);
	const [result, setResult] = useState(null);
	if (active) return /* @__PURE__ */ jsx(AssessmentRunner, {
		assessment: active,
		onExit: () => {
			setActive(null);
			setResult(null);
		},
		onDone: setResult,
		result
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-4xl font-semibold",
			children: "Avaliações"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-muted-foreground",
			children: "Teste seu conhecimento e receba feedback inteligente."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: isLoading ? Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-48 rounded-xl" }, i)) : list.map((a) => /* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-xl font-semibold",
							children: a.title
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: a.description
						})] }), a.bestScore != null && /* @__PURE__ */ jsxs(Badge, { children: [
							"Melhor: ",
							a.bestScore,
							"%"
						] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
									" ",
									a.durationMinutes,
									" min"
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(Target, { className: "h-3.5 w-3.5" }),
									" ",
									a.questions.length,
									" questões"
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5" }),
									" ",
									a.attempts,
									" tentativas"
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-5 flex gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							className: "flex-1",
							onClick: () => setActive(a),
							children: "Iniciar"
						}), /* @__PURE__ */ jsx(Button, {
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
	const [answers, setAnswers] = useState({});
	const submit = useMutation({
		mutationFn: () => assessmentsService.submit(assessment.id, answers),
		onSuccess: (r) => {
			onDone(r);
			toast.success("Avaliação enviada!");
		}
	});
	if (result) return /* @__PURE__ */ jsx(ResultView, {
		result,
		onExit
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Avaliação"
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl font-semibold",
					children: assessment.title
				})] }), /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					onClick: onExit,
					children: "Sair"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: assessment.questions.map((q, i) => /* @__PURE__ */ jsxs(Card, {
					className: "p-6",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: [
								"Questão ",
								i + 1,
								" · ",
								typeLabel(q.type)
							]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-2 text-lg font-medium",
							children: q.prompt
						}),
						q.type === "roleplay" && q.roleplayCharacter && /* @__PURE__ */ jsxs(Badge, {
							variant: "secondary",
							className: "mt-3 gap-1",
							children: [
								/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
								" IA como: ",
								q.roleplayCharacter
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4",
							children: [
								q.type === "multiple" && q.options && /* @__PURE__ */ jsx(RadioGroup, {
									value: answers[q.id] ?? "",
									onValueChange: (v) => setAnswers((a) => ({
										...a,
										[q.id]: v
									})),
									children: q.options.map((o) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 rounded-lg border border-border/60 p-3 transition hover:bg-accent/40",
										children: [/* @__PURE__ */ jsx(RadioGroupItem, {
											value: o.id,
											id: `${q.id}_${o.id}`
										}), /* @__PURE__ */ jsx(Label, {
											htmlFor: `${q.id}_${o.id}`,
											className: "flex-1 cursor-pointer",
											children: o.label
										})]
									}, o.id))
								}),
								q.type === "boolean" && /* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-2 gap-2",
									children: ["true", "false"].map((v) => /* @__PURE__ */ jsx(Button, {
										variant: answers[q.id] === v ? "default" : "outline",
										onClick: () => setAnswers((a) => ({
											...a,
											[q.id]: v
										})),
										children: v === "true" ? "Verdadeiro" : "Falso"
									}, v))
								}),
								(q.type === "essay" || q.type === "roleplay") && /* @__PURE__ */ jsx(Textarea, {
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
			/* @__PURE__ */ jsx(Button, {
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
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs(Card, {
				className: "gradient-hero p-8 text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-glow",
						children: /* @__PURE__ */ jsx(Award, { className: "h-8 w-8 text-primary-foreground" })
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 text-sm uppercase tracking-wider text-muted-foreground",
						children: "Sua nota"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 font-display text-6xl font-semibold",
						children: result.score
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 mx-auto max-w-xl text-sm text-muted-foreground",
						children: result.feedback
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "mb-3 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-success" }), " Pontos fortes"]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2 text-sm",
						children: result.strengths.map((s, i) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-success",
									children: "•"
								}),
								" ",
								s
							]
						}, i))
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ jsxs("h3", {
						className: "mb-3 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-warning-foreground" }), " A melhorar"]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2 text-sm",
						children: result.improvements.map((s, i) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
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
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-4 font-medium",
					children: "Competências avaliadas"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: result.competencies.map((c) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ jsx("span", { children: c.name }), /* @__PURE__ */ jsxs("span", {
							className: "font-medium",
							children: [c.score, "%"]
						})]
					}), /* @__PURE__ */ jsx(Progress, {
						value: c.score,
						className: "mt-1 h-2"
					})] }, c.name))
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
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
