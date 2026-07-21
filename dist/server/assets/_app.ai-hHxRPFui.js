import { n as useAuth } from "./AuthContext-D4cYmnFW.js";
import { t as aiService } from "./aiService-Dyh38p1f.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-gunzrkKA.js";
import { i as relativeTime, r as initials } from "./format-BkgF6Xya.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpenCheck, BrainCircuit, FileQuestion, ListChecks, Map, MessageSquarePlus, Send, Sparkles, Target, Wand2 } from "lucide-react";
//#region src/routes/_app.ai.tsx?tsr-split=component
var suggestions = [
	{
		icon: FileQuestion,
		label: "Responder uma dúvida",
		prompt: "Tenho uma dúvida sobre..."
	},
	{
		icon: BookOpenCheck,
		label: "Explicar um conteúdo",
		prompt: "Me explique de forma simples: ..."
	},
	{
		icon: Wand2,
		label: "Gerar exemplos",
		prompt: "Me dê 3 exemplos práticos sobre..."
	},
	{
		icon: ListChecks,
		label: "Criar exercícios",
		prompt: "Crie 5 exercícios sobre..."
	},
	{
		icon: BrainCircuit,
		label: "Resumir tópico",
		prompt: "Faça um resumo em tópicos sobre..."
	},
	{
		icon: Map,
		label: "Mapa mental",
		prompt: "Crie um mapa mental sobre..."
	},
	{
		icon: Target,
		label: "Plano de estudos",
		prompt: "Monte um plano de estudos de 4 semanas para..."
	}
];
function AIPage() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const { data: conversations = [], isLoading } = useQuery({
		queryKey: ["ai:conversations"],
		queryFn: () => aiService.listConversations()
	});
	const [activeId, setActiveId] = useState(null);
	useEffect(() => {
		if (!activeId && conversations[0]) setActiveId(conversations[0].id);
	}, [conversations, activeId]);
	const active = conversations.find((c) => c.id === activeId);
	const [input, setInput] = useState("");
	const scrollRef = useRef(null);
	const create = useMutation({
		mutationFn: () => aiService.createConversation(),
		onSuccess: (c) => {
			qc.invalidateQueries({ queryKey: ["ai:conversations"] });
			setActiveId(c.id);
		}
	});
	const send = useMutation({
		mutationFn: async (text) => {
			let convId = activeId;
			if (!convId) {
				const c = await aiService.createConversation();
				convId = c.id;
				setActiveId(c.id);
			}
			return aiService.sendMessage(convId, text);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["ai:conversations"] })
	});
	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [active?.messages.length, send.isPending]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input.trim() || send.isPending) return;
		send.mutate(input.trim());
		setInput("");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[280px_1fr]",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "hidden flex-col border-r border-border/60 bg-sidebar/50 md:flex",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-3",
				children: /* @__PURE__ */ jsxs(Button, {
					className: "w-full gap-2",
					onClick: () => create.mutate(),
					children: [/* @__PURE__ */ jsx(MessageSquarePlus, { className: "h-4 w-4" }), " Nova conversa"]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "flex-1 overflow-y-auto px-2 pb-4",
				children: isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-12 rounded-lg" }, i)) : conversations.map((c) => /* @__PURE__ */ jsxs("button", {
					onClick: () => setActiveId(c.id),
					className: `mb-1 flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left text-sm transition ${c.id === activeId ? "bg-accent" : "hover:bg-accent/40"}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "truncate font-medium",
						children: c.title
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: relativeTime(c.updatedAt)
					})]
				}, c.id))
			})]
		}), /* @__PURE__ */ jsxs("section", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-1 overflow-y-auto",
				ref: scrollRef,
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-10",
					children: !active || active.messages.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "h-7 w-7 text-primary-foreground" })
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-6 font-display text-3xl font-semibold",
								children: "IA Pedagógica"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-muted-foreground",
								children: "Sua assistente para estudar melhor. Como posso ajudar hoje?"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-8 grid gap-3 sm:grid-cols-2",
								children: suggestions.map((s) => /* @__PURE__ */ jsxs("button", {
									onClick: () => setInput(s.prompt),
									className: "group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-elegant",
									children: [/* @__PURE__ */ jsx("div", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
										children: /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: s.label
										}), /* @__PURE__ */ jsx("p", {
											className: "line-clamp-1 text-xs text-muted-foreground",
											children: s.prompt
										})]
									})]
								}, s.label))
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [active.messages.map((m) => /* @__PURE__ */ jsxs("div", {
							className: `flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`,
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "h-8 w-8 shrink-0",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: m.role === "assistant" ? "bg-primary text-primary-foreground" : "",
									children: m.role === "assistant" ? "AI" : user ? initials(user.name) : "U"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: `max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
								children: m.content.split("\n").map((line, i) => /* @__PURE__ */ jsx("p", {
									className: i > 0 ? "mt-2" : "",
									children: line
								}, i))
							})]
						}, m.id)), send.isPending && /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx(Avatar, {
								className: "h-8 w-8",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-primary text-primary-foreground",
									children: "AI"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "rounded-2xl bg-muted px-4 py-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-foreground/60" }),
										/* @__PURE__ */ jsx("span", {
											className: "h-2 w-2 animate-bounce rounded-full bg-foreground/60",
											style: { animationDelay: "0.1s" }
										}),
										/* @__PURE__ */ jsx("span", {
											className: "h-2 w-2 animate-bounce rounded-full bg-foreground/60",
											style: { animationDelay: "0.2s" }
										})
									]
								})
							})]
						})]
					})
				})
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "border-t border-border/60 bg-background/70 p-3 backdrop-blur md:p-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border/60 bg-card p-2 shadow-soft focus-within:border-primary/50 focus-within:shadow-elegant",
					children: [/* @__PURE__ */ jsx(Textarea, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSubmit(e);
							}
						},
						placeholder: "Pergunte algo à IA Pedagógica...",
						className: "min-h-[44px] max-h-40 resize-none border-0 focus-visible:ring-0"
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						size: "icon",
						disabled: !input.trim() || send.isPending,
						className: "shrink-0",
						children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "mx-auto mt-2 max-w-3xl text-center text-[10px] text-muted-foreground",
					children: "Respostas simuladas • Pronto para integração futura com OpenAI"
				})]
			})]
		})]
	});
}
//#endregion
export { AIPage as component };
