import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, BookOpen, Award, Sparkles, Info, CheckCheck } from "lucide-react";
import { relativeTime } from "@/utils/format";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
  head: () => ({ meta: [{ title: "Notificações — Aurora" }] }),
});

const iconFor = {
  lesson: BookOpen,
  course: BookOpen,
  certificate: Award,
  ai: Sparkles,
  system: Info,
};

function NotificationsPage() {
  const qc = useQueryClient();
  const { data: list = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsService.list(),
  });
  const markAll = useMutation({
    mutationFn: () => notificationsService.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Notificações</h1>
          <p className="mt-1 text-muted-foreground">Novidades sobre seus cursos, IA e conquistas.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => markAll.mutate()}>
          <CheckCheck className="h-4 w-4" /> Marcar todas como lidas
        </Button>
      </header>

      <Card className="divide-y divide-border/60">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
        ) : list.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Bell className="mx-auto h-8 w-8" />
            <p className="mt-3">Sem notificações por enquanto.</p>
          </div>
        ) : (
          list.map((n) => {
            const Icon = iconFor[n.type];
            return (
              <div key={n.id} className={`flex gap-4 p-4 transition ${!n.read ? "bg-primary/5" : ""}`}>
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${!n.read ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{n.title}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{relativeTime(n.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}
