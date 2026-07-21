import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService, aiService } from "@/services";
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
  Send,
  Sparkles,
  Square,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatMinutes } from "@/utils/format";
import { youtubeEmbedSrc } from "@/utils/youtube";
import type { Course, CurriculumItem, Lesson } from "@/types";
import { InlineAssessment } from "@/components/course/InlineAssessment";
import { InlineRoleplay } from "@/components/course/InlineRoleplay";

type Search = { panel?: "content" | "ai"; item?: string };

export const Route = createFileRoute("/_app/courses/$courseId/lessons/$lessonId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    panel: s.panel === "ai" ? "ai" : "content",
    item: typeof s.item === "string" ? s.item : undefined,
  }),
  component: LessonPage,
  head: () => ({ meta: [{ title: "Aula â€” CTI Educacional" }] }),
});

function LessonPage() {
  const { courseId, lessonId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
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
        <p className="text-muted-foreground">NÃ£o foi possÃ­vel carregar a aula.</p>
        <p className="text-xs text-muted-foreground">Curso {courseId} Â· Aula {lessonId}</p>
        <Button asChild variant="outline">
          <Link to="/courses">Voltar aos cursos</Link>
        </Button>
      </div>
    );
  }

  const { course, lesson } = data;

  const goItem = (item: CurriculumItem) => {
    if (item.locked) return;
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
            {sidebarOpen ? "Ocultar" : "ConteÃºdo"}
          </Button>
        </div>

        {activeItem.kind === "lesson" && (
          <>
            <VideoPlayer lesson={lesson} />
            <div>
              <h1 className="font-display text-2xl font-semibold md:text-3xl">{lesson.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatMinutes(lesson.durationMinutes)} Â· {course.title}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => complete.mutate()} disabled={lesson.completed || complete.isPending} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {lesson.completed ? "ConcluÃ­da" : "Marcar como concluÃ­da"}
              </Button>
              {next && (
                <Button variant="outline" className="gap-2" onClick={() => goItem(next)}>
                  PrÃ³ximo <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}

        {activeItem.kind === "assessment" && (
          <InlineAssessment courseId={course.id} assessmentId={activeItem.id} onBack={() => navigate({
            to: "/courses/$courseId/lessons/$lessonId",
            params: { courseId: course.id, lessonId },
            search: { panel: sideTab },
          })} />
        )}

        {activeItem.kind === "roleplay" && (
          <InlineRoleplay
            scenarioId={activeItem.id}
            courseId={course.id}
            onDone={() => {
              qc.invalidateQueries({ queryKey: ["course", course.id] });
              qc.invalidateQueries({ queryKey: ["lesson", courseId, lessonId] });
              qc.invalidateQueries({ queryKey: ["ranking"] });
            }}
          />
        )}

        {activeItem.kind === "lesson" && (
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">VisÃ£o geral</TabsTrigger>
              <TabsTrigger value="resources">Materiais</TabsTrigger>
              <TabsTrigger value="notes">AnotaÃ§Ãµes</TabsTrigger>
              <TabsTrigger value="comments">ComentÃ¡rios</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <Card className="space-y-3 p-6 text-sm leading-relaxed text-muted-foreground">
                <p className="font-display text-lg font-semibold text-foreground">{course.title}</p>
                <p>{lesson.description || course.shortDescription || "Sem descriÃ§Ã£o."}</p>
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
                  placeholder="Suas anotaÃ§Ãµes desta aula (salvamento automÃ¡tico)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[180px] border-0 focus-visible:ring-0"
                />
              </Card>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <Card className="p-8 text-center text-sm text-muted-foreground">
                Em breve: comentÃ¡rios entre alunos e resposta do professor.
              </Card>
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
                ConteÃºdo do curso
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
        <p className="mt-1 text-xs text-muted-foreground">{course.progressPercent}% concluÃ­do</p>
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
                SeÃ§Ã£o {mi + 1} â€” {m.title}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {done} / {items.length} Â· {mins}m
                {assessments > 0 ? ` Â· ${assessments} atividade(s)` : ""}
                {roleplays > 0 ? ` Â· ${roleplays} role play` : ""}
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
                      ) : it.completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
                      ) : it.kind === "assessment" ? (
                        <ClipboardCheck className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                      ) : it.kind === "roleplay" ? (
                        <MessageCircleMore className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      ) : (
                        <Square className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="flex-1 truncate">{it.title}</span>
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

function VideoPlayer({ lesson }: { lesson: Lesson }) {
  const videos = lesson.videos?.length
    ? lesson.videos
    : lesson.videoUrl
      ? [{ id: "0", title: lesson.title, url: lesson.videoUrl, provider: (lesson.videoProvider || "youtube") as "youtube" | "private", durationMinutes: lesson.durationMinutes, order: 0 }]
      : [];
  const [idx, setIdx] = useState(0);
  const current = videos[idx];

  if (!current) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 text-sm text-muted-foreground">
        Esta aula nÃ£o tem vÃ­deo â€” confira a descriÃ§Ã£o e os materiais abaixo.
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
          <video src={current.url} controls className="h-full w-full" />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center text-sm text-white/80">
            NÃ£o foi possÃ­vel carregar este vÃ­deo. Verifique o link no painel (cole o URL completo do YouTube).
          </div>
        )}
      </div>
      {videos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((v, i) => (
            <Button key={v.id} size="sm" variant={i === idx ? "default" : "outline"} onClick={() => setIdx(i)} className="gap-1">
              <PlayCircle className="h-3.5 w-3.5" /> {v.title || `VÃ­deo ${i + 1}`}
            </Button>
          ))}
        </div>
      )}
    </div>
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
    "Explique o conteÃºdo de forma simples",
    "O que revisar antes da prÃ³xima atividade?",
  ];

  const ensureConv = async () => {
    if (convId) return convId;
    const c = await aiService.createConversation(`${course.title} â€” ${lesson.title}`, {
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
      toast.error("Assistente indisponÃ­vel no momento.");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="space-y-2 border-b border-border/60 p-4">
        <h3 className="font-display text-lg font-semibold">DÃºvidas sobre este curso?</h3>
        <p className="text-xs text-muted-foreground">
          O assistente pode cometer erros. Confira as informaÃ§Ãµes. Sujeito Ã  configuraÃ§Ã£o de IA da escola.
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
