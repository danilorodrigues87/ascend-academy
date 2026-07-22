import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { assessmentsService } from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";
import type { Assessment, AssessmentResult } from "@/types";
import {
  Award,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/_app/assessments")({
  component: AssessmentsPage,
  head: () => ({ meta: [{ title: "Avaliações — CTI Educacional" }] }),
});

function AssessmentsPage() {
  const { data: list = [], isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => assessmentsService.list(),
  });
  const [active, setActive] = useState<Assessment | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  if (active) return <AssessmentRunner assessment={active} onExit={() => { setActive(null); setResult(null); }} onDone={setResult} result={result} />;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Avaliações</h1>
        <p className="mt-1 text-muted-foreground">Teste seu conhecimento e receba feedback inteligente.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)
          : list.map((a) => (
              <Card key={a.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  </div>
                  {a.bestScore != null && <Badge>Melhor: {a.bestScore}%</Badge>}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.durationMinutes} min</div>
                  <div className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> {a.questions.length} questões</div>
                  <div className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {a.attempts} tentativas</div>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button className="flex-1" onClick={() => setActive(a)}>Iniciar</Button>
                  <Button variant="outline" className="flex-1">Histórico</Button>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}

function AssessmentRunner({
  assessment,
  onExit,
  onDone,
  result,
}: {
  assessment: Assessment;
  onExit: () => void;
  onDone: (r: AssessmentResult) => void;
  result: AssessmentResult | null;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const submit = useMutation({
    mutationFn: () => assessmentsService.submit(assessment.id, answers),
    onSuccess: (r) => {
      onDone(r);
      toast.success("Avaliação enviada!");
    },
  });

  if (result) return <ResultView result={result} onExit={onExit} />;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Avaliação</p>
          <h1 className="font-display text-3xl font-semibold">{assessment.title}</h1>
        </div>
        <Button variant="ghost" onClick={onExit}>Sair</Button>
      </div>

      <div className="space-y-4">
        {assessment.questions.map((q, i) => (
          <Card key={q.id} className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Questão {i + 1} · {typeLabel(q.type)}
            </p>
            <h3 className="mt-2 text-lg font-medium">{q.prompt}</h3>
            {q.type === "roleplay" && q.roleplayCharacter && (
              <Badge variant="secondary" className="mt-3 gap-1">
                <Sparkles className="h-3 w-3" /> IA como: {q.roleplayCharacter}
              </Badge>
            )}
            <div className="mt-4">
              {q.type === "multiple" && q.options && (
                <RadioGroup value={answers[q.id] ?? ""} onValueChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}>
                  {q.options.map((o) => (
                    <div key={o.id} className="flex items-center gap-2 rounded-lg border border-border/60 p-3 transition hover:bg-accent/40">
                      <RadioGroupItem value={o.id} id={`${q.id}_${o.id}`} />
                      <Label htmlFor={`${q.id}_${o.id}`} className="flex-1 cursor-pointer">{o.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {q.type === "boolean" && (
                <div className="grid grid-cols-2 gap-2">
                  {["true", "false"].map((v) => (
                    <Button
                      key={v}
                      variant={answers[q.id] === v ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                    >
                      {v === "true" ? "Verdadeiro" : "Falso"}
                    </Button>
                  ))}
                </div>
              )}
              {(q.type === "essay" || q.type === "roleplay") && (
                <Textarea
                  placeholder={q.type === "roleplay" ? "Sua resposta ao personagem..." : "Sua resposta..."}
                  className="min-h-[120px]"
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button size="lg" className="w-full" disabled={submit.isPending} onClick={() => submit.mutate()}>
        {submit.isPending ? "Corrigindo..." : "Enviar avaliação"}
      </Button>
    </div>
  );
}

function ResultView({ result, onExit }: { result: AssessmentResult; onExit: () => void }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <Card className="gradient-hero p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-glow">
          <Award className="h-8 w-8 text-primary-foreground" />
        </div>
        <p className="mt-6 text-sm uppercase tracking-wider text-muted-foreground">Sua nota</p>
        <p className="mt-1 font-display text-6xl font-semibold">{result.score}</p>
        <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground">{result.feedback}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-3 flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-success" /> Pontos fortes</h3>
          <ul className="space-y-2 text-sm">
            {result.strengths.map((s, i) => <li key={i} className="flex gap-2"><span className="text-success">•</span> {s}</li>)}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="mb-3 flex items-center gap-2 font-medium"><MessageSquare className="h-4 w-4 text-warning-foreground" /> A melhorar</h3>
          <ul className="space-y-2 text-sm">
            {result.improvements.map((s, i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span> {s}</li>)}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-medium">Competências avaliadas</h3>
        <div className="space-y-4">
          {result.competencies.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm">
                <span>{c.name}</span>
                <span className="font-medium">{c.score}%</span>
              </div>
              <Progress value={c.score} className="mt-1 h-2" />
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full" onClick={onExit}>Voltar às avaliações</Button>
    </div>
  );
}

function typeLabel(t: Assessment["questions"][number]["type"]) {
  return {
    multiple: "Alternativa",
    boolean: "Verdadeiro / Falso",
    essay: "Dissertativa",
    roleplay: "Role Play com IA",
  }[t];
}
