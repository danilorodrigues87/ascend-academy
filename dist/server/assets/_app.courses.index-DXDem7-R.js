import { t as coursesService } from "./coursesService-DFMfTh1S.js";
import { t as Skeleton } from "./skeleton-wE5XVTSu.js";
import { t as EmptyState } from "./EmptyState-CuuisWFT.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.js";
import { t as Input } from "./input-DicJzR9-.js";
import { t as CourseCard } from "./CourseCard-Dc4W2-hY.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Search } from "lucide-react";
//#region src/routes/_app.courses.index.tsx?tsr-split=component
function CoursesPage() {
	const { data: courses = [], isLoading, isError, refetch } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const [q, setQ] = useState("");
	const [filter, setFilter] = useState("all");
	const filtered = useMemo(() => {
		return courses.filter((c) => {
			if (q && !c.title.toLowerCase().includes(q.toLowerCase()) && !c.instructor.name.toLowerCase().includes(q.toLowerCase())) return false;
			if (filter === "inProgress") return c.progressPercent > 0 && c.progressPercent < 100;
			if (filter === "completed") return c.progressPercent >= 100;
			if (filter === "notStarted") return c.progressPercent === 0;
			return true;
		});
	}, [
		courses,
		q,
		filter
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-7xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Meus Cursos"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-muted-foreground",
				children: "Todos os cursos em que você está matriculado."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative w-full max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Buscar por curso ou professor...",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "w-full overflow-x-auto pb-1 sm:w-auto",
					children: /* @__PURE__ */ jsx(Tabs, {
						value: filter,
						onValueChange: (v) => setFilter(v),
						children: /* @__PURE__ */ jsxs(TabsList, {
							className: "inline-flex w-max min-w-full sm:min-w-0",
							children: [
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "all",
									children: "Todos"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "inProgress",
									children: "Em andamento"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "notStarted",
									children: "Não iniciados"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "completed",
									children: "Concluídos"
								})
							]
						})
					})
				})]
			}),
			isError ? /* @__PURE__ */ jsx(EmptyState, {
				icon: BookOpen,
				title: "Não foi possível carregar os cursos",
				description: "Verifique sua conexão e tente novamente. Se o problema continuar, fale com a escola.",
				onRetry: () => void refetch()
			}) : isLoading ? /* @__PURE__ */ jsx("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-80 rounded-xl" }, i))
			}) : courses.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				icon: BookOpen,
				title: "Nenhum curso disponível",
				description: "Assim que a escola matricular você em uma trilha com curso online publicado, ele aparece aqui."
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				icon: Search,
				title: "Nenhum curso encontrado",
				description: "Ajuste a busca ou os filtros para ver outros resultados."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: filtered.map((c) => /* @__PURE__ */ jsx(CourseCard, { course: c }, c.id))
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
