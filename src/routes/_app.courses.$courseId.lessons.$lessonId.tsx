import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService, aiService } from "@/services";
import { authService } from "@/services/authService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Download,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Lock,
  MessageCircleMore,
  PanelRightClose,
  PanelRightOpen,
  PlayCircle,
  RefreshCw,
  Send,
  Sparkles,
  Square,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { formatMinutes } from "@/utils/format";
import { youtubeEmbedSrc } from "@/utils/youtube";
import type { AccessWindow, Course, CurriculumItem, Lesson, LessonComment } from "@/types";
import { InlineAssessment } from "@/components/course/InlineAssessment";
import { InlineRoleplay } from "@/components/course/InlineRoleplay";
import { CourseRatingControl } from "@/components/common/CourseRating";
import { useAuth } from "@/contexts/AuthContext";

type Search = { panel?: "content" | "ai"; item?: string };

export const Route = createFileRoute("/_app/courses/$courseId/lessons/$lessonId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    panel: s.panel === "ai" ? "ai" : "content",
    item: typeof s.item === "string" ? s.item : undefined,
  }),
  component: LessonPage,
  head: () => ({ meta: [{ title: "Aula — CTI Educacional" }] }),
});

function LessonPage() {
  const { courseId, lessonId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { refreshUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sideTab, setSideTab] = useState<"content" | "ai">(search.panel === "ai" ? "ai" : "content");

  const { data, isLoading, isError } = useQuery({
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
    onSuccess: (res) => {
      toast.success((res as any)?.message || "Aula marcada como concluída!");
      qc.invalidateQueries({ queryKey: ["lesson", courseId, lessonId] });
      qc.invalidateQueries({ queryKey: ["course", courseId] });
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["ranking"] });
      void refreshUser();
    },
    onError: (e: Error) => {
      toast.error(e.message || "Não foi possível concluir a aula.");
    },
  });

  const activeItem = useMemo(() => {
    if (!search.item || !data) return { kind: "lesson" as const, id: lessonId };
    const [kind, id] = search.item.split(":");
    if ((kind === "assessment" || kind === "roleplay") && id) {
      return { kind: kind as "assessment" | "roleplay", id };
    }
    return { kind: "lesson" as const, id: lessonId };
  }, [search.item, lessonId, data]);

  const { prev, next } = useMemo(() => {
    if (!data) return { prev: null, next: null };
    const flat = data.course.modules.flatMap((m) => m.curriculum ?? m.lessons.map((l) => ({
      kind: "lesson" as const,
      id: l.id,
      title: l.title,
      order: l.order,
      durationMinutes: l.durationMinutes,
      completed: l.completed,
      locked: l.locked,
    })));
    let idx = -1;
    if (activeItem.kind === "lesson") {
      idx = flat.findIndex((i) => i.kind === "lesson" && i.id === data.lesson.id);
    } else {
      idx = flat.findIndex((i) => i.kind === activeItem.kind && i.id === activeItem.id);
    }
    return { prev: flat[idx - 1] ?? null, next: flat[idx + 1] ?? null };
  }, [data, activeItem]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="space-y-3 p-8">
        <p className="text-muted-foreground">Não foi possível carregar a aula.</p>
        <p className="text-xs text-muted-foreground">Curso {courseId} · Aula {lessonId}</p>
        <Button asChild variant="outline">
          <Link to="/courses">Voltar aos cursos</Link>
        </Button>
      </div>
    );
  }

  const { course, lesson } = data;
  const accessWindow = (data as { accessWindow?: AccessWindow }).accessWindow ?? course.accessWindow;
  const contentLocked = !!lesson.locked && !lesson.completed;

  const goItem = (item: CurriculumItem) => {
    if (item.locked) {
      if (item.lockMessage) toast.message(item.lockMessage);
      return;
    }
    if (item.kind === "lesson") {
      navigate({
        to: "/courses/$courseId/lessons/$lessonId",
        params: { courseId: course.id, lessonId: item.id },
        search: { panel: sideTab },
      });
      return;
    }
    navigate({
      to: "/courses/$courseId/lessons/$lessonId",
      params: { courseId: course.id, lessonId },
      search: { panel: sideTab, item: `${item.kind}:${item.id}` },
    });
  };

  return (
    <div className={`mx-auto grid max-w-[1600px] gap-0 p-0 md:p-2 ${sidebarOpen ? "lg:grid-cols-[minmax(0,1fr)_380px]" : "grid-cols-1"}`}>
      <div className="min-w-0 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={"/courses"}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Meus cursos
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen((v) => !v)} className="gap-1">
            {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            {sidebarOpen ? "Ocultar" : "Conteúdo"}
          </Button>
        </div>

        {accessWindow && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              accessWindow.active
                ? "border-emerald-500/30 bg-emerald-500/10 text-foreground"
                : "border-amber-500/30 bg-amber-500/10 text-foreground"
            }`}
          >
            <p className="font-medium">{accessWindow.active ? "Sessão de estudos ativa" : "Fora do horário agendado"}</p>
            <p className="mt-1 text-muted-foreground">{accessWindow.message}</p>
            {accessWindow.active && (
              <p className="mt-1 text-xs text-muted-foreground">
                Cota: {accessWindow.quotaUsed}/{accessWindow.quotaMax} aulas novas usadas nesta sessão
                {accessWindow.quotaRemaining > 0 ? ` · restam ${accessWindow.quotaRemaining}` : ""}.
              </p>
            )}
          </div>
        )}

        {lesson.needsRewatch && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-200">Reassinatura necessária</p>
            <p className="mt-1 text-muted-foreground">
              A média da unidade{lesson.unitScore != null ? ` ficou em ${Math.round(lesson.unitScore)}%` : ""} (mínimo 70%).
              Assista esta aula novamente para liberar um novo ciclo de tentativas nas atividades e no role play.
            </p>
          </div>
        )}

        {!lesson.needsRewatch && lesson.unitScore != null && (
          <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
            Média da unidade (atividades + role play):{" "}
            <span className={lesson.unitPassed ? "font-medium text-emerald-600" : "font-medium text-foreground"}>
              {Math.round(lesson.unitScore)}%
            </span>
            {lesson.unitPassed ? " · aprovada" : ""}
            {lesson.cycle != null && lesson.cycle > 1 ? ` · ciclo ${lesson.cycle}` : ""}
          </div>
        )}

        {activeItem.kind === "lesson" && contentLocked && (
          <Card className="space-y-3 border-amber-500/40 p-6">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 text-amber-600" />
              <div>
                <h2 className="font-display text-xl font-semibold">{lesson.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lesson.lockMessage || accessWindow?.message || "Esta aula ainda não está liberada."}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Você pode revisar aulas já concluídas a qualquer momento.
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeItem.kind === "lesson" && !contentLocked && (
          <>
          <VideoPlayer lesson={lesson} courseId={courseId} />
            <div>
              <h1 className="font-display text-2xl font-semibold md:text-3xl">{lesson.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatMinutes(lesson.durationMinutes)} · {course.title}
              </p>
              {(course.progressPercent ?? 0) >= 20 && (
                <div className="mt-3">
                  <CourseRatingControl course={course} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => complete.mutate()}
                disabled={lesson.completed || lesson.locked || complete.isPending}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {lesson.completed ? "Concluída" : "Marcar como concluída"}
              </Button>
              {next && (
                <Button variant="outline" className="gap-2" onClick={() => goItem(next)}>
                  Próximo <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}

        {activeItem.kind === "assessment" && (
          <InlineAssessment
            courseId={course.id}
            lessonId={lessonId}
            assessmentId={activeItem.id}
            onBack={() => navigate({
              to: "/courses/$courseId/lessons/$lessonId",
              params: { courseId: course.id, lessonId },
              search: { panel: sideTab },
            })}
            onAdvance={next ? () => goItem(next) : undefined}
          />
        )}

        {activeItem.kind === "roleplay" && (
          <InlineRoleplay
            scenarioId={activeItem.id}
            courseId={course.id}
            onDone={() => {
              qc.invalidateQueries({ queryKey: ["course", course.id] });
              qc.invalidateQueries({ queryKey: ["lesson", courseId, lessonId] });
              qc.invalidateQueries({ queryKey: ["ranking"] });
              void refreshUser();
            }}
            onAdvance={next ? () => goItem(next) : undefined}
          />
        )}

        {activeItem.kind === "lesson" && (
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">Visão geral</TabsTrigger>
              <TabsTrigger value="resources">Materiais</TabsTrigger>
              <TabsTrigger value="notes">Anotações</TabsTrigger>
              <TabsTrigger value="comments">Comentários</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <Card className="space-y-3 p-6 text-sm leading-relaxed text-muted-foreground">
                <p className="font-display text-lg font-semibold text-foreground">{course.title}</p>
                <p>{lesson.description || course.shortDescription || "Sem descrição."}</p>
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="mt-4">
              <Card className="divide-y divide-border/60">
                {(lesson.resources ?? []).length === 0 ? (
                  <p className="p-6 text-sm text-muted-foreground">Nenhum material nesta aula.</p>
                ) : (
                  (lesson.resources ?? []).map((r) => (
                    <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 transition hover:bg-accent/40">
                      {r.type === "pdf" ? <FileText className="h-4 w-4 text-primary" /> : <LinkIcon className="h-4 w-4 text-primary" />}
                      <span className="flex-1 text-sm">{r.label}</span>
                      {r.type === "pdf" ? <Download className="h-4 w-4 text-muted-foreground" /> : <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    </a>
                  ))
                )}
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
              <LessonComments courseId={courseId} lessonId={lessonId} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {sidebarOpen && (
        <aside className="min-w-0 border-l border-border/60 bg-card/40">
          <div className="sticky top-0 flex h-[calc(100vh-1rem)] flex-col">
            <div className="flex border-b border-border/60">
              <button
                type="button"
                onClick={() => setSideTab("content")}
                className={`flex-1 px-3 py-3 text-sm font-medium ${sideTab === "content" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}
              >
                Conteúdo do curso
              </button>
              <button
                type="button"
                onClick={() => setSideTab("ai")}
                className={`flex flex-1 items-center justify-center gap-1 px-3 py-3 text-sm font-medium ${sideTab === "ai" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}
              >
                <Sparkles className="h-3.5 w-3.5" /> Assistente IA
              </button>
            </div>

            {sideTab === "content" ? (
              <CourseCurriculum
                course={course}
                activeLessonId={lesson.id}
                activeItem={activeItem}
                onSelect={goItem}
              />
            ) : (
              <CourseAiAssistant course={course} lesson={lesson} />
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

function CourseCurriculum({
  course,
  activeLessonId,
  activeItem,
  onSelect,
}: {
  course: Course;
  activeLessonId: string;
  activeItem: { kind: string; id: string };
  onSelect: (item: CurriculumItem) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="border-b border-border/60 p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Curso</p>
        <p className="mt-1 truncate font-medium">{course.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{course.progressPercent}% concluído</p>
      </div>
      {course.modules.map((m, mi) => {
        const items: CurriculumItem[] =
          m.curriculum ??
          m.lessons.map((l) => ({
            kind: "lesson" as const,
            id: l.id,
            title: l.title,
            order: l.order,
            durationMinutes: l.durationMinutes,
            completed: l.completed,
            locked: l.locked,
          }));
        const done = items.filter((i) => i.completed).length;
        const mins = items.reduce((s, i) => s + (i.durationMinutes ?? 0), 0);
        const roleplays = items.filter((i) => i.kind === "roleplay").length;
        const assessments = items.filter((i) => i.kind === "assessment").length;
        return (
          <div key={m.id}>
            <div className="border-b border-border/40 bg-muted/30 px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Seção {mi + 1} — {m.title}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {done} / {items.length} · {mins}m
                {assessments > 0 ? ` · ${assessments} atividade(s)` : ""}
                {roleplays > 0 ? ` · ${roleplays} role play` : ""}
              </p>
            </div>
            <ul>
              {items.map((it) => {
                const active =
                  (it.kind === "lesson" && it.id === activeLessonId && activeItem.kind === "lesson") ||
                  (it.kind === activeItem.kind && it.id === activeItem.id);
                return (
                  <li key={`${it.kind}_${it.id}`}>
                    <button
                      type="button"
                      disabled={it.locked}
                      onClick={() => onSelect(it)}
                      className={`flex w-full items-center gap-2 border-b border-border/30 px-4 py-2.5 text-left text-sm transition-colors ${
                        active ? "bg-primary/10 text-primary" : "hover:bg-accent/40"
                      } ${it.locked ? "opacity-60" : ""}`}
                    >
                      {it.locked ? (
                        <Lock className="h-3.5 w-3.5 shrink-0" />
                      ) : it.needsRewatch ? (
                        <RefreshCw className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                      ) : it.completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                      ) : it.kind === "assessment" ? (
                        <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                      ) : it.kind === "roleplay" ? (
                        <MessageCircleMore className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      ) : (
                        <Square className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{it.title}</span>
                        {it.kind === "lesson" && it.needsRewatch && (
                          <span className="block text-[10px] font-medium uppercase tracking-wide text-amber-600">
                            Reassistir
                            {it.unitScore != null ? ` · média ${Math.round(it.unitScore)}%` : ""}
                          </span>
                        )}
                        {it.kind === "lesson" && !it.needsRewatch && it.unitScore != null && (
                          <span className="block text-[10px] text-muted-foreground">
                            Unidade {Math.round(it.unitScore)}%
                            {it.unitPassed ? " · ok" : ""}
                          </span>
                        )}
                      </span>
                      {it.kind !== "lesson" && (
                        <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                          {it.kind === "assessment" ? "Atividade" : "Role play"}
                        </span>
                      )}
                      {it.durationMinutes != null && it.durationMinutes > 0 && (
                        <span className="shrink-0 text-xs text-muted-foreground">{it.durationMinutes}m</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function VideoPlayer({ lesson, courseId }: { lesson: Lesson; courseId: string }) {
  const videos = lesson.videos?.length
    ? lesson.videos
    : lesson.videoUrl
      ? [{ id: "0", title: lesson.title, url: lesson.videoUrl, provider: (lesson.videoProvider || "youtube") as "youtube" | "private", durationMinutes: lesson.durationMinutes, order: 0 }]
      : [];
  const [idx, setIdx] = useState(0);
  const current = videos[idx];
  const sessionRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { setUser } = useAuth();

  const ping = useCallback(async (origin: "presence" | "youtube" | "private") => {
    try {
      const res = await coursesService.studyHeartbeat({
        lessonId: lesson.id,
        courseId,
        sessionId: sessionRef.current,
        origin,
      });
      if (res.sessionId != null) sessionRef.current = res.sessionId;
      if (typeof res.totalMinutes === "number") {
        const session = authService.getSession();
        if (session?.user) {
          setUser({ ...session.user, totalStudyMinutes: res.totalMinutes });
        }
      }
    } catch {
      // silencioso — não interrompe o player
    }
  }, [lesson.id, courseId, setUser]);

  useEffect(() => {
    sessionRef.current = null;
    const tick = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      const provider = current?.provider || "youtube";
      if (provider === "private") {
        const el = videoRef.current;
        if (!el || el.paused || el.ended) return;
        void ping("private");
        return;
      }
      void ping("presence");
    };
    tick();
    const id = window.setInterval(tick, 30000);
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [lesson.id, current?.id, current?.provider, ping]);

  if (!current) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 text-sm text-muted-foreground">
        Esta aula não tem vídeo — confira a descrição e os materiais abaixo.
      </div>
    );
  }

  const provider = current.provider || "youtube";
  const embed = provider === "youtube" ? youtubeEmbedSrc(current.url) : null;

  return (
    <div className="space-y-2">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-black shadow-elegant">
        {provider === "youtube" && embed ? (
          <iframe
            src={embed}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : provider === "private" ? (
          <video
            ref={videoRef}
            src={current.url}
            controls
            className="h-full w-full"
            onPlay={() => void ping("private")}
          />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center text-sm text-white/80">
            Não foi possível carregar este vídeo. Verifique o link no painel (cole o URL completo do YouTube).
          </div>
        )}
      </div>
      {videos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((v, i) => (
            <Button key={v.id} size="sm" variant={i === idx ? "default" : "outline"} onClick={() => setIdx(i)} className="gap-1">
              <PlayCircle className="h-3.5 w-3.5" /> {v.title || `Vídeo ${i + 1}`}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonComments({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<LessonComment | null>(null);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", courseId, lessonId],
    queryFn: () => coursesService.listComments(courseId, lessonId),
  });

  const post = useMutation({
    mutationFn: () => coursesService.postComment(courseId, lessonId, text.trim(), replyTo?.id),
    onSuccess: () => {
      setText("");
      setReplyTo(null);
      qc.invalidateQueries({ queryKey: ["comments", courseId, lessonId] });
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível comentar."),
  });

  const del = useMutation({
    mutationFn: (id: string) => coursesService.deleteComment(courseId, lessonId, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments", courseId, lessonId] }),
    onError: (e: Error) => toast.error(e.message || "Não foi possível excluir."),
  });

  const roots = comments.filter((c) => !c.parentId);
  const repliesOf = (id: string) => comments.filter((c) => c.parentId === id);

  return (
    <Card className="space-y-4 p-4 md:p-6">
      <div className="space-y-2">
        {replyTo && (
          <p className="text-xs text-muted-foreground">
            Respondendo a {replyTo.authorName}.{" "}
            <button type="button" className="underline" onClick={() => setReplyTo(null)}>
              Cancelar
            </button>
          </p>
        )}
        <Textarea
          placeholder="Escreva um comentário para a turma…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[90px]"
          maxLength={2000}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            disabled={!text.trim() || post.isPending}
            onClick={() => post.mutate()}
            className="gap-1"
          >
            <Send className="h-3.5 w-3.5" /> Comentar
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando comentários…</p>
      ) : roots.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum comentário ainda. Seja o primeiro!</p>
      ) : (
        <ul className="space-y-4">
          {roots.map((c) => (
            <li key={c.id} className="border-b border-border/40 pb-3 last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">
                    {c.authorName}
                    {c.authorType === "staff" && (
                      <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase text-primary">
                        Equipe
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{c.text}</p>
                  <div className="mt-2 flex gap-3 text-xs">
                    <button type="button" className="text-primary hover:underline" onClick={() => setReplyTo(c)}>
                      Responder
                    </button>
                    {user?.id === c.authorId && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-destructive hover:underline"
                        onClick={() => del.mutate(c.id)}
                      >
                        <Trash2 className="h-3 w-3" /> Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {repliesOf(c.id).length > 0 && (
                <ul className="mt-3 space-y-3 border-l border-border/50 pl-4">
                  {repliesOf(c.id).map((r) => (
                    <li key={r.id}>
                      <p className="text-sm font-medium">
                        {r.authorName}
                        {r.authorType === "staff" && (
                          <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase text-primary">
                            Equipe
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{r.text}</p>
                      {user?.id === r.authorId && (
                        <button
                          type="button"
                          className="mt-1 inline-flex items-center gap-1 text-xs text-destructive hover:underline"
                          onClick={() => del.mutate(r.id)}
                        >
                          <Trash2 className="h-3 w-3" /> Excluir
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function CourseAiAssistant({ course, lesson }: { course: Course; lesson: Lesson }) {
  const [convId, setConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const suggestions = [
    `Resuma a aula "${lesson.title}"`,
    `Quais pontos principais de ${course.title}?`,
    "Explique o conteúdo de forma simples",
    "O que revisar antes da próxima atividade?",
  ];

  const ensureConv = async () => {
    if (convId) return convId;
    const c = await aiService.createConversation(`${course.title} — ${lesson.title}`, {
      courseId: course.id,
      lessonId: lesson.id,
    });
    setConvId(c.id);
    return c.id;
  };

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    try {
      const id = await ensureConv();
      const reply = await aiService.sendMessage(id, content, {
        courseId: course.id,
        lessonId: lesson.id,
      });
      setMessages((m) => [...m, { role: "assistant", content: reply.content }]);
    } catch {
      toast.error("Assistente indisponível no momento.");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="space-y-2 border-b border-border/60 p-4">
        <h3 className="font-display text-lg font-semibold">Dúvidas sobre este curso?</h3>
        <p className="text-xs text-muted-foreground">
          O assistente pode cometer erros. Confira as informações. Sujeito à configuração de IA da escola.
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 &&
          suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="block w-full rounded-xl border border-border/60 bg-background px-3 py-3 text-left text-sm hover:bg-accent/40"
            >
              {s}
            </button>
          ))}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "ml-6 bg-primary/10" : "mr-6 bg-muted"}`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 p-3">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fazer uma pergunta"
            disabled={busy}
          />
          <Button type="submit" size="icon" disabled={busy || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
