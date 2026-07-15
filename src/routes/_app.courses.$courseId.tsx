import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatMinutes, initials } from "@/utils/format";
import {
  Award,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
  PlayCircle,
  Star,
  Target,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_app/courses/$courseId")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => coursesService.getById(courseId),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 rounded-xl lg:col-span-2" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }
  if (!course) return <div className="p-8 text-muted-foreground">Curso não encontrado.</div>;

  const firstUnlockedLesson =
    course.modules.flatMap((m) => m.lessons).find((l) => !l.locked && !l.completed) ??
    course.modules[0]?.lessons[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <img src={course.bannerUrl} alt={course.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {course.categories.map((c) => (
              <Badge key={c} variant="secondary" className="backdrop-blur">{c}</Badge>
            ))}
            <Badge className="backdrop-blur">{course.level}</Badge>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-balance md:text-5xl">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{course.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={course.instructor.avatarUrl} />
                <AvatarFallback>{initials(course.instructor.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-tight">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {course.rating.toFixed(1)} <span className="text-muted-foreground">({course.ratingCount})</span></span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {course.workloadHours}h</span>
            <span className="inline-flex items-center gap-1"><Layers className="h-4 w-4" /> {course.modulesCount} módulos · {course.lessonsCount} aulas</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {firstUnlockedLesson && (
              <Button asChild size="lg" className="gap-2">
                <Link to="/courses/$courseId/lessons/$lessonId" params={{ courseId: course.id, lessonId: firstUnlockedLesson.id }}>
                  <PlayCircle className="h-5 w-5" /> Continuar curso
                </Link>
              </Button>
            )}
            <div className="min-w-[240px] flex-1 max-w-md">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progresso</span>
                <span>{course.progressPercent}%</span>
              </div>
              <Progress value={course.progressPercent} className="mt-1 h-2" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Modules */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold">Conteúdo do curso</h2>
          <Accordion type="multiple" defaultValue={course.modules.map((m) => m.id)} className="space-y-3">
            {course.modules.map((m) => {
              const doneCount = m.lessons.filter((l) => l.completed).length;
              return (
                <AccordionItem
                  key={m.id}
                  value={m.id}
                  className="overflow-hidden rounded-xl border border-border/60 bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex flex-1 items-center justify-between gap-4 pr-2">
                      <div className="flex items-center gap-3 text-left">
                        {m.locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                            {m.order}
                          </span>
                        )}
                        <div>
                          <p className="font-medium">{m.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {m.lessons.length} aulas · {doneCount}/{m.lessons.length} concluídas
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-border/60 bg-muted/20 p-0">
                    <ul>
                      {m.lessons.map((l) => (
                        <li key={l.id}>
                          <Link
                            to="/courses/$courseId/lessons/$lessonId"
                            params={{ courseId: course.id, lessonId: l.id }}
                            className={`flex items-center gap-3 border-b border-border/40 px-4 py-3 last:border-0 transition-colors hover:bg-accent/40 ${l.locked ? "pointer-events-none opacity-60" : ""}`}
                          >
                            {l.locked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : l.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-primary" />
                            )}
                            <span className="flex-1 truncate text-sm">{l.title}</span>
                            <span className="shrink-0 text-xs text-muted-foreground">{formatMinutes(l.durationMinutes)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Objectives */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-medium"><Target className="h-4 w-4 text-primary" /> Objetivos de aprendizado</h3>
            <ul className="space-y-3">
              {course.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-medium"><Users className="h-4 w-4 text-primary" /> Sobre o professor</h3>
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={course.instructor.avatarUrl} />
                <AvatarFallback>{initials(course.instructor.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                {course.instructor.bio && <p className="mt-2 text-sm text-muted-foreground">{course.instructor.bio}</p>}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h3 className="mb-3 flex items-center gap-2 font-medium"><Award className="h-4 w-4 text-primary" /> Certificado</h3>
            <p className="text-sm text-muted-foreground">Ao concluir 100% do curso, você receberá um certificado digital de {course.workloadHours}h.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
