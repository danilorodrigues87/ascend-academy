import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { g as Search } from "./_libs/lucide-react.mjs";
import { t as coursesService } from "./_ssr/coursesService-DXN4SuWd.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./_ssr/tabs-CCJRliUM.mjs";
import { t as CourseCard } from "./_ssr/CourseCard-hBq-YhYx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.courses.index-CNsc84eb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursesPage() {
	const { data: courses = [], isLoading } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Meus Cursos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Todos os cursos em que você está matriculado."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar por curso ou professor...",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: filter,
					onValueChange: (v) => setFilter(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "all",
							children: "Todos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "inProgress",
							children: "Em andamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "notStarted",
							children: "Não iniciados"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "completed",
							children: "Concluídos"
						})
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: isLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-xl" }, i)) : filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
			}),
			!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed p-12 text-center text-muted-foreground",
				children: "Nenhum curso encontrado com os filtros aplicados."
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
