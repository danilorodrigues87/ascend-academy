import { n as resolveContinueLesson, t as continueLabel } from "./continueLesson-VGpi5kJW.js";
import { t as Button } from "./button-DRsC1qZi.js";
import { t as Progress } from "./progress-Crx1Tb8I.js";
import { t as Card } from "./card-BLWafi8D.js";
import { t as Badge } from "./badge-Cc0IblCb.js";
import { t as CourseRatingBadge } from "./CourseRating-D8Jitk1D.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Clock, Layers, PlayCircle } from "lucide-react";
//#region src/components/common/CourseCard.tsx
function Cover({ course }) {
	if (course.coverUrl) return /* @__PURE__ */ jsx("img", {
		src: course.coverUrl,
		alt: course.title,
		className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
		loading: "lazy"
	});
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 via-primary/50 to-muted",
		children: /* @__PURE__ */ jsx("span", {
			className: "font-display text-5xl font-semibold text-primary-foreground/90",
			children: course.title.trim().charAt(0).toUpperCase() || "C"
		})
	});
}
function CourseCard({ course, variant = "default" }) {
	const lesson = resolveContinueLesson(course);
	const label = continueLabel(course);
	return /* @__PURE__ */ jsxs(Card, {
		className: "group relative overflow-hidden border-border/60 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: lesson ? "/courses/$courseId/lessons/$lessonId" : "/courses/$courseId",
			params: lesson ? {
				courseId: course.id,
				lessonId: lesson.id
			} : { courseId: course.id },
			search: lesson ? { panel: "content" } : void 0,
			className: "block",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative aspect-[16/10] overflow-hidden",
				children: [
					/* @__PURE__ */ jsx(Cover, { course }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute left-3 top-3 flex gap-2",
						children: /* @__PURE__ */ jsx(Badge, {
							variant: "secondary",
							className: "backdrop-blur",
							children: course.level
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute right-3 top-3",
						children: /* @__PURE__ */ jsx(CourseRatingBadge, {
							rating: course.rating,
							ratingCount: course.ratingCount
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-x-3 bottom-3",
						children: /* @__PURE__ */ jsx("h3", {
							className: "font-display text-lg font-semibold leading-tight text-white text-balance line-clamp-2",
							children: course.title
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3 p-4",
				children: [
					variant !== "compact" && /* @__PURE__ */ jsx("p", {
						className: "line-clamp-2 text-sm text-muted-foreground",
						children: course.shortDescription
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
									" ",
									course.workloadHours,
									"h"
								]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(Layers, { className: "h-3.5 w-3.5" }),
									" ",
									course.modulesCount,
									" módulos"
								]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx(PlayCircle, { className: "h-3.5 w-3.5" }),
									" ",
									course.lessonsCount,
									" aulas"
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Progresso"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-medium",
								children: [course.progressPercent, "%"]
							})]
						}), /* @__PURE__ */ jsx(Progress, {
							value: course.progressPercent,
							className: "h-1.5"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex gap-2 border-t border-border/60 bg-muted/30 p-3",
			children: [lesson ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				size: "sm",
				className: "flex-1 gap-1",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/courses/$courseId/lessons/$lessonId",
					params: {
						courseId: course.id,
						lessonId: lesson.id
					},
					search: { panel: "content" },
					children: [
						/* @__PURE__ */ jsx(PlayCircle, { className: "h-4 w-4" }),
						" ",
						label
					]
				})
			}) : /* @__PURE__ */ jsx(Button, {
				asChild: true,
				size: "sm",
				className: "flex-1 gap-1",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/courses/$courseId",
					params: { courseId: course.id },
					children: [/* @__PURE__ */ jsx(PlayCircle, { className: "h-4 w-4" }), " Abrir"]
				})
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				className: "flex-1",
				children: /* @__PURE__ */ jsx(Link, {
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
