import type { Course, Lesson } from "@/types";

/** Resolve aula para Continuar / Começar (mesmo com 0% de progresso). */
export function resolveContinueLesson(course: Course): Lesson | null {
  const flat = course.modules.flatMap((m) => m.lessons);
  if (!flat.length) return null;

  if (course.lastAccessedLessonId) {
    const found = flat.find((l) => l.id === course.lastAccessedLessonId);
    if (found) return found;
  }

  // locked do admin ainda não implementa sequência no portal — não bloquear "Começar"
  return flat.find((l) => !l.completed) ?? flat[0] ?? null;
}

export function continueLabel(course: Course): "Começar" | "Continuar" {
  return course.progressPercent > 0 ? "Continuar" : "Começar";
}
