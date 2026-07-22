import { n as useAuth } from "./AuthContext-Cq_UlsaX.js";
import { t as coursesService } from "./coursesService-CBuJL57Z.js";
import { t as assessmentsService } from "./assessmentsService-Cn7PSUrG.js";
import { t as aiService } from "./aiService-D7P5Cnq3.js";
import { t as rolePlayService } from "./rolePlayService-rmVf9Fi-.js";
import { t as Route } from "./_app.courses._courseId.lessons._lessonId-C0ZtKk7X.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { n as formatMinutes } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { n as CourseRatingControl } from "./CourseRating-BIoFrBHc.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Download, ExternalLink, FileText, Link as Link$1, Lock, MessageCircleMore, PanelRightClose, PanelRightOpen, PlayCircle, RefreshCw, Send, Sparkles, Square } from "lucide-react";
//#region src/utils/youtube.ts
/** Extrai ID e monta URL embed do YouTube. */
function youtubeVideoId(url) {
	const u = (url || "").trim();
	if (!u) return null;
	if (/^[a-zA-Z0-9_-]{11}$/.test(u)) return u;
	return u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? null;
}
function toYoutubeEmbed(url) {
	const id = youtubeVideoId(url);
	return id ? `https://www.youtube.com/embed/${id}` : null;
}
function youtubeEmbedSrc(url, params = "rel=0&modestbranding=1") {
	const embed = toYoutubeEmbed(url);
	if (!embed) return null;
	return embed.includes("?") ? `${embed}&${params}` : `${embed}?${params}`;
}
//#endregion
//#region src/components/course/InlineAssessment.tsx
function InlineAssessment({ assessmentId, courseId, lessonId, onBack, onAdvance }) {
	const qc = useQueryClient();
	const { refreshUser } = useAuth();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["assessment", assessmentId],
		queryFn: () => assessmentsService.getById(assessmentId)
	});
	const [qIndex, setQIndex] = useState(0);
	const [draft, setDraft] = useState("");
	const [result, setResult] = useState(null);
	const [busy, setBusy] = useState(false);
	const [autoAdvancePending, setAutoAdvancePending] = useState(false);
	useEffect(() => {
		setQIndex(0);
		setDraft("");
		setResult(null);
		setAutoAdvancePending(false);
	}, [assessmentId]);
	useEffect(() => {
		if (!autoAdvancePending || !onAdvance || result?.needsRewatch) return;
		const t = setTimeout(() => {
			setAutoAdvancePending(false);
			onAdvance();
		}, 1800);
		return () => clearTimeout(t);
	}, [
		autoAdvancePending,
		onAdvance,
		result?.needsRewatch
	]);
	const startMut = useMutation({
		mutationFn: () => assessmentsService.start(assessmentId),
		onSuccess: () => refetch(),
		onError: (e) => toast.error(e.message || "Não foi possível iniciar.")
	});
	if (isLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full rounded-xl" });
	if (!data) return /* @__PURE__ */ jsx("p", {
		className: "text-muted-foreground",
		children: "Atividade não encontrada."
	});
	const attempt = data.attempt;
	const lockedMap = attempt?.answers ?? {};
	const questions = data.questions;
	const q = questions[qIndex];
	const locked = q ? lockedMap[q.id] : void 0;
	const allLocked = questions.length > 0 && questions.every((qq) => lockedMap[qq.id]?.locked);
	const inProgress = attempt?.status === "in_progress" || attempt?.canAnswer;
	const finished = attempt?.status === "completed" && attempt.score != null;
	const confirmAnswer = async () => {
		if (!q || !draft.trim() || busy || locked) return;
		setBusy(true);
		try {
			if (!inProgress) await assessmentsService.start(assessmentId);
			const r = await assessmentsService.answer(assessmentId, q.id, draft.trim());
			setDraft("");
			await refetch();
			if (r.correct === true) toast.success(`Correto · ${r.score}%`);
			else if (r.correct === false) toast.message(`Registrado · ${r.score}%`);
			else toast.success("Resposta registrada");
			if (r.allAnswered) {
				const fin = await assessmentsService.finalize(assessmentId);
				setResult(fin);
				toast.success(`Atividade finalizada: ${fin.score}%${fin.xpEarned ? ` · +${fin.xpEarned} XP` : ""}`);
				qc.invalidateQueries({ queryKey: ["course"] });
				qc.invalidateQueries({ queryKey: ["lesson", courseId] });
				if (lessonId) qc.invalidateQueries({ queryKey: [
					"lesson",
					courseId,
					lessonId
				] });
				qc.invalidateQueries({ queryKey: ["ranking"] });
				qc.invalidateQueries({ queryKey: ["dashboard"] });
				await refreshUser();
				await refetch();
				if (!fin.needsRewatch && onAdvance) setAutoAdvancePending(true);
			} else if (qIndex < questions.length - 1) setQIndex((i) => i + 1);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Falha ao registrar resposta");
		} finally {
			setBusy(false);
		}
	};
	if (result || finished && !inProgress && allLocked) {
		const score = result?.score ?? attempt?.score ?? 0;
		const feedback = result?.feedback ?? attempt?.feedback ?? "";
		const xp = result?.xpEarned;
		const canAdvance = !!onAdvance && !result?.needsRewatch;
		return /* @__PURE__ */ jsxs(Card, {
			className: "space-y-4 p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Resultado"
					}), /* @__PURE__ */ jsx("h1", {
						className: "font-display text-2xl font-semibold",
						children: data.title
					})] }), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: onBack,
						children: "Voltar à aula"
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "font-display text-4xl font-semibold",
					children: [score, "%"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: feedback
				}),
				xp != null && /* @__PURE__ */ jsxs("p", {
					className: "text-sm font-medium text-primary",
					children: [
						"+",
						xp,
						" XP"
					]
				}),
				result?.needsRewatch && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-amber-600",
					children: "Média da aula abaixo de 70%. Assista a aula novamente para liberar +3 tentativas."
				}),
				result?.unitScore != null && /* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Média da unidade: ",
						result.unitScore,
						"%"
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Tentativas: ",
						attempt?.attemptsUsed ?? 0,
						"/",
						attempt?.attemptsMax ?? data.attempts
					]
				}),
				autoAdvancePending && canAdvance && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Avançando para o próximo item…"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [attempt?.canStart && /* @__PURE__ */ jsx(Button, {
						onClick: () => {
							setResult(null);
							setAutoAdvancePending(false);
							setQIndex(0);
							startMut.mutate();
						},
						children: "Nova tentativa"
					}), canAdvance && /* @__PURE__ */ jsx(Button, {
						variant: autoAdvancePending ? "default" : "outline",
						onClick: () => {
							setAutoAdvancePending(false);
							onAdvance?.();
						},
						children: "Próximo"
					})]
				})
			]
		});
	}
	if (!inProgress && !attempt?.canAnswer) return /* @__PURE__ */ jsxs(Card, {
		className: "space-y-4 p-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Atividade"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-2xl font-semibold",
					children: data.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: data.description
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						questions.length,
						" questões · ",
						data.attempt?.attemptsMax ?? 3,
						" tentativas por ciclo · respostas definitivas"
					]
				}),
				data.attempt?.rewatchHint && /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-amber-600",
					children: data.attempt.rewatchHint
				}),
				data.unitScore != null && /* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Média da unidade (atividades + roleplay): ",
						data.unitScore,
						"%"
					]
				})
			] }), /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: onBack,
				children: "Voltar à aula"
			})]
		}), attempt?.canStart === false ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-destructive",
			children: "Limite de tentativas esgotado."
		}) : /* @__PURE__ */ jsx(Button, {
			onClick: () => startMut.mutate(),
			disabled: startMut.isPending,
			children: "Começar atividade"
		})]
	});
	if (!q) return null;
	return /* @__PURE__ */ jsxs(Card, {
		className: "space-y-4 p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: [
						"Questão ",
						qIndex + 1,
						" de ",
						questions.length
					]
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-display text-2xl font-semibold",
					children: data.title
				})] }), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: onBack,
					children: "Voltar à aula"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-xl border border-border/60 p-4",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium",
					children: q.prompt
				}), locked ? /* @__PURE__ */ jsxs("div", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ jsxs("p", { children: [
							"Sua resposta: ",
							/* @__PURE__ */ jsx("strong", { children: locked.answer }),
							locked.correct === true && " — Correto",
							locked.correct === false && " — Incorreto"
						] }),
						locked.feedback && /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: locked.feedback
						}),
						locked.score != null && /* @__PURE__ */ jsxs("p", {
							className: "text-muted-foreground",
							children: [
								"Nota desta questão: ",
								locked.score,
								"%"
							]
						}),
						qIndex < questions.length - 1 ? /* @__PURE__ */ jsx(Button, {
							onClick: () => {
								setQIndex((i) => i + 1);
								setDraft("");
							},
							children: "Próxima questão"
						}) : /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Todas respondidas — finalizando…"
						})
					]
				}) : q.type === "essay" ? /* @__PURE__ */ jsx(Textarea, {
					className: "mt-3",
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Digite sua resposta (será corrigida por IA)",
					disabled: busy
				}) : q.type === "boolean" ? /* @__PURE__ */ jsx("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: (q.options?.length ? q.options : [{
						id: "true",
						label: "Verdadeiro"
					}, {
						id: "false",
						label: "Falso"
					}]).map((opt) => /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: draft === opt.id ? "default" : "outline",
						onClick: () => setDraft(opt.id),
						disabled: busy,
						children: opt.label
					}, opt.id))
				}) : /* @__PURE__ */ jsx("div", {
					className: "mt-3 space-y-2",
					children: (q.options ?? []).map((opt) => /* @__PURE__ */ jsxs("label", {
						className: "flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm hover:bg-accent/30",
						children: [/* @__PURE__ */ jsx("input", {
							type: "radio",
							name: q.id,
							checked: draft === opt.id,
							onChange: () => setDraft(opt.id),
							disabled: busy
						}), opt.label]
					}, opt.id))
				})]
			}),
			!locked && /* @__PURE__ */ jsx(Button, {
				disabled: busy || !draft.trim(),
				onClick: () => void confirmAnswer(),
				children: busy ? "Corrigindo…" : "Confirmar resposta"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Após confirmar, a resposta não pode ser alterada."
			})
		]
	});
}
//#endregion
//#region src/components/course/InlineRoleplay.tsx
function InlineRoleplay({ scenarioId, courseId, onDone, onAdvance }) {
	const { data: scenario, isLoading } = useQuery({
		queryKey: ["roleplay:scenario", scenarioId],
		queryFn: () => rolePlayService.getScenario(scenarioId)
	});
	const [sim, setSim] = useState(null);
	const [input, setInput] = useState("");
	const [busy, setBusy] = useState(false);
	const [remaining, setRemaining] = useState(null);
	useEffect(() => {
		if (remaining == null || remaining <= 0 || !sim || sim.endedAt) return;
		const t = setInterval(() => setRemaining((r) => r == null ? r : Math.max(0, r - 1)), 1e3);
		return () => clearInterval(t);
	}, [remaining, sim]);
	useEffect(() => {
		if (remaining === 0 && sim && !sim.endedAt) finishNow();
	}, [remaining]);
	const start = async () => {
		setBusy(true);
		try {
			const s = await rolePlayService.startSimulation(scenarioId, "medium");
			setSim(s);
			setRemaining(s.timeRemainingSeconds ?? (scenario?.estimatedMinutes ?? 15) * 60);
		} catch {
			toast.error("Não foi possível iniciar o role play.");
		} finally {
			setBusy(false);
		}
	};
	const send = async () => {
		if (!sim || !input.trim() || busy) return;
		const content = input.trim();
		setInput("");
		setBusy(true);
		setSim((prev) => prev ? {
			...prev,
			messages: [...prev.messages, {
				id: `u_${Date.now()}`,
				role: "user",
				content,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]
		} : prev);
		try {
			const aiMsg = await rolePlayService.sendMessage(sim.id, content);
			setSim((prev) => prev ? {
				...prev,
				messages: [...prev.messages, aiMsg]
			} : prev);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Falha ao enviar");
		} finally {
			setBusy(false);
		}
	};
	const finishNow = async () => {
		if (!sim || busy) return;
		setBusy(true);
		try {
			const done = await rolePlayService.finishSimulation(sim.id);
			setSim(done);
			setRemaining(0);
			const xpPart = done.xpEarned ? ` · +${done.xpEarned} XP` : "";
			toast.success(`Role play finalizado: ${done.score ?? 0}%${xpPart}`);
			onDone();
		} catch {
			toast.error("Não foi possível finalizar.");
		} finally {
			setBusy(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full rounded-xl" });
	if (!scenario) return /* @__PURE__ */ jsx("p", {
		className: "text-muted-foreground",
		children: "Cenário não encontrado."
	});
	if (!sim) return /* @__PURE__ */ jsxs(Card, {
		className: "space-y-4 p-8 text-center",
		children: [
			/* @__PURE__ */ jsx(MessageCircleMore, { className: "mx-auto h-10 w-10 text-primary" }),
			/* @__PURE__ */ jsx("h2", {
				className: "font-display text-xl font-semibold",
				children: scenario.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: scenario.scenario || scenario.theme
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Tempo limite: ",
					scenario.estimatedMinutes,
					" min · Nota mínima: ",
					scenario.minScore,
					"%"
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: ["Curso ", courseId]
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: () => void start(),
				disabled: busy,
				children: "Iniciar simulação"
			})
		]
	});
	const mm = remaining != null ? Math.floor(remaining / 60) : 0;
	const ss = remaining != null ? remaining % 60 : 0;
	if (!!sim.endedAt || sim.status === "approved" || sim.status === "retry") return /* @__PURE__ */ jsxs(Card, {
		className: "space-y-4 p-6",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "font-display text-xl font-semibold",
				children: ["Resultado — ", scenario.title]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "font-display text-4xl font-semibold",
				children: [sim.score ?? 0, "%"]
			}),
			sim.xpEarned != null && sim.xpEarned > 0 && /* @__PURE__ */ jsxs("p", {
				className: "text-sm font-medium text-primary",
				children: [
					"+",
					sim.xpEarned,
					" XP"
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: sim.evaluation?.summary
			}),
			sim.needsRewatch && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-amber-600",
				children: "Média da unidade abaixo de 70%. Reassine a aula para novo ciclo."
			}),
			sim.evaluation?.strengths?.length ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-medium uppercase text-muted-foreground",
				children: "Pontos fortes"
			}), /* @__PURE__ */ jsx("ul", {
				className: "mt-1 list-disc pl-5 text-sm",
				children: sim.evaluation.strengths.map((s) => /* @__PURE__ */ jsx("li", { children: s }, s))
			})] }) : null,
			onAdvance && !sim.needsRewatch && /* @__PURE__ */ jsx(Button, {
				onClick: onAdvance,
				children: "Próximo"
			})
		]
	});
	return /* @__PURE__ */ jsxs(Card, {
		className: "flex min-h-[420px] flex-col p-0",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-border/60 px-4 py-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-display text-lg font-semibold",
					children: scenario.title
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Você: ",
						scenario.userRole,
						" · Personagem: ",
						scenario.aiCharacterName
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "text-right text-sm",
					children: [/* @__PURE__ */ jsxs("p", {
						className: remaining != null && remaining < 60 ? "font-semibold text-destructive" : "font-medium",
						children: [
							String(mm).padStart(2, "0"),
							":",
							String(ss).padStart(2, "0")
						]
					}), /* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void finishNow(),
						disabled: busy,
						children: "Finalizar"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: sim.messages.map((m) => /* @__PURE__ */ jsx("div", {
					className: `rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "ml-8 bg-primary/10" : "mr-8 bg-muted"}`,
					children: m.content
				}, m.id))
			}),
			/* @__PURE__ */ jsxs("form", {
				className: "flex gap-2 border-t border-border/60 p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ jsx(Input, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Sua fala na simulação…",
					disabled: busy
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					size: "icon",
					disabled: busy || !input.trim(),
					children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/_app.courses.$courseId.lessons.$lessonId.tsx?tsr-split=component
function LessonPage() {
	const { courseId, lessonId } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { refreshUser } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [sideTab, setSideTab] = useState(search.panel === "ai" ? "ai" : "content");
	const { data, isLoading, isError } = useQuery({
		queryKey: [
			"lesson",
			courseId,
			lessonId
		],
		queryFn: () => coursesService.getLesson(courseId, lessonId)
	});
	const [notes, setNotes] = useState("");
	useEffect(() => {
		const saved = localStorage.getItem(`notes:${lessonId}`);
		setNotes(saved ?? "");
	}, [lessonId]);
	useEffect(() => {
		const t = setTimeout(() => localStorage.setItem(`notes:${lessonId}`, notes), 400);
		return () => clearTimeout(t);
	}, [notes, lessonId]);
	const complete = useMutation({
		mutationFn: () => coursesService.markLessonCompleted(courseId, lessonId),
		onSuccess: (res) => {
			toast.success(res?.message || "Aula marcada como concluída!");
			qc.invalidateQueries({ queryKey: [
				"lesson",
				courseId,
				lessonId
			] });
			qc.invalidateQueries({ queryKey: ["course", courseId] });
			qc.invalidateQueries({ queryKey: ["courses"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			qc.invalidateQueries({ queryKey: ["ranking"] });
			refreshUser();
		},
		onError: (e) => {
			toast.error(e.message || "Não foi possível concluir a aula.");
		}
	});
	const activeItem = useMemo(() => {
		if (!search.item || !data) return {
			kind: "lesson",
			id: lessonId
		};
		const [kind, id] = search.item.split(":");
		if ((kind === "assessment" || kind === "roleplay") && id) return {
			kind,
			id
		};
		return {
			kind: "lesson",
			id: lessonId
		};
	}, [
		search.item,
		lessonId,
		data
	]);
	const { prev, next } = useMemo(() => {
		if (!data) return {
			prev: null,
			next: null
		};
		const flat = data.course.modules.flatMap((m) => m.curriculum ?? m.lessons.map((l) => ({
			kind: "lesson",
			id: l.id,
			title: l.title,
			order: l.order,
			durationMinutes: l.durationMinutes,
			completed: l.completed,
			locked: l.locked
		})));
		let idx = -1;
		if (activeItem.kind === "lesson") idx = flat.findIndex((i) => i.kind === "lesson" && i.id === data.lesson.id);
		else idx = flat.findIndex((i) => i.kind === activeItem.kind && i.id === activeItem.id);
		return {
			prev: flat[idx - 1] ?? null,
			next: flat[idx + 1] ?? null
		};
	}, [data, activeItem]);
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl space-y-4 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(Skeleton, { className: "aspect-video w-full rounded-2xl" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-1/2" })]
	});
	if (isError || !data) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3 p-8",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: "Não foi possível carregar a aula."
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Curso ",
					courseId,
					" · Aula ",
					lessonId
				]
			}),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/courses",
					children: "Voltar aos cursos"
				})
			})
		]
	});
	const { course, lesson } = data;
	const accessWindow = data.accessWindow ?? course.accessWindow;
	const contentLocked = !!lesson.locked && !lesson.completed;
	const goItem = (item) => {
		if (item.locked) {
			if (item.lockMessage) toast.message(item.lockMessage);
			return;
		}
		if (item.kind === "lesson") {
			navigate({
				to: "/courses/$courseId/lessons/$lessonId",
				params: {
					courseId: course.id,
					lessonId: item.id
				},
				search: { panel: sideTab }
			});
			return;
		}
		navigate({
			to: "/courses/$courseId/lessons/$lessonId",
			params: {
				courseId: course.id,
				lessonId
			},
			search: {
				panel: sideTab,
				item: `${item.kind}:${item.id}`
			}
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `mx-auto grid max-w-[1600px] gap-0 p-0 md:p-2 ${sidebarOpen ? "lg:grid-cols-[minmax(0,1fr)_380px]" : "grid-cols-1"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0 space-y-4 p-4 md:p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/courses",
						className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Meus cursos"]
					}), /* @__PURE__ */ jsxs(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setSidebarOpen((v) => !v),
						className: "gap-1",
						children: [sidebarOpen ? /* @__PURE__ */ jsx(PanelRightClose, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(PanelRightOpen, { className: "h-4 w-4" }), sidebarOpen ? "Ocultar" : "Conteúdo"]
					})]
				}),
				accessWindow && /* @__PURE__ */ jsxs("div", {
					className: `rounded-xl border px-4 py-3 text-sm ${accessWindow.active ? "border-emerald-500/30 bg-emerald-500/10 text-foreground" : "border-amber-500/30 bg-amber-500/10 text-foreground"}`,
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-medium",
							children: accessWindow.active ? "Sessão de estudos ativa" : "Fora do horário agendado"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-muted-foreground",
							children: accessWindow.message
						}),
						accessWindow.active && /* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"Cota: ",
								accessWindow.quotaUsed,
								"/",
								accessWindow.quotaMax,
								" aulas novas usadas nesta sessão",
								accessWindow.quotaRemaining > 0 ? ` · restam ${accessWindow.quotaRemaining}` : "",
								"."
							]
						})
					]
				}),
				lesson.needsRewatch && /* @__PURE__ */ jsxs("div", {
					className: "rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-medium text-amber-800 dark:text-amber-200",
						children: "Reassinatura necessária"
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							"A média da unidade",
							lesson.unitScore != null ? ` ficou em ${Math.round(lesson.unitScore)}%` : "",
							" (mínimo 70%). Assista esta aula novamente para liberar um novo ciclo de tentativas nas atividades e no role play."
						]
					})]
				}),
				!lesson.needsRewatch && lesson.unitScore != null && /* @__PURE__ */ jsxs("div", {
					className: "rounded-xl border border-border/60 bg-muted/30 px-4 py-2 text-xs text-muted-foreground",
					children: [
						"Média da unidade (atividades + role play):",
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: lesson.unitPassed ? "font-medium text-emerald-600" : "font-medium text-foreground",
							children: [Math.round(lesson.unitScore), "%"]
						}),
						lesson.unitPassed ? " · aprovada" : "",
						lesson.cycle != null && lesson.cycle > 1 ? ` · ciclo ${lesson.cycle}` : ""
					]
				}),
				activeItem.kind === "lesson" && contentLocked && /* @__PURE__ */ jsx(Card, {
					className: "space-y-3 border-amber-500/40 p-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ jsx(Lock, { className: "mt-0.5 h-5 w-5 text-amber-600" }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-display text-xl font-semibold",
								children: lesson.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: lesson.lockMessage || accessWindow?.message || "Esta aula ainda não está liberada."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Você pode revisar aulas já concluídas a qualquer momento."
							})
						] })]
					})
				}),
				activeItem.kind === "lesson" && !contentLocked && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(VideoPlayer, { lesson }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-2xl font-semibold md:text-3xl",
							children: lesson.title
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								formatMinutes(lesson.durationMinutes),
								" · ",
								course.title
							]
						}),
						(course.progressPercent ?? 0) >= 20 && /* @__PURE__ */ jsx("div", {
							className: "mt-3",
							children: /* @__PURE__ */ jsx(CourseRatingControl, { course })
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							onClick: () => complete.mutate(),
							disabled: lesson.completed || lesson.locked || complete.isPending,
							className: "gap-2",
							children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }), lesson.completed ? "Concluída" : "Marcar como concluída"]
						}), next && /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							className: "gap-2",
							onClick: () => goItem(next),
							children: ["Próximo ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})]
					})
				] }),
				activeItem.kind === "assessment" && /* @__PURE__ */ jsx(InlineAssessment, {
					courseId: course.id,
					lessonId,
					assessmentId: activeItem.id,
					onBack: () => navigate({
						to: "/courses/$courseId/lessons/$lessonId",
						params: {
							courseId: course.id,
							lessonId
						},
						search: { panel: sideTab }
					}),
					onAdvance: next ? () => goItem(next) : void 0
				}),
				activeItem.kind === "roleplay" && /* @__PURE__ */ jsx(InlineRoleplay, {
					scenarioId: activeItem.id,
					courseId: course.id,
					onDone: () => {
						qc.invalidateQueries({ queryKey: ["course", course.id] });
						qc.invalidateQueries({ queryKey: [
							"lesson",
							courseId,
							lessonId
						] });
						qc.invalidateQueries({ queryKey: ["ranking"] });
						refreshUser();
					},
					onAdvance: next ? () => goItem(next) : void 0
				}),
				activeItem.kind === "lesson" && /* @__PURE__ */ jsxs(Tabs, {
					defaultValue: "about",
					children: [
						/* @__PURE__ */ jsxs(TabsList, { children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "about",
								children: "Visão geral"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "resources",
								children: "Materiais"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "notes",
								children: "Anotações"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "comments",
								children: "Comentários"
							})
						] }),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "about",
							className: "mt-4",
							children: /* @__PURE__ */ jsxs(Card, {
								className: "space-y-3 p-6 text-sm leading-relaxed text-muted-foreground",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-display text-lg font-semibold text-foreground",
									children: course.title
								}), /* @__PURE__ */ jsx("p", { children: lesson.description || course.shortDescription || "Sem descrição." })]
							})
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "resources",
							className: "mt-4",
							children: /* @__PURE__ */ jsx(Card, {
								className: "divide-y divide-border/60",
								children: (lesson.resources ?? []).length === 0 ? /* @__PURE__ */ jsx("p", {
									className: "p-6 text-sm text-muted-foreground",
									children: "Nenhum material nesta aula."
								}) : (lesson.resources ?? []).map((r) => /* @__PURE__ */ jsxs("a", {
									href: r.url,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-3 p-4 transition hover:bg-accent/40",
									children: [
										r.type === "pdf" ? /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsx(Link$1, { className: "h-4 w-4 text-primary" }),
										/* @__PURE__ */ jsx("span", {
											className: "flex-1 text-sm",
											children: r.label
										}),
										r.type === "pdf" ? /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground" })
									]
								}, r.id))
							})
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "notes",
							className: "mt-4",
							children: /* @__PURE__ */ jsx(Card, {
								className: "p-4",
								children: /* @__PURE__ */ jsx(Textarea, {
									placeholder: "Suas anotações desta aula (salvamento automático)...",
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									className: "min-h-[180px] border-0 focus-visible:ring-0"
								})
							})
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "comments",
							className: "mt-4",
							children: /* @__PURE__ */ jsx(Card, {
								className: "p-8 text-center text-sm text-muted-foreground",
								children: "Em breve: comentários entre alunos e resposta do professor."
							})
						})
					]
				})
			]
		}), sidebarOpen && /* @__PURE__ */ jsx("aside", {
			className: "min-w-0 border-l border-border/60 bg-card/40",
			children: /* @__PURE__ */ jsxs("div", {
				className: "sticky top-0 flex h-[calc(100vh-1rem)] flex-col",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex border-b border-border/60",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setSideTab("content"),
						className: `flex-1 px-3 py-3 text-sm font-medium ${sideTab === "content" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`,
						children: "Conteúdo do curso"
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setSideTab("ai"),
						className: `flex flex-1 items-center justify-center gap-1 px-3 py-3 text-sm font-medium ${sideTab === "ai" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`,
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), " Assistente IA"]
					})]
				}), sideTab === "content" ? /* @__PURE__ */ jsx(CourseCurriculum, {
					course,
					activeLessonId: lesson.id,
					activeItem,
					onSelect: goItem
				}) : /* @__PURE__ */ jsx(CourseAiAssistant, {
					course,
					lesson
				})]
			})
		})]
	});
}
function CourseCurriculum({ course, activeLessonId, activeItem, onSelect }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 overflow-y-auto",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "border-b border-border/60 p-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Curso"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 truncate font-medium",
					children: course.title
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [course.progressPercent, "% concluído"]
				})
			]
		}), course.modules.map((m, mi) => {
			const items = m.curriculum ?? m.lessons.map((l) => ({
				kind: "lesson",
				id: l.id,
				title: l.title,
				order: l.order,
				durationMinutes: l.durationMinutes,
				completed: l.completed,
				locked: l.locked
			}));
			const done = items.filter((i) => i.completed).length;
			const mins = items.reduce((s, i) => s + (i.durationMinutes ?? 0), 0);
			const roleplays = items.filter((i) => i.kind === "roleplay").length;
			const assessments = items.filter((i) => i.kind === "assessment").length;
			return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "border-b border-border/40 bg-muted/30 px-4 py-2.5",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [
						"Seção ",
						mi + 1,
						" — ",
						m.title
					]
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: [
						done,
						" / ",
						items.length,
						" · ",
						mins,
						"m",
						assessments > 0 ? ` · ${assessments} atividade(s)` : "",
						roleplays > 0 ? ` · ${roleplays} role play` : ""
					]
				})]
			}), /* @__PURE__ */ jsx("ul", { children: items.map((it) => {
				const active = it.kind === "lesson" && it.id === activeLessonId && activeItem.kind === "lesson" || it.kind === activeItem.kind && it.id === activeItem.id;
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					disabled: it.locked,
					onClick: () => onSelect(it),
					className: `flex w-full items-center gap-2 border-b border-border/30 px-4 py-2.5 text-left text-sm transition-colors ${active ? "bg-primary/10 text-primary" : "hover:bg-accent/40"} ${it.locked ? "opacity-60" : ""}`,
					children: [
						it.locked ? /* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5 shrink-0" }) : it.needsRewatch ? /* @__PURE__ */ jsx(RefreshCw, { className: "h-3.5 w-3.5 shrink-0 text-amber-600" }) : it.completed ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5 shrink-0 text-success" }) : it.kind === "assessment" ? /* @__PURE__ */ jsx(ClipboardCheck, { className: "h-3.5 w-3.5 shrink-0 text-amber-600" }) : it.kind === "roleplay" ? /* @__PURE__ */ jsx(MessageCircleMore, { className: "h-3.5 w-3.5 shrink-0 text-emerald-600" }) : /* @__PURE__ */ jsx(Square, { className: "h-3.5 w-3.5 shrink-0" }),
						/* @__PURE__ */ jsxs("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "block truncate",
									children: it.title
								}),
								it.kind === "lesson" && it.needsRewatch && /* @__PURE__ */ jsxs("span", {
									className: "block text-[10px] font-medium uppercase tracking-wide text-amber-600",
									children: ["Reassistir", it.unitScore != null ? ` · média ${Math.round(it.unitScore)}%` : ""]
								}),
								it.kind === "lesson" && !it.needsRewatch && it.unitScore != null && /* @__PURE__ */ jsxs("span", {
									className: "block text-[10px] text-muted-foreground",
									children: [
										"Unidade ",
										Math.round(it.unitScore),
										"%",
										it.unitPassed ? " · ok" : ""
									]
								})
							]
						}),
						it.kind !== "lesson" && /* @__PURE__ */ jsx("span", {
							className: "shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-primary",
							children: it.kind === "assessment" ? "Atividade" : "Role play"
						}),
						it.durationMinutes != null && it.durationMinutes > 0 && /* @__PURE__ */ jsxs("span", {
							className: "shrink-0 text-xs text-muted-foreground",
							children: [it.durationMinutes, "m"]
						})
					]
				}) }, `${it.kind}_${it.id}`);
			}) })] }, m.id);
		})]
	});
}
function VideoPlayer({ lesson }) {
	const videos = lesson.videos?.length ? lesson.videos : lesson.videoUrl ? [{
		id: "0",
		title: lesson.title,
		url: lesson.videoUrl,
		provider: lesson.videoProvider || "youtube",
		durationMinutes: lesson.durationMinutes,
		order: 0
	}] : [];
	const [idx, setIdx] = useState(0);
	const current = videos[idx];
	if (!current) return /* @__PURE__ */ jsx("div", {
		className: "flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 text-sm text-muted-foreground",
		children: "Esta aula não tem vídeo — confira a descrição e os materiais abaixo."
	});
	const provider = current.provider || "youtube";
	const embed = provider === "youtube" ? youtubeEmbedSrc(current.url) : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-black shadow-elegant",
			children: provider === "youtube" && embed ? /* @__PURE__ */ jsx("iframe", {
				src: embed,
				title: current.title,
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowFullScreen: true,
				className: "h-full w-full"
			}) : provider === "private" ? /* @__PURE__ */ jsx("video", {
				src: current.url,
				controls: true,
				className: "h-full w-full"
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid h-full place-items-center p-6 text-center text-sm text-white/80",
				children: "Não foi possível carregar este vídeo. Verifique o link no painel (cole o URL completo do YouTube)."
			})
		}), videos.length > 1 && /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2",
			children: videos.map((v, i) => /* @__PURE__ */ jsxs(Button, {
				size: "sm",
				variant: i === idx ? "default" : "outline",
				onClick: () => setIdx(i),
				className: "gap-1",
				children: [
					/* @__PURE__ */ jsx(PlayCircle, { className: "h-3.5 w-3.5" }),
					" ",
					v.title || `Vídeo ${i + 1}`
				]
			}, v.id))
		})]
	});
}
function CourseAiAssistant({ course, lesson }) {
	const [convId, setConvId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [busy, setBusy] = useState(false);
	const suggestions = [
		`Resuma a aula "${lesson.title}"`,
		`Quais pontos principais de ${course.title}?`,
		"Explique o conteúdo de forma simples",
		"O que revisar antes da próxima atividade?"
	];
	const ensureConv = async () => {
		if (convId) return convId;
		const c = await aiService.createConversation(`${course.title} — ${lesson.title}`, {
			courseId: course.id,
			lessonId: lesson.id
		});
		setConvId(c.id);
		return c.id;
	};
	const send = async (text) => {
		const content = text.trim();
		if (!content || busy) return;
		setBusy(true);
		setMessages((m) => [...m, {
			role: "user",
			content
		}]);
		setInput("");
		try {
			const id = await ensureConv();
			const reply = await aiService.sendMessage(id, content, {
				courseId: course.id,
				lessonId: lesson.id
			});
			setMessages((m) => [...m, {
				role: "assistant",
				content: reply.content
			}]);
		} catch {
			toast.error("Assistente indisponível no momento.");
			setMessages((m) => m.slice(0, -1));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2 border-b border-border/60 p-4",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display text-lg font-semibold",
					children: "Dúvidas sobre este curso?"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "O assistente pode cometer erros. Confira as informações. Sujeito à configuração de IA da escola."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: [messages.length === 0 && suggestions.map((s) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => send(s),
					className: "block w-full rounded-xl border border-border/60 bg-background px-3 py-3 text-left text-sm hover:bg-accent/40",
					children: s
				}, s)), messages.map((m, i) => /* @__PURE__ */ jsx("div", {
					className: `rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "ml-6 bg-primary/10" : "mr-6 bg-muted"}`,
					children: m.content
				}, i))]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "border-t border-border/60 p-3",
				children: /* @__PURE__ */ jsxs("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						send(input);
					},
					children: [/* @__PURE__ */ jsx(Input, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Fazer uma pergunta",
						disabled: busy
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						size: "icon",
						disabled: busy || !input.trim(),
						children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
					})]
				})
			})
		]
	});
}
//#endregion
export { LessonPage as component };
