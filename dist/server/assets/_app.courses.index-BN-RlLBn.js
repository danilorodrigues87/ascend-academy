import { t as coursesService } from "./coursesService-By3p87WC.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as CourseCard } from "./CourseCard-hBq-YhYx.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
//#region src/routes/_app.courses.index.tsx?tsr-split=component
function CoursesPage() {
	const { data: courses = [], isLoading } = useQuery({
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
				}), /* @__PURE__ */ jsx(Tabs, {
					value: filter,
					onValueChange: (v) => setFilter(v),
					children: /* @__PURE__ */ jsxs(TabsList, { children: [
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
					] })
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: isLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-80 rounded-xl" }, i)) : filtered.map((c) => /* @__PURE__ */ jsx(CourseCard, { course: c }, c.id))
			}),
			!isLoading && filtered.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-dashed p-12 text-center text-muted-foreground",
				children: "Nenhum curso encontrado com os filtros aplicados."
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
