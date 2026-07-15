import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/continue")({
  component: ContinuePage,
});

function ContinuePage() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesService.list(),
  });

  const inProgress = courses.filter((c) => c.progressPercent > 0 && c.progressPercent < 100);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Continuar estudando</h1>
        <p className="mt-1 text-muted-foreground">Retome exatamente de onde parou.</p>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : inProgress.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">Nenhum curso em andamento. Que tal começar um novo?</Card>
        ) : (
          inProgress.map((c) => {
            const lessonId =
              c.lastAccessedLessonId ??
              c.modules.flatMap((m) => m.lessons).find((l) => !l.locked && !l.completed)?.id;
            return (
              <Card key={c.id} className="flex flex-col gap-4 overflow-hidden p-0 md:flex-row">
                <img src={c.coverUrl} alt="" className="h-40 w-full object-cover md:h-auto md:w-64" />
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
                    {lessonId && (
                      <Button asChild className="gap-1">
                        <Link to="/courses/$courseId/lessons/$lessonId" params={{ courseId: c.id, lessonId }}>
                          <PlayCircle className="h-4 w-4" /> Continuar
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

// unused: silence lint for redirect import in case adjusted later
void redirect;
