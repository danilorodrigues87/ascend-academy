import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { toast } from "sonner";
import { useState } from "react";
import type { Course } from "@/types";

/** Exibe média pública (só se houver avaliações). */
export function CourseRatingBadge({
  rating,
  ratingCount,
  className = "",
}: {
  rating: number;
  ratingCount: number;
  className?: string;
}) {
  if (!ratingCount || ratingCount <= 0) return null;
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur ${className}`}
    >
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      {rating.toFixed(1)}
      <span className="text-white/70">({ratingCount})</span>
    </div>
  );
}

/** Controle interativo 1–5 para o aluno avaliar o curso. */
export function CourseRatingControl({ course }: { course: Course }) {
  const qc = useQueryClient();
  const [hover, setHover] = useState(0);
  const current = course.myRating ?? 0;

  const mut = useMutation({
    mutationFn: (rating: number) => coursesService.rateCourse(course.id, rating),
    onSuccess: (res) => {
      toast.success(res.message || "Avaliação salva");
      qc.invalidateQueries({ queryKey: ["courses"] });
      qc.invalidateQueries({ queryKey: ["course", course.id] });
      qc.invalidateQueries({ queryKey: ["lesson"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível avaliar"),
  });

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground">Sua avaliação:</span>
      <div className="flex items-center gap-0.5" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const active = (hover || current) >= n;
          return (
            <button
              key={n}
              type="button"
              disabled={mut.isPending}
              aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
              className="rounded p-0.5 transition hover:scale-110 disabled:opacity-50"
              onMouseEnter={() => setHover(n)}
              onClick={() => mut.mutate(n)}
            >
              <Star
                className={`h-5 w-5 ${active ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}`}
              />
            </button>
          );
        })}
      </div>
      {course.ratingCount > 0 && (
        <span className="text-xs text-muted-foreground">
          Média {course.rating.toFixed(1)} · {course.ratingCount}{" "}
          {course.ratingCount === 1 ? "avaliação" : "avaliações"}
        </span>
      )}
    </div>
  );
}
