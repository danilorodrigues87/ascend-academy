import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/common/StatCard";
import { CourseCard } from "@/components/common/CourseCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Flame,
  TrendingUp,
  PlayCircle,
  Trophy,
  Bell,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { formatMinutes, initials, relativeTime } from "@/utils/format";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — Aurora" }] }),
});

function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => coursesService.getDashboard(),
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 gradient-hero p-6 md:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="h-14 w-14 shrink-0 border-2 border-primary/30 shadow-glow">
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback>{user ? initials(user.name) : "AA"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Olá, bem-vinda de volta 👋</p>
              <h1 className="truncate font-display text-2xl font-semibold sm:text-3xl">
                {user?.name}
              </h1>
              {data?.currentCourse && (
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  Estudando <span className="text-foreground">{data.currentCourse.title}</span>
                </p>
              )}
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur sm:flex">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sequência</p>
              <p className="font-display text-lg font-semibold leading-none">{data?.streakDays ?? 0} dias</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso geral</span>
            <span className="font-medium">{data?.overallProgress ?? 0}%</span>
          </div>
          <Progress value={data?.overallProgress ?? 0} className="h-2" />
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : (
          <>
            <StatCard label="Cursos" value={data?.coursesCount ?? 0} icon={BookOpen} hint="matriculados" />
            <StatCard label="Concluído" value={`${data?.overallProgress ?? 0}%`} icon={TrendingUp} accent="success" hint="progresso geral" />
            <StatCard label="Tempo estudado" value={formatMinutes(data?.studyMinutes ?? 0)} icon={Clock} accent="chart-2" />
            <StatCard label="Sequência" value={`${data?.streakDays ?? 0} dias`} icon={Flame} accent="warning" hint="consecutivos" />
          </>
        )}
      </section>

      {/* Continue + Next lesson */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden p-0">
          {isLoading || !data?.continueLesson ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="relative">
              <div className="relative aspect-[21/9] overflow-hidden">
                <img src={data.continueLesson.course.bannerUrl} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <Badge className="w-fit">Continue de onde parou</Badge>
                <h2 className="mt-3 font-display text-2xl font-semibold text-balance md:text-3xl">
                  {data.continueLesson.lesson.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {data.continueLesson.course.title} · {data.continueLesson.lesson.durationMinutes}min
                </p>
                <div className="mt-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link
                      to="/courses/$courseId/lessons/$lessonId"
                      params={{
                        courseId: data.continueLesson.course.id,
                        lessonId: data.continueLesson.lesson.id,
                      }}
                    >
                      <PlayCircle className="h-5 w-5" /> Continuar aula
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Notificações</h3>
            </div>
            <Link to="/notifications" className="text-xs text-primary hover:underline">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
              : data?.notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/40">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted" : "bg-primary"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{n.message}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{relativeTime(n.createdAt)}</p>
                    </div>
                  </div>
                ))}
          </div>
        </Card>
      </section>

      {/* Recent courses */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold">Últimos cursos acessados</h2>
            <p className="text-sm text-muted-foreground">Continue seus estudos onde parou.</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/courses">Ver tudo <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)
            : data?.recentCourses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Gamification */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* XP / level */}
        <Card className="gradient-card p-6 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Seu nível</p>
              <p className="mt-1 font-display text-4xl font-semibold">Nv. {data?.level ?? 1}</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{data?.xp ?? 0} XP</span>
              <span className="text-muted-foreground">{data?.nextLevelXp ?? 0} XP</span>
            </div>
            <Progress value={((data?.xp ?? 0) / (data?.nextLevelXp || 1)) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Faltam {(data?.nextLevelXp ?? 0) - (data?.xp ?? 0)} XP para o próximo nível.
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Conquistas</h3>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data?.achievements.slice(0, 6).map((a) => {
              const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[a.icon] ?? Icons.Award;
              const unlocked = !!a.unlockedAt;
              return (
                <div
                  key={a.id}
                  className={`rounded-xl border p-3 transition ${
                    unlocked ? "border-primary/40 bg-primary/5" : "border-border/60 opacity-70"
                  }`}
                >
                  <div className={`grid h-9 w-9 place-items-center rounded-lg ${unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <IconComp className="h-4 w-4" />
                  </div>
                  <p className="mt-2 truncate text-sm font-medium">{a.title}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{a.description}</p>
                  {!unlocked && a.progress != null && a.goal && (
                    <Progress value={(a.progress / a.goal) * 100} className="mt-2 h-1" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Ranking */}
      <section>
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold">Ranking semanal</h3>
              <p className="text-sm text-muted-foreground">Sua posição entre os alunos mais dedicados.</p>
            </div>
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            {data?.ranking.map((r) => (
              <div
                key={r.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  r.isCurrentUser ? "border-primary/40 bg-primary/5" : "border-border/60"
                }`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold ${
                  r.position === 1 ? "bg-warning/25 text-warning-foreground" : "bg-muted"
                }`}>
                  {r.position}
                </span>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={r.avatarUrl} alt={r.name} />
                  <AvatarFallback>{initials(r.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {r.name} {r.isCurrentUser && <span className="text-xs text-primary">(você)</span>}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium">{r.xp.toLocaleString("pt-BR")} XP</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
