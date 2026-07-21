import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Layers, J as CirclePlay, W as Clock, d as Star } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { n as resolveContinueLesson, t as continueLabel } from "./continueLesson-VGpi5kJW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CourseCard-hBq-YhYx.js
var import_jsx_runtime = require_jsx_runtime();
function Cover({ course }) {
	if (course.coverUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: course.coverUrl,
		alt: course.title,
		className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
		loading: "lazy"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 via-primary/50 to-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-5xl font-semibold text-primary-foreground/90",
			children: course.title.trim().charAt(0).toUpperCase() || "C"
		})
	});
}
function CourseCard({ course, variant = "default" }) {
	const lesson = resolveContinueLesson(course);
	const label = continueLabel(course);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group relative overflow-hidden border-border/60 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: lesson ? "/courses/$courseId/lessons/$lessonId" : "/courses/$courseId",
			params: lesson ? {
				courseId: course.id,
				lessonId: lesson.id
			} : { courseId: course.id },
			search: lesson ? { panel: "content" } : void 0,
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/10] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, { course }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-3 top-3 flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "backdrop-blur",
							children: course.level
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }), (course.rating ?? 0).toFixed(1)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-3 bottom-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold leading-tight text-white text-balance line-clamp-2",
							children: course.title
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4",
				children: [
					variant !== "compact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 text-sm text-muted-foreground",
						children: course.shortDescription
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
									" ",
									course.workloadHours,
									"h"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }),
									" ",
									course.modulesCount,
									" módulos"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-3.5 w-3.5" }),
									" ",
									course.lessonsCount,
									" aulas"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Progresso"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [course.progressPercent, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: course.progressPercent,
							className: "h-1.5"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 border-t border-border/60 bg-muted/30 p-3",
			children: [lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				className: "flex-1 gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/courses/$courseId/lessons/$lessonId",
					params: {
						courseId: course.id,
						lessonId: lesson.id
					},
					search: { panel: "content" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }),
						" ",
						label
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				className: "flex-1 gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/courses/$courseId",
					params: { courseId: course.id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Abrir"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses/$courseId",
					params: { courseId: course.id },
					children: "Ver detalhes"
				})
			})]
		})]
	});
}
//#endregion
export { CourseCard as t };
