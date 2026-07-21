import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { continueLabel, resolveContinueLesson } from "@/utils/continueLesson";

export const Route = createFileRoute("/_app/continue")({
  component: ContinuePage,
  head: () => ({ meta: [{ title: "Continuar estudando — CTI Educacional" }] }),
});

function ContinuePage() {
  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesService.list(),
  });

  const list = courses.filter((c) => c.enrolled && c.progressPercent < 100);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Continuar estudando</h1>
        <p className="mt-1 text-muted-foreground">Retome ou comece seus cursos matriculados.</p>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : isError ? (
          <Card className="p-10 text-center text-muted-foreground">Não foi possível carregar os cursos. Tente novamente.</Card>
        ) : list.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">
            Nenhum curso disponível. Confira se há matrícula ativa e curso publicado.
          </Card>
        ) : (
          list.map((c) => {
            const lesson = resolveContinueLesson(c);
            const label = continueLabel(c);
            return (
              <Card key={c.id} className="flex flex-col gap-4 overflow-hidden p-0 md:flex-row">
                {c.coverUrl ? (
                  <img src={c.coverUrl} alt="" className="h-40 w-full object-cover md:h-auto md:w-64" />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary/70 to-muted md:h-auto md:w-64">
                    <span className="font-display text-4xl text-primary-foreground/90">
                      {c.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.categories[0]}</p>
                    <h3 className="font-display text-xl font-semibold text-balance">{c.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.shortDescription}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progresso</span>
                      <span>{c.progressPercent}%</span>
                    </div>
                    <Progress value={c.progressPercent} className="mt-1 h-2" />
                  </div>
                  <div className="mt-auto flex gap-2">
                    {lesson && (
                      <Button asChild className="gap-1">
                        <Link to="/courses/$courseId/lessons/$lessonId" params={{ courseId: c.id, lessonId: lesson.id }}>
                          <PlayCircle className="h-4 w-4" /> {label}
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <Link to="/courses/$courseId" params={{ courseId: c.id }}>Ver curso</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
