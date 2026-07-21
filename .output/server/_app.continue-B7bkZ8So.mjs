import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { J as CirclePlay } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { t as Progress } from "./_ssr/progress-DOIEKRJF.mjs";
import { t as coursesService } from "./_ssr/coursesService-DXN4SuWd.mjs";
import { n as resolveContinueLesson, t as continueLabel } from "./_ssr/continueLesson-VGpi5kJW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.continue-B7bkZ8So.js
var import_jsx_runtime = require_jsx_runtime();
function ContinuePage() {
	const { data: courses = [], isLoading, isError } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const list = courses.filter((c) => c.enrolled && c.progressPercent < 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-semibold",
			children: "Continuar estudando"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Retome ou comece seus cursos matriculados."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: isLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-xl" }, i)) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-10 text-center text-muted-foreground",
				children: "Não foi possível carregar os cursos. Tente novamente."
			}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-10 text-center text-muted-foreground",
				children: "Nenhum curso disponível. Confira se há matrícula ativa e curso publicado."
			}) : list.map((c) => {
				const lesson = resolveContinueLesson(c);
				const label = continueLabel(c);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-4 overflow-hidden p-0 md:flex-row",
					children: [c.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.coverUrl,
						alt: "",
						className: "h-40 w-full object-cover md:h-auto md:w-64"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary/70 to-muted md:h-auto md:w-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl text-primary-foreground/90",
							children: c.title.charAt(0)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-3 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: c.categories[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold text-balance",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
									children: c.shortDescription
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Progresso"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [c.progressPercent, "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: c.progressPercent,
								className: "mt-1 h-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex gap-2",
								children: [lesson && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "gap-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/courses/$courseId/lessons/$lessonId",
										params: {
											courseId: c.id,
											lessonId: lesson.id
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }),
											" ",
											label
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/courses/$courseId",
										params: { courseId: c.id },
										children: "Ver curso"
									})
								})]
							})
						]
					})]
				}, c.id);
			})
		})]
	});
}
//#endregion
export { ContinuePage as component };
