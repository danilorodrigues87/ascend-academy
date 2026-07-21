import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { http, USE_API } from "@/services/http";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { initials } from "@/utils/format";
import type { RankingEntry } from "@/types";

export const Route = createFileRoute("/_app/ranking")({
  component: RankingPage,
  head: () => ({ meta: [{ title: "Ranking — CTI Educacional" }] }),
});

async function fetchRanking(): Promise<{ entries: RankingEntry[]; me: RankingEntry | null }> {
  if (!USE_API) {
    return { entries: [], me: null };
  }
  return http.get("/ranking");
}

function RankingPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ranking"],
    queryFn: fetchRanking,
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Ranking da escola</h1>
        <p className="mt-1 text-muted-foreground">
          Pontuação dos alunos desta escola (XP por aulas, atividades e role plays).
        </p>
      </header>

      {data?.me && (
        <Card className="flex items-center gap-4 border-primary/30 bg-primary/5 p-5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Sua posição</p>
            <p className="font-display text-xl font-semibold">
              #{data.me.position} · {data.me.xp} XP · Nível {data.me.level}
            </p>
          </div>
        </Card>
      )}

      <Card className="divide-y divide-border/60 overflow-hidden p-0">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-none" />)
          : isError
            ? <p className="p-8 text-center text-muted-foreground">Não foi possível carregar o ranking. Execute o SQL database/lms_xp.sql se ainda não rodou.</p>
            : (data?.entries ?? []).length === 0
              ? <p className="p-8 text-center text-muted-foreground">Ainda não há pontuações. Conclua aulas para aparecer aqui.</p>
              : (data?.entries ?? []).map((e) => (
                  <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-8 text-sm font-semibold text-muted-foreground">#{e.position ?? "-"}</span>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={e.avatarUrl} />
                      <AvatarFallback>{initials(e.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{e.name}</p>
                      <p className="text-xs text-muted-foreground">Nível {e.level}</p>
                    </div>
                    <span className="text-sm font-semibold">{e.xp} XP</span>
                  </div>
                ))}
      </Card>
    </div>
  );
}
