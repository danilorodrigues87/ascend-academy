import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Clock, Layers, PlayCircle } from "lucide-react";
import type { Course } from "@/types";
import { continueLabel, resolveContinueLesson } from "@/utils/continueLesson";
import { CourseRatingBadge } from "@/components/common/CourseRating";

function Cover({ course }: { course: Course }) {
  if (course.coverUrl) {
    return (
      <img
        src={course.coverUrl}
        alt={course.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    );
  }
  const initial = course.title.trim().charAt(0).toUpperCase() || "C";
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 via-primary/50 to-muted">
      <span className="font-display text-5xl font-semibold text-primary-foreground/90">{initial}</span>
    </div>
  );
}

export function CourseCard({ course, variant = "default" }: { course: Course; variant?: "default" | "compact" }) {
  const lesson = resolveContinueLesson(course);
  const label = continueLabel(course);

  return (
    <Card className="group relative overflow-hidden border-border/60 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <Link
        to={lesson ? "/courses/$courseId/lessons/$lessonId" : "/courses/$courseId"}
        params={lesson ? { courseId: course.id, lessonId: lesson.id } : { courseId: course.id }}
        search={lesson ? { panel: "content" } : undefined}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Cover course={course} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="secondary" className="backdrop-blur">
              {course.level}
            </Badge>
          </div>
          <div className="absolute right-3 top-3">
            <CourseRatingBadge rating={course.rating} ratingCount={course.ratingCount} />
          </div>
          <div className="absolute inset-x-3 bottom-3">
            <h3 className="font-display text-lg font-semibold leading-tight text-white text-balance line-clamp-2">
              {course.title}
            </h3>
          </div>
        </div>

        <div className="space-y-3 p-4">
          {variant !== "compact" && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{course.shortDescription}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.workloadHours}h
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" /> {course.modulesCount} módulos
            </span>
            <span className="inline-flex items-center gap-1">
              <PlayCircle className="h-3.5 w-3.5" /> {course.lessonsCount} aulas
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{course.progressPercent}%</span>
            </div>
            <Progress value={course.progressPercent} className="h-1.5" />
          </div>
        </div>
      </Link>
      <div className="flex gap-2 border-t border-border/60 bg-muted/30 p-3">
        {lesson ? (
          <Button asChild size="sm" className="flex-1 gap-1">
            <Link
              to="/courses/$courseId/lessons/$lessonId"
              params={{ courseId: course.id, lessonId: lesson.id }}
              search={{ panel: "content" }}
            >
              <PlayCircle className="h-4 w-4" /> {label}
            </Link>
          </Button>
        ) : (
          <Button asChild size="sm" className="flex-1 gap-1">
            <Link to="/courses/$courseId" params={{ courseId: course.id }}>
              <PlayCircle className="h-4 w-4" /> Abrir
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link to="/courses/$courseId" params={{ courseId: course.id }}>
            Ver detalhes
          </Link>
        </Button>
      </div>
    </Card>
  );
}
