import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aiService } from "@/services";
import type { ChatConversation } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpenCheck,
  BrainCircuit,
  FileQuestion,
  ListChecks,
  Map,
  MessageSquarePlus,
  Send,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { initials, relativeTime } from "@/utils/format";

export const Route = createFileRoute("/_app/ai")({
  component: AIPage,
  head: () => ({ meta: [{ title: "IA Pedagógica — Aurora" }] }),
});

const suggestions = [
  { icon: FileQuestion, label: "Responder uma dúvida", prompt: "Tenho uma dúvida sobre..." },
  { icon: BookOpenCheck, label: "Explicar um conteúdo", prompt: "Me explique de forma simples: ..." },
  { icon: Wand2, label: "Gerar exemplos", prompt: "Me dê 3 exemplos práticos sobre..." },
  { icon: ListChecks, label: "Criar exercícios", prompt: "Crie 5 exercícios sobre..." },
  { icon: BrainCircuit, label: "Resumir tópico", prompt: "Faça um resumo em tópicos sobre..." },
  { icon: Map, label: "Mapa mental", prompt: "Crie um mapa mental sobre..." },
  { icon: Target, label: "Plano de estudos", prompt: "Monte um plano de estudos de 4 semanas para..." },
];

function AIPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["ai:conversations"],
    queryFn: () => aiService.listConversations(),
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    if (!activeId && conversations[0]) setActiveId(conversations[0].id);
  }, [conversations, activeId]);

  const active: ChatConversation | undefined = conversations.find((c) => c.id === activeId);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const create = useMutation({
    mutationFn: () => aiService.createConversation(),
    onSuccess: (c) => {
      qc.invalidateQueries({ queryKey: ["ai:conversations"] });
      setActiveId(c.id);
    },
  });

  const send = useMutation({
    mutationFn: async (text: string) => {
      let convId = activeId;
      if (!convId) {
        const c = await aiService.createConversation();
        convId = c.id;
        setActiveId(c.id);
      }
      return aiService.sendMessage(convId, text);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ai:conversations"] }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, send.isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || send.isPending) return;
    send.mutate(input.trim());
    setInput("");
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[280px_1fr]">
      {/* Conversations sidebar */}
      <aside className="hidden flex-col border-r border-border/60 bg-sidebar/50 md:flex">
        <div className="p-3">
          <Button className="w-full gap-2" onClick={() => create.mutate()}>
            <MessageSquarePlus className="h-4 w-4" /> Nova conversa
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="mb-2 h-12 rounded-lg" />)
            : conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`mb-1 flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                    c.id === activeId ? "bg-accent" : "hover:bg-accent/40"
                  }`}
                >
                  <span className="truncate font-medium">{c.title}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {relativeTime(c.updatedAt)}
                  </span>
                </button>
              ))}
        </div>
      </aside>

      {/* Chat */}
      <section className="flex min-w-0 flex-col">
        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-10">
            {!active || active.messages.length === 0 ? (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow">
                  <Sparkles className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="mt-6 font-display text-3xl font-semibold">IA Pedagógica</h1>
                <p className="mt-2 text-muted-foreground">Sua assistente para estudar melhor. Como posso ajudar hoje?</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setInput(s.prompt)}
                      className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-elegant"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="line-clamp-1 text-xs text-muted-foreground">{s.prompt}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {active.messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={m.role === "assistant" ? "bg-primary text-primary-foreground" : ""}>
                        {m.role === "assistant" ? "AI" : user ? initials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {m.content.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {send.isPending && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback></Avatar>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/60" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/60" style={{ animationDelay: "0.1s" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/60" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-border/60 bg-background/70 p-3 backdrop-blur md:p-4">
          <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border/60 bg-card p-2 shadow-soft focus-within:border-primary/50 focus-within:shadow-elegant">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Pergunte algo à IA Pedagógica..."
              className="min-h-[44px] max-h-40 resize-none border-0 focus-visible:ring-0"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || send.isPending} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-muted-foreground">
            Respostas simuladas • Pronto para integração futura com OpenAI
          </p>
        </form>
      </section>
    </div>
  );
}

