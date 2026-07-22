import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { http, USE_API } from "@/services/http";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { Trophy } from "lucide-react";
import { initials } from "@/utils/format";
import type { RankingEntry } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/ranking")({
  component: RankingPage,
  head: () => ({ meta: [{ title: "Ranking — CTI Educacional" }] }),
});

type Scope = "school" | "global";

async function fetchRanking(scope: Scope): Promise<{
  entries: RankingEntry[];
  me: RankingEntry | null;
  scope?: string;
  periodDays?: number;
}> {
  if (!USE_API) {
    return { entries: [], me: null, scope };
  }
  return http.get(`/ranking?scope=${scope}`);
}

function RankingPage() {
  const [scope, setScope] = useState<Scope>("school");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ranking", scope],
    queryFn: () => fetchRanking(scope),
  });

  const periodDays = data?.periodDays ?? 30;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">
          {scope === "global" ? "Ranking global" : "Ranking da escola"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {scope === "global"
            ? `XP ganho nos últimos ${periodDays} dias — todas as escolas (cidade/UF). Assim quem estuda com constância compete de forma justa, independente do tamanho do catálogo.`
            : "Pontuação total dos alunos desta escola (XP por aulas, atividades e role plays)."}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant={scope === "school" ? "default" : "outline"}
            onClick={() => setScope("school")}
          >
            Escola
          </Button>
          <Button
            size="sm"
            variant={scope === "global" ? "default" : "outline"}
            onClick={() => setScope("global")}
          >
            Global · {periodDays}d
          </Button>
        </div>
      </header>

      {data?.me && (
        <Card className="flex items-center gap-4 border-primary/30 bg-primary/5 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Sua posição{scope === "global" ? ` (últimos ${periodDays} dias)` : ""}
            </p>
            <p className="font-display text-xl font-semibold">
              #{data.me.position} · {data.me.xp} XP · Nível {data.me.level}
            </p>
            {data.me.city ? (
              <p className="text-xs text-muted-foreground">{data.me.city}</p>
            ) : null}
          </div>
        </Card>
      )}

      <Card className="divide-y divide-border/60 overflow-hidden p-0">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-none" />)
        ) : isError ? (
          <div className="p-4">
            <EmptyState
              icon={Trophy}
              title="Não foi possível carregar o ranking"
              description="Se o SQL de XP ainda não rodou no painel, peça para a escola executar database/lms_xp.sql."
              onRetry={() => void refetch()}
              className="border-0 bg-transparent py-10"
            />
          </div>
        ) : (data?.entries ?? []).length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={Trophy}
              title="Ainda sem pontuações"
              description="Conclua aulas e atividades para aparecer no ranking."
              actionLabel="Ver cursos"
              actionTo="/courses"
              className="border-0 bg-transparent py-10"
            />
          </div>
        ) : (
          (data?.entries ?? []).map((e) => (
            <div
              key={e.id}
              className={cn("flex items-center gap-3 px-4 py-3", e.isCurrentUser && "bg-primary/5")}
            >
              <span className="w-8 text-sm font-semibold text-muted-foreground">#{e.position ?? "-"}</span>
              <Avatar className="h-9 w-9">
                <AvatarImage src={e.avatarUrl} />
                <AvatarFallback>{initials(e.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{e.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {e.city ? `${e.city} · ` : ""}Nível {e.level}
                </p>
              </div>
              <span className="text-sm font-semibold">{e.xp} XP</span>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
