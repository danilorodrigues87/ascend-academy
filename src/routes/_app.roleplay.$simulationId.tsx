import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { rolePlayService } from "@/services";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Flame,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  Target,
  TimerReset,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  RolePlayDifficulty,
  RolePlayMessage,
  RolePlayScenario,
  RolePlaySimulation,
  RolePlayTimelineEvent,
} from "@/types";
import { initials } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app/roleplay/$simulationId")({
  component: RolePlayRunnerPage,
  head: () => ({ meta: [{ title: "Simulação Prática — Aurora" }] }),
});

const difficultyLabel: Record<RolePlayDifficulty, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
  expert: "Especialista",
};

const difficultyOptions: RolePlayDifficulty[] = ["easy", "medium", "hard", "expert"];

type Phase = "briefing" | "chat" | "evaluation";

function RolePlayRunnerPage() {
  const { simulationId } = Route.useParams();
  const navigate = useNavigate();
  const { data: scenario, isLoading } = useQuery({
    queryKey: ["roleplay:scenario", simulationId],
    queryFn: () => rolePlayService.getScenario(simulationId),
  });

  const [phase, setPhase] = useState<Phase>("briefing");
  const [difficulty, setDifficulty] = useState<RolePlayDifficulty>("medium");
  const [simulation, setSimulation] = useState<RolePlaySimulation | null>(null);

  useEffect(() => {
    if (scenario) setDifficulty(scenario.difficulty);
  }, [scenario]);

  const start = useMutation({
    mutationFn: () => rolePlayService.startSimulation(simulationId, difficulty),
    onSuccess: (sim) => {
      setSimulation(sim);
      setPhase("chat");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading || !scenario) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 p-4 md:p-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (phase === "briefing") {
    return (
      <BriefingScreen
        scenario={scenario}
        difficulty={difficulty}
        onChangeDifficulty={setDifficulty}
        onStart={() => start.mutate()}
        starting={start.isPending}
        onBack={() => navigate({ to: "/roleplay" })}
      />
    );
  }

  if (phase === "chat" && simulation) {
    return (
      <ChatScreen
        scenario={scenario}
        simulation={simulation}
        difficulty={difficulty}
        onUpdated={setSimulation}
        onFinish={(finished) => {
          setSimulation(finished);
          setPhase("evaluation");
        }}
      />
    );
  }

  if (phase === "evaluation" && simulation) {
    return (
      <EvaluationScreen
        scenario={scenario}
        simulation={simulation}
        onReplay={() => {
          setSimulation(null);
          setPhase("briefing");
        }}
      />
    );
  }

  return null;
}

/* ------------------------------ Briefing ------------------------------ */

function BriefingScreen({
  scenario,
  difficulty,
  onChangeDifficulty,
  onStart,
  starting,
  onBack,
}: {
  scenario: RolePlayScenario;
  difficulty: RolePlayDifficulty;
  onChangeDifficulty: (d: RolePlayDifficulty) => void;
  onStart: () => void;
  starting: boolean;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      <div className="space-y-2">
        <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
          <Sparkles className="h-3 w-3" /> Simulação Prática
        </Badge>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">{scenario.title}</h1>
        <p className="text-sm text-muted-foreground">
          {scenario.courseTitle} · {scenario.moduleTitle}
        </p>
      </div>

      <Card className="space-y-6 p-6">
        <BriefingBlock icon={BookOpen} title="Cenário">
          <p className="text-sm leading-relaxed text-muted-foreground">{scenario.scenario}</p>
        </BriefingBlock>

        <div className="grid gap-6 md:grid-cols-2">
          <BriefingBlock icon={Users} title="Seu papel">
            <p className="text-sm text-muted-foreground">
              Você será <strong className="text-foreground">{scenario.userRole}</strong>.
            </p>
          </BriefingBlock>
          <BriefingBlock icon={MessageCircle} title="Papel da IA">
            <p className="text-sm text-muted-foreground">
              A IA será <strong className="text-foreground">{scenario.aiRole}</strong>
              {" "}({scenario.aiCharacterName}).
            </p>
          </BriefingBlock>
        </div>

        <BriefingBlock icon={Target} title="Objetivos da atividade">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {scenario.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </BriefingBlock>

        <BriefingBlock icon={ListChecks} title="Critérios de avaliação">
          <div className="flex flex-wrap gap-2">
            {scenario.criteria.map((c) => (
              <Badge key={c.key} variant="secondary" className="font-normal">
                {c.label}
              </Badge>
            ))}
          </div>
        </BriefingBlock>

        <BriefingBlock icon={Flame} title="Nível de dificuldade">
          <div className="flex flex-wrap gap-2">
            {difficultyOptions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onChangeDifficulty(d)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  difficulty === d
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {difficultyLabel[d]}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Quanto maior a dificuldade, mais objeções, perguntas profundas e menos dicas.
            Nota mínima para aprovação: <strong>{scenario.minScore}</strong>.
          </p>
        </BriefingBlock>
      </Card>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button variant="outline" onClick={onBack}>Cancelar</Button>
        <Button size="lg" onClick={onStart} disabled={starting} className="gap-2">
          <Play className="h-4 w-4" />
          {starting ? "Preparando..." : "Iniciar simulação"}
        </Button>
      </div>
    </div>
  );
}

function BriefingBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}

/* -------------------------------- Chat -------------------------------- */

function ChatScreen({
  scenario,
  simulation,
  difficulty,
  onUpdated,
  onFinish,
}: {
  scenario: RolePlayScenario;
  simulation: RolePlaySimulation;
  difficulty: RolePlayDifficulty;
  onUpdated: (s: RolePlaySimulation) => void;
  onFinish: (s: RolePlaySimulation) => void;
}) {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = simulation.messages;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, typing]);

  const send = useMutation({
    mutationFn: async (content: string) => {
      // Optimistic user message
      const userMsg: RolePlayMessage = {
        id: `m_${Date.now()}`,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };
      const optimistic = {
        ...simulation,
        messages: [...simulation.messages, userMsg],
      };
      onUpdated(optimistic);
      setTyping(true);
      const aiMsg = await rolePlayService.sendMessage(simulation.id, content);
      return { userMsg, aiMsg };
    },
    onSuccess: ({ aiMsg }) => {
      onUpdated({
        ...simulation,
        messages: [...simulation.messages, aiMsg].filter((m, i, arr) =>
          arr.findIndex((x) => x.id === m.id) === i,
        ),
      });
      setTyping(false);
      // Refetch full sim to stay consistent with mock store
      rolePlayService.getSimulation(simulation.id).then((s) => s && onUpdated(s));
    },
    onError: (e: Error) => {
      setTyping(false);
      toast.error(e.message);
    },
  });

  const finish = useMutation({
    mutationFn: () => rolePlayService.finishSimulation(simulation.id),
    onSuccess: (s) => onFinish(s),
    onError: (e: Error) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || send.isPending || finish.isPending) return;
    setInput("");
    send.mutate(value);
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[280px_1fr]">
      {/* Context sidebar */}
      <aside className="hidden flex-col border-r border-border/60 bg-sidebar/50 md:flex">
        <div className="border-b border-border/60 p-4">
          <Link
            to="/roleplay"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Sair da simulação
          </Link>
          <h2 className="mt-3 font-display text-base font-semibold leading-snug">
            {scenario.title}
          </h2>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            {scenario.moduleTitle}
          </p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Dificuldade
            </p>
            <p className="mt-0.5 flex items-center gap-1 font-medium">
              <Flame className="h-3.5 w-3.5 text-primary" /> {difficultyLabel[difficulty]}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Seu papel
            </p>
            <p className="mt-0.5">{scenario.userRole}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Objetivos
            </p>
            <ul className="mt-1 space-y-1.5 text-xs text-muted-foreground">
              {scenario.objectives.map((o, i) => (
                <li key={i} className="flex gap-1.5">
                  <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 p-3">
          <Button
            onClick={() => finish.mutate()}
            disabled={finish.isPending}
            variant="default"
            className="w-full gap-2"
          >
            <Trophy className="h-4 w-4" />
            {finish.isPending ? "Avaliando..." : "Finalizar Simulação"}
          </Button>
        </div>
      </aside>

      {/* Conversation */}
      <section className="flex min-w-0 flex-col bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]">
        {/* Header — WhatsApp-like but branded */}
        <header className="flex items-center gap-3 border-b border-border/60 bg-card/70 px-4 py-3 backdrop-blur md:px-6">
          <Avatar className="h-10 w-10 ring-2 ring-primary/30">
            <AvatarImage src={scenario.aiCharacterAvatarUrl} alt={scenario.aiCharacterName} />
            <AvatarFallback>{initials(scenario.aiCharacterName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold leading-tight">{scenario.aiCharacterName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {typing ? (
                <span className="inline-flex items-center gap-1 text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  digitando...
                </span>
              ) : (
                <>online · {scenario.aiRole}</>
              )}
            </p>
          </div>
          <Button
            onClick={() => finish.mutate()}
            disabled={finish.isPending}
            size="sm"
            className="hidden gap-1.5 md:inline-flex"
          >
            <Trophy className="h-4 w-4" /> Finalizar
          </Button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-6 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} aiName={scenario.aiCharacterName} userName={user?.name} />
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={scenario.aiCharacterAvatarUrl} />
                  <AvatarFallback>{initials(scenario.aiCharacterName)}</AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-soft">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-border/60 bg-background/80 p-3 backdrop-blur md:p-4"
        >
          <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-border/60 bg-card p-2 shadow-soft focus-within:border-primary/50 focus-within:shadow-elegant">
            <Textarea
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={`Responder como ${scenario.userRole}...`}
              className="min-h-[44px] max-h-40 resize-none border-0 focus-visible:ring-0"
              disabled={finish.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={!input.trim() || send.isPending || finish.isPending}
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mx-auto mt-2 flex max-w-2xl items-center justify-between text-[10px] text-muted-foreground">
            <span>Enter para enviar · Shift+Enter para nova linha</span>
            <button
              type="button"
              onClick={() => finish.mutate()}
              disabled={finish.isPending}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-primary hover:bg-primary/10 md:hidden"
            >
              <Trophy className="h-3 w-3" /> Finalizar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function MessageBubble({
  message,
  aiName,
  userName,
}: {
  message: RolePlayMessage;
  aiName: string;
  userName?: string;
}) {
  const isUser = message.role === "user";
  const time = new Date(message.createdAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-7 w-7">
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground text-[10px]" : "text-[10px]"}>
          {isUser ? initials(userName ?? "Você") : initials(aiName)}
        </AvatarFallback>
      </Avatar>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
          isUser
            ? "gradient-primary rounded-br-sm text-primary-foreground"
            : "rounded-bl-sm bg-card text-foreground"
        }`}
        data-message-id={message.id}
      >
        {message.content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-1.5" : ""}>{line}</p>
        ))}
        <span
          className={`mt-1 block text-right text-[10px] ${
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------- Evaluation ----------------------------- */

function EvaluationScreen({
  scenario,
  simulation,
  onReplay,
}: {
  scenario: RolePlayScenario;
  simulation: RolePlaySimulation;
  onReplay: () => void;
}) {
  const evaluation = simulation.evaluation!;
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [showReference, setShowReference] = useState(false);

  const messagesById = useMemo(() => {
    return new Map(simulation.messages.map((m) => [m.id, m]));
  }, [simulation.messages]);

  useEffect(() => {
    if (!highlightId) return;
    const el = document.querySelector(`[data-review-msg="${highlightId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(() => setHighlightId(null), 2400);
    return () => clearTimeout(t);
  }, [highlightId]);

  const passed = evaluation.passed;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/roleplay"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar às simulações
        </Link>
        <Button variant="outline" onClick={onReplay} className="gap-2">
          <TimerReset className="h-4 w-4" /> Refazer simulação
        </Button>
      </div>

      {/* Score header */}
      <Card className="relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 gradient-primary opacity-[0.08]" />
        <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-background/70 p-6 shadow-soft md:w-56">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Pontuação geral
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold">{evaluation.overallScore}</span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <Badge
              className={`mt-3 gap-1 ${
                passed
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
              }`}
              variant="outline"
            >
              {passed ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
              {passed ? "Aprovado" : "Refazer"}
            </Badge>
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold md:text-3xl">
              {scenario.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {scenario.courseTitle} · {scenario.moduleTitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed">{evaluation.summary}</p>
          </div>
        </div>
      </Card>

      {/* Competencies */}
      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold">Competências avaliadas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {evaluation.competencies.map((c) => (
            <div key={c.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.label}</span>
                <span className="tabular-nums text-muted-foreground">{c.score}/100</span>
              </div>
              <Progress value={c.score} className="h-2" />
              {c.comment && (
                <p className="text-xs text-muted-foreground">{c.comment}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback */}
      <div className="grid gap-4 md:grid-cols-3">
        <FeedbackCard
          icon={CheckCircle2}
          tone="emerald"
          title="O que foi bem"
          items={evaluation.strengths}
        />
        <FeedbackCard
          icon={Lightbulb}
          tone="amber"
          title="Como melhorar"
          items={evaluation.improvements}
        />
        <FeedbackCard
          icon={CircleAlert}
          tone="rose"
          title="Onde houve erros"
          items={evaluation.mistakes}
        />
      </div>

      {/* Review topics */}
      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold">Conceitos para revisar</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {evaluation.reviewTopics.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Linha do tempo da conversa</h2>
          <span className="text-xs text-muted-foreground">Clique para destacar a mensagem</span>
        </div>
        <div className="mt-4 space-y-2">
          {evaluation.timeline.map((event) => (
            <TimelineItem
              key={event.id}
              event={event}
              onClick={() => setHighlightId(event.messageId)}
              active={highlightId === event.messageId}
            />
          ))}
        </div>
      </Card>

      {/* Transcript */}
      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold">Transcrição</h2>
        <div className="mt-4 space-y-2">
          {simulation.messages.map((m) => (
            <div
              key={m.id}
              data-review-msg={m.id}
              className={`rounded-xl border p-3 text-sm transition ${
                highlightId === m.id
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "border-border/60 bg-card"
              } ${m.role === "user" ? "ml-6 md:ml-16" : "mr-6 md:mr-16"}`}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {m.role === "user" ? "Você" : scenario.aiCharacterName}
                {" · "}
                {new Date(m.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="leading-relaxed">{m.content}</p>
            </div>
          ))}
          {simulation.messages.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma mensagem registrada.</p>
          )}
          {highlightId && !messagesById.has(highlightId) && (
            <p className="text-xs text-muted-foreground">
              A mensagem referenciada não está mais disponível.
            </p>
          )}
        </div>
      </Card>

      {/* Reference conversation */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold">Resposta de referência</h2>
            <p className="text-sm text-muted-foreground">
              Uma possível condução por um profissional experiente. Existem várias formas corretas
              de resolver o problema — use como material de estudo.
            </p>
          </div>
          <Button variant={showReference ? "outline" : "default"} onClick={() => setShowReference((v) => !v)}>
            {showReference ? "Ocultar" : "Ver uma possível resposta de referência"}
          </Button>
        </div>
        {showReference && (
          <div className="mt-4 space-y-2">
            {evaluation.referenceConversation.map((m) => (
              <div
                key={m.id}
                className={`rounded-xl border border-border/60 bg-muted/40 p-3 text-sm ${
                  m.role === "user" ? "ml-6 md:ml-16" : "mr-6 md:mr-16"
                }`}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.role === "user" ? "Profissional (aluno)" : scenario.aiCharacterName}
                </p>
                <p className="leading-relaxed">{m.content}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function FeedbackCard({
  icon: Icon,
  tone,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "amber" | "rose";
  title: string;
  items: string[];
}) {
  const toneMap = {
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
  };
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <div className={`grid h-8 w-8 place-items-center rounded-lg ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.length === 0 && <li className="text-xs italic">Nada a destacar.</li>}
        {items.map((it, i) => (
          <li key={i} className="leading-relaxed">• {it}</li>
        ))}
      </ul>
    </Card>
  );
}

function TimelineItem({
  event,
  onClick,
  active,
}: {
  event: RolePlayTimelineEvent;
  onClick: () => void;
  active: boolean;
}) {
  const map = {
    success: { icon: CheckCircle2, className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
    error: { icon: XCircle, className: "text-rose-600 dark:text-rose-400 bg-rose-500/10" },
    opportunity: { icon: Lightbulb, className: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
    decision: { icon: Sparkles, className: "text-primary bg-primary/10" },
  } as const;
  const Icon = map[event.type].icon;
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
        active
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-border/60 hover:border-primary/40 hover:bg-accent/40"
      }`}
    >
      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${map[event.type].className}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{event.title}</p>
        <p className="text-xs text-muted-foreground">{event.detail}</p>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
    </button>
  );
}
