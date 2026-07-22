import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { CourseCard } from "@/components/common/CourseCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/courses/")({
  component: CoursesPage,
  head: () => ({ meta: [{ title: "Meus Cursos — CTI Educacional" }] }),
});

function CoursesPage() {
  const { data: courses = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesService.list(),
  });
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "inProgress" | "completed" | "notStarted">("all");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (q && !c.title.toLowerCase().includes(q.toLowerCase()) && !c.instructor.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (filter === "inProgress") return c.progressPercent > 0 && c.progressPercent < 100;
      if (filter === "completed") return c.progressPercent >= 100;
      if (filter === "notStarted") return c.progressPercent === 0;
      return true;
    });
  }, [courses, q, filter]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Meus Cursos</h1>
        <p className="mt-1 text-muted-foreground">Todos os cursos em que você está matriculado.</p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por curso ou professor..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="w-full overflow-x-auto pb-1 sm:w-auto">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList className="inline-flex w-max min-w-full sm:min-w-0">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="inProgress">Em andamento</TabsTrigger>
              <TabsTrigger value="notStarted">Não iniciados</TabsTrigger>
              <TabsTrigger value="completed">Concluídos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isError ? (
        <EmptyState
          icon={BookOpen}
          title="Não foi possível carregar os cursos"
          description="Verifique sua conexão e tente novamente. Se o problema continuar, fale com a escola."
          onRetry={() => void refetch()}
        />
      ) : isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhum curso disponível"
          description="Assim que a escola matricular você em uma trilha com curso online publicado, ele aparece aqui."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Nenhum curso encontrado"
          description="Ajuste a busca ou os filtros para ver outros resultados."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
