import { t as coursesService } from "./coursesService-CBuJL57Z.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";
//#region src/components/common/CourseRating.tsx
/** Exibe média pública (só se houver avaliações). */
function CourseRatingBadge({ rating, ratingCount, className = "" }) {
	if (!ratingCount || ratingCount <= 0) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: `inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur ${className}`,
		children: [
			/* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }),
			rating.toFixed(1),
			/* @__PURE__ */ jsxs("span", {
				className: "text-white/70",
				children: [
					"(",
					ratingCount,
					")"
				]
			})
		]
	});
}
/** Controle interativo 1–5 para o aluno avaliar o curso. */
function CourseRatingControl({ course }) {
	const qc = useQueryClient();
	const [hover, setHover] = useState(0);
	const current = course.myRating ?? 0;
	const mut = useMutation({
		mutationFn: (rating) => coursesService.rateCourse(course.id, rating),
		onSuccess: (res) => {
			toast.success(res.message || "Avaliação salva");
			qc.invalidateQueries({ queryKey: ["courses"] });
			qc.invalidateQueries({ queryKey: ["course", course.id] });
			qc.invalidateQueries({ queryKey: ["lesson"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (e) => toast.error(e.message || "Não foi possível avaliar")
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center gap-2 text-sm",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "Sua avaliação:"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-0.5",
				onMouseLeave: () => setHover(0),
				children: [
					1,
					2,
					3,
					4,
					5
				].map((n) => {
					const active = (hover || current) >= n;
					return /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: mut.isPending,
						"aria-label": `${n} estrela${n > 1 ? "s" : ""}`,
						className: "rounded p-0.5 transition hover:scale-110 disabled:opacity-50",
						onMouseEnter: () => setHover(n),
						onClick: () => mut.mutate(n),
						children: /* @__PURE__ */ jsx(Star, { className: `h-5 w-5 ${active ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}` })
					}, n);
				})
			}),
			course.ratingCount > 0 && /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-muted-foreground",
				children: [
					"Média ",
					course.rating.toFixed(1),
					" · ",
					course.ratingCount,
					" ",
					course.ratingCount === 1 ? "avaliação" : "avaliações"
				]
			})
		]
	});
}
//#endregion
export { CourseRatingControl as n, CourseRatingBadge as t };
