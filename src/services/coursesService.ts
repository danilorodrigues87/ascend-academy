import type { Course, DashboardSummary, Lesson, LessonComment } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockAchievements, mockCourses, mockNotifications, mockRanking, mockUser } from "./mocks/data";

export const coursesService = {
  async list(): Promise<Course[]> {
    if (USE_API) {
      return http.get<Course[]>("/courses");
    }
    await delay(350);
    return structuredClone(mockCourses);
  },
  async getById(id: string): Promise<Course | null> {
    if (USE_API) {
      try {
        return await http.get<Course>(`/courses/${encodeURIComponent(id)}`);
      } catch {
        return null;
      }
    }
    await delay(300);
    const c = mockCourses.find((c) => c.id === id || c.slug === id);
    return c ? structuredClone(c) : null;
  },
  async getLesson(courseId: string, lessonId: string): Promise<{ course: Course; lesson: Lesson } | null> {
    if (USE_API) {
      return http.get<{ course: Course; lesson: Lesson }>(
        `/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}`,
      );
    }
    await delay(250);
    const course = mockCourses.find((c) => c.id === courseId || c.slug === courseId);
    if (!course) return null;
    for (const m of course.modules) {
      const l = m.lessons.find((l) => l.id === lessonId);
      if (l) return structuredClone({ course, lesson: l });
    }
    return null;
  },
    async markLessonCompleted(courseId: string, lessonId: string): Promise<{ ok?: boolean; xpEarned?: number; message?: string; cycle?: number }> {
    if (USE_API) {
      return http.post(`/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/complete`);
    }
    await delay(200);
    const c = mockCourses.find((c) => c.id === courseId);
    if (!c) return { ok: true };
    for (const m of c.modules) {
      const l = m.lessons.find((l) => l.id === lessonId);
      if (l) l.completed = true;
    }
    return { ok: true };
  },

  async studyHeartbeat(payload: {
    lessonId: string;
    courseId?: string;
    sessionId?: number | null;
    origin?: "presence" | "youtube" | "private";
  }): Promise<{ ok?: boolean; totalMinutes?: number; sessionSeconds?: number; sessionId?: number | null }> {
    if (USE_API) {
      return http.post("/study/heartbeat", {
        lessonId: payload.lessonId,
        courseId: payload.courseId,
        sessionId: payload.sessionId ?? undefined,
        origin: payload.origin ?? "presence",
      });
    }
    return { ok: true, totalMinutes: mockUser.totalStudyMinutes, sessionSeconds: 0, sessionId: null };
  },

  async listComments(courseId: string, lessonId: string): Promise<LessonComment[]> {
    if (USE_API) {
      return http.get(`/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/comments`);
    }
    await delay(150);
    return [];
  },

  async postComment(
    courseId: string,
    lessonId: string,
    text: string,
    parentId?: string | null,
  ): Promise<{ ok?: boolean; comment?: LessonComment; message?: string }> {
    if (USE_API) {
      return http.post(`/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/comments`, {
        text,
        parentId: parentId ?? undefined,
      });
    }
    await delay(150);
    return {
      ok: true,
      comment: {
        id: String(Date.now()),
        parentId: parentId ?? null,
        authorId: mockUser.id,
        authorName: mockUser.name,
        authorType: "student",
        text,
        createdAt: new Date().toISOString(),
      },
    };
  },

  async deleteComment(courseId: string, lessonId: string, commentId: string): Promise<{ ok?: boolean }> {
    if (USE_API) {
      return http.post(
        `/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/comments/${encodeURIComponent(commentId)}/delete`,
      );
    }
    return { ok: true };
  },

  async rateCourse(
    courseId: string,
    rating: number,
    comment?: string,
  ): Promise<{ ok?: boolean; myRating?: number; rating?: number; ratingCount?: number; message?: string }> {
    if (USE_API) {
      return http.post(`/courses/${encodeURIComponent(courseId)}/rating`, {
        rating,
        comment: comment ?? "",
      });
    }
    await delay(200);
    const c = mockCourses.find((c) => c.id === courseId || c.slug === courseId);
    if (c) {
      c.myRating = rating;
      c.rating = rating;
      c.ratingCount = Math.max(1, c.ratingCount || 0);
    }
    return { ok: true, myRating: rating, rating, ratingCount: c?.ratingCount ?? 1, message: "Avaliação salva." };
  },

  async getDashboard(): Promise<DashboardSummary> {
    if (USE_API) {
      return http.get<DashboardSummary>("/dashboard");
    }
    await delay(400);
    const enrolled = mockCourses.filter((c) => c.enrolled);
    const current = enrolled.find((c) => c.progressPercent > 0 && c.progressPercent < 100) ?? enrolled[0];
    const overallProgress = Math.round(
      enrolled.reduce((sum, c) => sum + c.progressPercent, 0) / Math.max(enrolled.length, 1),
    );
    let continueLesson: DashboardSummary["continueLesson"] = null;
    if (current?.lastAccessedLessonId) {
      for (const m of current.modules) {
        const l = m.lessons.find((l) => l.id === current.lastAccessedLessonId);
        if (l) {
          continueLesson = { course: current, lesson: l };
          break;
        }
      }
    }
    return {
      coursesCount: enrolled.length,
      overallProgress,
      studyMinutes: mockUser.totalStudyMinutes,
      streakDays: mockUser.streakDays,
      currentCourse: current,
      continueLesson,
      recentCourses: enrolled.slice(0, 4),
      notifications: mockNotifications.slice(0, 4),
      achievements: mockAchievements,
      ranking: mockRanking,
      xp: mockUser.xp,
      level: mockUser.level,
      nextLevelXp: 6000,
    };
  },
};
