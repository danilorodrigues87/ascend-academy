import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { rolePlayService } from "@/services";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { RolePlayDifficulty, RolePlayStatus } from "@/types";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_app/roleplay")({
  component: RolePlayListPage,
  head: () => ({ meta: [{ title: "Simulações Práticas — Aurora" }] }),
});

const difficultyLabel: Record<RolePlayDifficulty, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
  expert: "Especialista",
};

const difficultyTone: Record<RolePlayDifficulty, string> = {
  easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  hard: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
  expert: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
};

const statusMeta: Record<RolePlayStatus, { label: string; className: string }> = {
  pending: { label: "Não iniciado", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "Em andamento", className: "bg-primary/10 text-primary" },
  approved: {
    label: "Aprovado",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  retry: { label: "Refazer", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function RolePlayListPage() {
  const scenarios = useQuery({
    queryKey: ["roleplay:scenarios"],
    queryFn: () => rolePlayService.listScenarios(),
  });
  const history = useQuery({
    queryKey: ["roleplay:history"],
    queryFn: () => rolePlayService.listHistory(),
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10 p-4 md:p-8">
      <header className="space-y-3">
        <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
          <Sparkles className="h-3 w-3" /> Novo tipo de atividade
        </Badge>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">
          Simulações Práticas com IA
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Pratique situações reais antes de concluir cada módulo. Converse com personagens
          controlados por IA, receba avaliação por competência e feedback personalizado.
        </p>
      </header>

      {/* Scenarios */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Simulações disponíveis</h2>
        </div>

        {scenarios.isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {scenarios.data?.map((s) => (
              <Card
                key={s.id}
                className="group relative overflow-hidden border-border/60 p-6 transition hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 gradient-primary opacity-70" />
                <div className="flex flex-wrap items-start gap-3">
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${difficultyTone[s.difficulty]}`}>
                    <Flame className="h-3 w-3" /> {difficultyLabel[s.difficulty]}
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" /> {s.estimatedMinutes} min
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="h-3 w-3" /> {s.courseTitle}
                  </Badge>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.moduleTitle}
                </p>

                <div className="mt-4 grid gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Você é <strong>{s.userRole}</strong>. A IA será{" "}
                      <strong>{s.aiRole}</strong>.
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Nota mínima <strong className="text-foreground">{s.minScore}</strong>
                  </span>
                  <Button asChild size="sm">
                    <Link
                      to="/roleplay/$simulationId"
                      params={{ simulationId: s.id }}
                    >
                      Iniciar simulação
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Histórico de simulações</h2>

        {history.isLoading ? (
          <Skeleton className="h-40 rounded-2xl" />
        ) : (history.data?.length ?? 0) === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            Você ainda não realizou nenhuma simulação.
          </Card>
        ) : (
          <Card className="overflow-hidden border-border/60">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Data</th>
                    <th className="px-4 py-3 text-left font-medium">Curso / Módulo</th>
                    <th className="px-4 py-3 text-left font-medium">Tema</th>
                    <th className="px-4 py-3 text-left font-medium">Nota</th>
                    <th className="px-4 py-3 text-left font-medium">Tempo</th>
                    <th className="px-4 py-3 text-left font-medium">Msgs</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.data?.map((h) => (
                    <tr key={h.id} className="border-t border-border/60">
                      <td className="px-4 py-3">
                        {new Date(h.startedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{h.courseTitle}</div>
                        <div className="text-xs text-muted-foreground">{h.moduleTitle}</div>
                      </td>
                      <td className="px-4 py-3">{h.theme}</td>
                      <td className="px-4 py-3 font-semibold">
                        {h.score ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDuration(h.durationSeconds)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {h.messages.length || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusMeta[h.status].className}`}
                        >
                          {h.status === "approved" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : h.status === "retry" ? (
                            <RefreshCw className="h-3 w-3" />
                          ) : (
                            <MessageSquare className="h-3 w-3" />
                          )}
                          {statusMeta[h.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
