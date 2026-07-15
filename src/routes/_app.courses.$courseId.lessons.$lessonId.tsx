import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatMinutes } from "@/utils/format";

export const Route = createFileRoute("/_app/courses/$courseId/lessons/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { courseId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["lesson", courseId, lessonId],
    queryFn: () => coursesService.getLesson(courseId, lessonId),
  });

  const [notes, setNotes] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem(`notes:${lessonId}`);
    setNotes(saved ?? "");
  }, [lessonId]);
  useEffect(() => {
    const t = setTimeout(() => localStorage.setItem(`notes:${lessonId}`, notes), 400);
    return () => clearTimeout(t);
  }, [notes, lessonId]);

  const complete = useMutation({
    mutationFn: () => coursesService.markLessonCompleted(courseId, lessonId),
    onSuccess: () => {
      toast.success("Aula marcada como concluída!");
      qc.invalidateQueries({ queryKey: ["lesson", courseId, lessonId] });
      qc.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });

  const { prev, next } = useMemo(() => {
    if (!data) return { prev: null, next: null };
    const flat = data.course.modules.flatMap((m) => m.lessons);
    const idx = flat.findIndex((l) => l.id === data.lesson.id);
    return { prev: flat[idx - 1] ?? null, next: flat[idx + 1] ?? null };
  }, [data]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (!data) return <div className="p-8">Aula não encontrada.</div>;

  const { course, lesson } = data;

  return (
    <div className="mx-auto grid max-w-[1600px] gap-6 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Main */}
      <div className="min-w-0 space-y-6">
        <div>
          <Link
            to="/courses/$courseId"
            params={{ courseId: course.id }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {course.title}
          </Link>
        </div>

        {/* Player — abstracted to allow swapping providers later */}
        <VideoPlayer lesson={lesson} />

        <div>
          <h1 className="font-display text-2xl font-semibold md:text-3xl">{lesson.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{formatMinutes(lesson.durationMinutes)} · {course.title}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => complete.mutate()}
            disabled={lesson.completed || complete.isPending}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {lesson.completed ? "Concluída" : "Marcar como concluída"}
          </Button>
          {next && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate({ to: "/courses/$courseId/lessons/$lessonId", params: { courseId: course.id, lessonId: next.id } })}
            >
              Próxima aula <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="resources">Materiais</TabsTrigger>
            <TabsTrigger value="notes">Anotações</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-4">
            <Card className="p-6 text-sm leading-relaxed text-muted-foreground">
              {lesson.description}
            </Card>
          </TabsContent>
          <TabsContent value="resources" className="mt-4">
            <Card className="divide-y divide-border/60">
              {(lesson.resources ?? []).map((r) => (
                <a key={r.id} href={r.url} className="flex items-center gap-3 p-4 transition hover:bg-accent/40">
                  {r.type === "pdf" ? <FileText className="h-4 w-4 text-primary" /> : <LinkIcon className="h-4 w-4 text-primary" />}
                  <span className="flex-1 text-sm">{r.label}</span>
                  {r.type === "pdf" ? <Download className="h-4 w-4 text-muted-foreground" /> : <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </a>
              ))}
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <Card className="p-4">
              <Textarea
                placeholder="Suas anotações desta aula (salvamento automático)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[180px] border-0 focus-visible:ring-0"
              />
            </Card>
          </TabsContent>
          <TabsContent value="comments" className="mt-4">
            <Card className="p-8 text-center text-sm text-muted-foreground">
              Em breve: comentários entre alunos e resposta do professor.
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <aside className="min-w-0">
        <Card className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden p-0">
          <div className="border-b border-border/60 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Conteúdo do curso</p>
            <p className="mt-1 truncate font-medium">{course.title}</p>
          </div>
          <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
            {course.modules.map((m) => (
              <div key={m.id}>
                <div className="border-b border-border/40 bg-muted/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Módulo {m.order} — {m.title}
                </div>
                <ul>
                  {m.lessons.map((l) => {
                    const active = l.id === lesson.id;
                    return (
                      <li key={l.id}>
                        <Link
                          to="/courses/$courseId/lessons/$lessonId"
                          params={{ courseId: course.id, lessonId: l.id }}
                          disabled={l.locked}
                          className={`flex items-center gap-2 border-b border-border/30 px-4 py-2.5 text-sm transition-colors ${
                            active ? "bg-primary/10 text-primary" : "hover:bg-accent/40"
                          } ${l.locked ? "pointer-events-none opacity-60" : ""}`}
                        >
                          {l.locked ? (
                            <Lock className="h-3.5 w-3.5 shrink-0" />
                          ) : l.completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                          ) : (
                            <PlayCircle className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span className="flex-1 truncate">{l.title}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">{l.durationMinutes}m</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

/**
 * VideoPlayer — abstraction over YouTube today, private streaming tomorrow.
 * Swap the inner iframe for HLS/Video.js when the backend provides signed URLs.
 */
function VideoPlayer({ lesson }: { lesson: { videoUrl: string; videoProvider: "youtube" | "private"; title: string } }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-black shadow-elegant">
      {lesson.videoProvider === "youtube" ? (
        <iframe
          src={lesson.videoUrl + "?rel=0&modestbranding=1"}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <video src={lesson.videoUrl} controls className="h-full w-full" />
      )}
    </div>
  );
}
