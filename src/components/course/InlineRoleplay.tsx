import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { rolePlayService } from "@/services";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircleMore, Send } from "lucide-react";
import { toast } from "sonner";
import type { RolePlaySimulation } from "@/types";

export function InlineRoleplay({
  scenarioId,
  courseId,
  onDone,
  onAdvance,
}: {
  scenarioId: string;
  courseId: string;
  onDone: () => void;
  onAdvance?: () => void;
}) {
  const { data: scenario, isLoading } = useQuery({
    queryKey: ["roleplay:scenario", scenarioId],
    queryFn: () => rolePlayService.getScenario(scenarioId),
  });
  const [sim, setSim] = useState<RolePlaySimulation | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (remaining == null || remaining <= 0 || !sim || sim.endedAt) return;
    const t = setInterval(() => setRemaining((r) => (r == null ? r : Math.max(0, r - 1))), 1000);
    return () => clearInterval(t);
  }, [remaining, sim]);

  useEffect(() => {
    if (remaining === 0 && sim && !sim.endedAt) {
      void finishNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSim((prev) =>
      prev
        ? {
            ...prev,
            messages: [
              ...prev.messages,
              { id: `u_${Date.now()}`, role: "user", content, createdAt: new Date().toISOString() },
            ],
          }
        : prev,
    );
    try {
      const aiMsg = await rolePlayService.sendMessage(sim.id, content);
      setSim((prev) => (prev ? { ...prev, messages: [...prev.messages, aiMsg] } : prev));
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

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (!scenario) return <p className="text-muted-foreground">Cenário não encontrado.</p>;

  if (!sim) {
    return (
      <Card className="space-y-4 p-8 text-center">
        <MessageCircleMore className="mx-auto h-10 w-10 text-primary" />
        <h2 className="font-display text-xl font-semibold">{scenario.title}</h2>
        <p className="text-sm text-muted-foreground">{scenario.scenario || scenario.theme}</p>
        <p className="text-xs text-muted-foreground">
          Tempo limite: {scenario.estimatedMinutes} min · Nota mínima: {scenario.minScore}%
        </p>
        <p className="text-xs text-muted-foreground">Curso {courseId}</p>
        <Button onClick={() => void start()} disabled={busy}>
          Iniciar simulação
        </Button>
      </Card>
    );
  }

  const mm = remaining != null ? Math.floor(remaining / 60) : 0;
  const ss = remaining != null ? remaining % 60 : 0;
  const closed = !!sim.endedAt || sim.status === "approved" || sim.status === "retry";

  if (closed) {
    return (
      <Card className="space-y-4 p-6">
        <h2 className="font-display text-xl font-semibold">Resultado — {scenario.title}</h2>
        <p className="font-display text-4xl font-semibold">{sim.score ?? 0}%</p>
        {sim.xpEarned != null && sim.xpEarned > 0 && (
          <p className="text-sm font-medium text-primary">+{sim.xpEarned} XP</p>
        )}
        <p className="text-sm text-muted-foreground">{sim.evaluation?.summary}</p>
        {sim.needsRewatch && (
          <p className="text-sm text-amber-600">Média da unidade abaixo de 70%. Reassine a aula para novo ciclo.</p>
        )}
        {sim.evaluation?.strengths?.length ? (
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Pontos fortes</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {sim.evaluation.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {onAdvance && !sim.needsRewatch && (
          <Button onClick={onAdvance}>Próximo</Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="flex min-h-[420px] flex-col p-0">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <p className="font-display text-lg font-semibold">{scenario.title}</p>
          <p className="text-xs text-muted-foreground">
            Você: {scenario.userRole} · Personagem: {scenario.aiCharacterName}
          </p>
        </div>
        <div className="text-right text-sm">
          <p className={remaining != null && remaining < 60 ? "font-semibold text-destructive" : "font-medium"}>
            {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
          </p>
          <Button size="sm" variant="outline" onClick={() => void finishNow()} disabled={busy}>
            Finalizar
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {sim.messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "ml-8 bg-primary/10" : "mr-8 bg-muted"}`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-border/60 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sua fala na simulação…"
          disabled={busy}
        />
        <Button type="submit" size="icon" disabled={busy || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
