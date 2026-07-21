import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assessmentsService } from "@/services";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { AssessmentResult } from "@/types";

export function InlineAssessment({
  assessmentId,
  onBack,
}: {
  courseId: string;
  assessmentId: string;
  onBack: () => void;
}) {
  const qc = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: () => assessmentsService.getById(assessmentId),
  });
  const [qIndex, setQIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setQIndex(0);
    setDraft("");
    setResult(null);
  }, [assessmentId]);

  const startMut = useMutation({
    mutationFn: () => assessmentsService.start(assessmentId),
    onSuccess: () => refetch(),
    onError: (e: Error) => toast.error(e.message || "Não foi possível iniciar."),
  });

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (!data) return <p className="text-muted-foreground">Atividade não encontrada.</p>;

  const attempt = data.attempt;
  const lockedMap = attempt?.answers ?? {};
  const questions = data.questions;
  const q = questions[qIndex];
  const locked = q ? lockedMap[q.id] : undefined;
  const allLocked = questions.length > 0 && questions.every((qq) => lockedMap[qq.id]?.locked);
  const inProgress = attempt?.status === "in_progress" || attempt?.canAnswer;
  const finished = attempt?.status === "completed" && attempt.score != null;

  const confirmAnswer = async () => {
    if (!q || !draft.trim() || busy || locked) return;
    setBusy(true);
    try {
      if (!inProgress) {
        await assessmentsService.start(assessmentId);
      }
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
        qc.invalidateQueries({ queryKey: ["ranking"] });
        await refetch();
      } else if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao registrar resposta");
    } finally {
      setBusy(false);
    }
  };

  if (result || (finished && !inProgress && allLocked)) {
    const score = result?.score ?? attempt?.score ?? 0;
    const feedback = result?.feedback ?? attempt?.feedback ?? "";
    const xp = result?.xpEarned;
    return (
      <Card className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Resultado</p>
            <h1 className="font-display text-2xl font-semibold">{data.title}</h1>
          </div>
          <Button variant="outline" onClick={onBack}>Voltar à aula</Button>
        </div>
        <p className="font-display text-4xl font-semibold">{score}%</p>
        <p className="text-sm text-muted-foreground">{feedback}</p>
        {xp != null && <p className="text-sm font-medium text-primary">+{xp} XP</p>}
        {result?.needsRewatch && (
          <p className="text-sm text-amber-600">Média da aula abaixo de 70%. Assista a aula novamente para liberar +3 tentativas.</p>
        )}
        {result?.unitScore != null && (
          <p className="text-sm text-muted-foreground">Média da unidade: {result.unitScore}%</p>
        )}
        <p className="text-xs text-muted-foreground">
          Tentativas: {attempt?.attemptsUsed ?? 0}/{attempt?.attemptsMax ?? data.attempts}
        </p>
        {attempt?.canStart && (
          <Button
            onClick={() => {
              setResult(null);
              setQIndex(0);
              startMut.mutate();
            }}
          >
            Nova tentativa
          </Button>
        )}
      </Card>
    );
  }

  if (!inProgress && !attempt?.canAnswer) {
    return (
      <Card className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Atividade</p>
            <h1 className="font-display text-2xl font-semibold">{data.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{data.description}</p>
      <p className="text-xs text-muted-foreground">
        {questions.length} questões · {data.attempt?.attemptsMax ?? 3} tentativas por ciclo · respostas definitivas
      </p>
      {data.attempt?.rewatchHint && (
        <p className="mt-2 text-sm text-amber-600">{data.attempt.rewatchHint}</p>
      )}
      {data.unitScore != null && (
        <p className="mt-1 text-xs text-muted-foreground">Média da unidade (atividades + roleplay): {data.unitScore}%</p>
      )}
          </div>
          <Button variant="outline" onClick={onBack}>Voltar à aula</Button>
        </div>
        {attempt?.canStart === false ? (
          <p className="text-sm text-destructive">Limite de tentativas esgotado.</p>
        ) : (
          <Button onClick={() => startMut.mutate()} disabled={startMut.isPending}>
            Começar atividade
          </Button>
        )}
      </Card>
    );
  }

  if (!q) return null;

  return (
    <Card className="space-y-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Questão {qIndex + 1} de {questions.length}
          </p>
          <h1 className="font-display text-2xl font-semibold">{data.title}</h1>
        </div>
        <Button variant="outline" onClick={onBack}>Voltar à aula</Button>
      </div>

      <div className="rounded-xl border border-border/60 p-4">
        <p className="text-sm font-medium">{q.prompt}</p>
        {locked ? (
          <div className="mt-3 space-y-2 text-sm">
            <p>
              Sua resposta: <strong>{locked.answer}</strong>
              {locked.correct === true && " — Correto"}
              {locked.correct === false && " — Incorreto"}
            </p>
            {locked.feedback && <p className="text-muted-foreground">{locked.feedback}</p>}
            {locked.score != null && <p className="text-muted-foreground">Nota desta questão: {locked.score}%</p>}
            {qIndex < questions.length - 1 ? (
              <Button onClick={() => { setQIndex((i) => i + 1); setDraft(""); }}>Próxima questão</Button>
            ) : (
              <p className="text-xs text-muted-foreground">Todas respondidas — finalizando…</p>
            )}
          </div>
        ) : q.type === "essay" ? (
          <Textarea
            className="mt-3"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Digite sua resposta (será corrigida por IA)"
            disabled={busy}
          />
        ) : q.type === "boolean" ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {(q.options?.length
              ? q.options
              : [
                  { id: "true", label: "Verdadeiro" },
                  { id: "false", label: "Falso" },
                ]
            ).map((opt) => (
              <Button
                key={opt.id}
                type="button"
                variant={draft === opt.id ? "default" : "outline"}
                onClick={() => setDraft(opt.id)}
                disabled={busy}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {(q.options ?? []).map((opt) => (
              <label key={opt.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm hover:bg-accent/30">
                <input
                  type="radio"
                  name={q.id}
                  checked={draft === opt.id}
                  onChange={() => setDraft(opt.id)}
                  disabled={busy}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {!locked && (
        <Button disabled={busy || !draft.trim()} onClick={() => void confirmAnswer()}>
          {busy ? "Corrigindo…" : "Confirmar resposta"}
        </Button>
      )}
      <p className="text-xs text-muted-foreground">Após confirmar, a resposta não pode ser alterada.</p>
    </Card>
  );
}
