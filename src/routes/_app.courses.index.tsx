import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { CourseCard } from "@/components/common/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/courses/")({
  component: CoursesPage,
  head: () => ({ meta: [{ title: "Meus Cursos — CTI Educacional" }] }),
});

function CoursesPage() {
  const { data: courses = [], isLoading } = useQuery({
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
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="inProgress">Em andamento</TabsTrigger>
            <TabsTrigger value="notStarted">Não iniciados</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)
          : filtered.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
          Nenhum curso encontrado com os filtros aplicados.
        </div>
      )}
    </div>
  );
}
