import type { Course, DashboardSummary, Lesson } from "@/types";
import { delay } from "./http";
import { mockAchievements, mockCourses, mockNotifications, mockRanking, mockUser } from "./mocks/data";

export const coursesService = {
  async list(): Promise<Course[]> {
    await delay(350);
    return structuredClone(mockCourses);
  },
  async getById(id: string): Promise<Course | null> {
    await delay(300);
    const c = mockCourses.find((c) => c.id === id || c.slug === id);
    return c ? structuredClone(c) : null;
  },
  async getLesson(courseId: string, lessonId: string): Promise<{ course: Course; lesson: Lesson } | null> {
    await delay(250);
    const course = mockCourses.find((c) => c.id === courseId || c.slug === courseId);
    if (!course) return null;
    for (const m of course.modules) {
      const l = m.lessons.find((l) => l.id === lessonId);
      if (l) return structuredClone({ course, lesson: l });
    }
    return null;
  },
  async markLessonCompleted(courseId: string, lessonId: string): Promise<void> {
    await delay(200);
    const c = mockCourses.find((c) => c.id === courseId);
    if (!c) return;
    for (const m of c.modules) {
      const l = m.lessons.find((l) => l.id === lessonId);
      if (l) l.completed = true;
    }
  },
  async getDashboard(): Promise<DashboardSummary> {
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
