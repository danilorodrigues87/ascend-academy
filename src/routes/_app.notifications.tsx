import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { Bell, BookOpen, Award, Sparkles, Info, CheckCheck, Settings } from "lucide-react";
import { relativeTime } from "@/utils/format";
import type { Notification } from "@/types";
import { filterNotificationsByPrefs, useNotificationPrefs } from "@/utils/notificationPrefs";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
  head: () => ({ meta: [{ title: "Notificações — CTI Educacional" }] }),
});

const iconFor = {
  lesson: BookOpen,
  course: BookOpen,
  certificate: Award,
  ai: Sparkles,
  system: Info,
};

function NotificationsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [prefs] = useNotificationPrefs();
  const { data: list = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsService.list(),
  });
  const visible = useMemo(() => filterNotificationsByPrefs(list, prefs), [list, prefs]);

  const markAll = useMutation({
    mutationFn: () => notificationsService.markAllRead(),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
      void qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
  const markOne = useMutation({
    mutationFn: (id: string) => notificationsService.markRead(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
      void qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const openNotification = (n: Notification) => {
    if (!n.read) {
      markOne.mutate(n.id);
    }
    if (n.link) {
      void navigate({ to: n.link as never });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">Notificações</h1>
          <p className="mt-1 text-muted-foreground">Novidades sobre seus cursos, IA e conquistas.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/settings">
              <Settings className="h-4 w-4" /> Preferências
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => markAll.mutate()}
            disabled={!visible.length}
          >
            <CheckCheck className="h-4 w-4" /> Marcar todas como lidas
          </Button>
        </div>
      </header>

      {!prefs.enabled ? (
        <EmptyState
          icon={Bell}
          title="Notificações desativadas"
          description="Ative em Configurações para voltar a ver avisos no portal."
          actionLabel="Abrir configurações"
          actionTo="/settings"
        />
      ) : (
        <Card className="divide-y divide-border/60 overflow-hidden p-0">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-none" />)
          ) : isError ? (
            <div className="p-4">
              <EmptyState
                icon={Bell}
                title="Falha ao carregar notificações"
                onRetry={() => void refetch()}
                className="border-0 bg-transparent py-10"
              />
            </div>
          ) : visible.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={Bell}
                title="Sem notificações por enquanto"
                description="Avisos de aulas, certificados e conquistas aparecem aqui."
                className="border-0 bg-transparent py-10"
              />
            </div>
          ) : (
            visible.map((n) => {
              const Icon = iconFor[n.type] ?? Info;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => openNotification(n)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-accent/40"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted" : "bg-primary"}`} />
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {relativeTime(n.createdAt)}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </Card>
      )}
    </div>
  );
}
