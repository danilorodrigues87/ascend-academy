import { createFileRoute, redirect } from "@tanstack/react-router";
import { coursesService } from "@/services";
import { resolveContinueLesson } from "@/utils/continueLesson";

/** /courses/:id → abre a 1ª aula (ou lastAccessed). */
export const Route = createFileRoute("/_app/courses/$courseId/")({
  beforeLoad: async ({ params }) => {
    const course = await coursesService.getById(params.courseId);
    if (!course) {
      throw redirect({ to: "/courses" });
    }
    const lesson = resolveContinueLesson(course);
    if (!lesson) {
      throw redirect({ to: "/courses" });
    }
    throw redirect({
      to: "/courses/$courseId/lessons/$lessonId",
      params: { courseId: course.id, lessonId: lesson.id },
      search: { panel: "content" },
    });
  },
  component: () => null,
});
