import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { achievementsService } from "@/services/achievementsService";
import type { Achievement } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/_app/achievements")({
  component: AchievementsPage,
  head: () => ({ meta: [{ title: "Conquistas — CTI Educacional" }] }),
});

type Filter = "all" | "unlocked" | "locked";
type Rarity = "all" | "bronze" | "prata" | "ouro" | "lendario";

const rarityLabel: Record<string, string> = {
  bronze: "Bronze",
  prata: "Prata",
  ouro: "Ouro",
  lendario: "Lendário",
};

function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [rarity, setRarity] = useState<Rarity>("all");
  const [selected, setSelected] = useState<Achievement | null>(null);

  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => achievementsService.list(),
  });

  const filtered = useMemo(() => {
    return data.filter((a) => {
      const unlocked = !!a.unlockedAt;
      if (filter === "unlocked" && !unlocked) return false;
      if (filter === "locked" && unlocked) return false;
      if (rarity !== "all" && (a.rarity ?? "bronze") !== rarity) return false;
      return true;
    });
  }, [data, filter, rarity]);

  const unlockedCount = data.filter((a) => a.unlockedAt).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Conquistas</h1>
          <p className="mt-1 text-muted-foreground">
            {unlockedCount} de {data.length} medalhas conquistadas. Clique para ver como desbloquear.
          </p>
        </div>
        <Trophy className="h-8 w-8 text-primary" />
      </header>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "Todas"],
            ["unlocked", "Desbloqueadas"],
            ["locked", "Bloqueadas"],
          ] as const
        ).map(([k, label]) => (
          <Button
            key={k}
            size="sm"
            variant={filter === k ? "default" : "outline"}
            onClick={() => setFilter(k)}
          >
            {label}
          </Button>
        ))}
        <span className="mx-1 hidden h-8 w-px bg-border sm:inline-block" />
        {(
          [
            ["all", "Raridade"],
            ["bronze", "Bronze"],
            ["prata", "Prata"],
            ["ouro", "Ouro"],
            ["lendario", "Lendário"],
          ] as const
        ).map(([k, label]) => (
          <Button
            key={k}
            size="sm"
            variant={rarity === k ? "default" : "outline"}
            onClick={() => setRarity(k)}
          >
            {label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon={Trophy}
          title="Não foi possível carregar as conquistas"
          description="Peça à escola para executar database/lms_conquistas.sql e lms_conquistas_v2.sql no painel."
          onRetry={() => void refetch()}
        />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Trophy} title="Nenhuma conquista neste filtro" description="Tente outro filtro de status ou raridade." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((a) => (
            <AchievementTile key={a.id} achievement={a} onClick={() => setSelected(a)} />
          ))}
        </div>
      )}

      <AchievementModal achievement={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function AchievementTile({
  achievement: a,
  onClick,
}: {
  achievement: Achievement;
  onClick: () => void;
}) {
  const unlocked = !!a.unlockedAt;
  const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[a.icon] ?? Icons.Award;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border p-3 text-left transition hover:border-primary/40",
        unlocked ? "border-primary/40 bg-primary/5" : "border-border/60 opacity-45 grayscale",
      )}
    >
      <div
        className={cn(
          "grid h-12 w-12 place-items-center rounded-xl",
          unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {a.badgeUrl ? (
          <img src={a.badgeUrl} alt="" className="h-10 w-10 object-contain" />
        ) : (
          <IconComp className="h-6 w-6" />
        )}
      </div>
      <p className="mt-2 truncate text-xs font-medium text-primary/80">
        {a.subtitle || rarityLabel[a.rarity ?? "bronze"]}
      </p>
      <p className="truncate text-sm font-semibold">{a.title}</p>
      {!unlocked && a.progress != null && a.goal ? (
        <Progress value={(a.progress / a.goal) * 100} className="mt-2 h-1" />
      ) : null}
    </button>
  );
}

function AchievementModal({
  achievement,
  onClose,
}: {
  achievement: Achievement | null;
  onClose: () => void;
}) {
  const a = achievement;
  const IconComp = a
    ? ((Icons as unknown as Record<string, Icons.LucideIcon>)[a.icon] ?? Icons.Award)
    : Icons.Award;
  const unlocked = !!a?.unlockedAt;
  const goal = Math.max(1, a?.goal ?? 1);
  const progress = a?.progress ?? 0;

  return (
    <Dialog open={!!a} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {a && (
          <>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-14 w-14 place-items-center rounded-2xl",
                    unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  {a.badgeUrl ? (
                    <img src={a.badgeUrl} alt="" className="h-12 w-12 object-contain" />
                  ) : (
                    <IconComp className="h-7 w-7" />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {a.subtitle || rarityLabel[a.rarity ?? "bronze"]}
                  </p>
                  <DialogTitle>{a.title}</DialogTitle>
                </div>
              </div>
              <DialogDescription>{a.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progresso</span>
                  <span>
                    {Math.min(progress, goal)} / {goal}
                  </span>
                </div>
                <Progress value={(Math.min(progress, goal) / goal) * 100} className="h-2" />
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Como conquistar
                </p>
                <p className="mt-1 text-sm">{a.howTo || a.description}</p>
              </div>
              {unlocked ? (
                <p className="text-sm text-primary">Medalha desbloqueada!</p>
              ) : null}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
