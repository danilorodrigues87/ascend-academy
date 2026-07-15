// Domain types for the EAD Portal.
// Structured to mirror what a REST API in PHP would return.

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  bio?: string;
  avatarUrl?: string;
  role: "student" | "admin";
  xp: number;
  level: number;
  streakDays: number;
  totalStudyMinutes: number;
  createdAt: string;
  firstAccess?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CourseInstructor {
  id: string;
  name: string;
  avatarUrl?: string;
  title?: string;
  bio?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  durationMinutes: number;
  videoUrl: string; // YouTube for now; swap to signed URL later
  videoProvider: "youtube" | "private";
  completed: boolean;
  locked: boolean;
  order: number;
  resources?: { id: string; label: string; url: string; type: "pdf" | "link" | "file" }[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  locked: boolean;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  coverUrl: string;
  bannerUrl: string;
  instructor: CourseInstructor;
  categories: string[];
  level: "Iniciante" | "Intermediário" | "Avançado";
  workloadHours: number;
  estimatedMinutes: number;
  rating: number;
  ratingCount: number;
  progressPercent: number;
  objectives: string[];
  modulesCount: number;
  lessonsCount: number;
  modules: Module[];
  enrolled: boolean;
  lastAccessedLessonId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "lesson" | "course" | "certificate" | "ai" | "system";
  createdAt: string;
  read: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  unlockedAt?: string;
  progress?: number;
  goal?: number;
}

export interface RankingEntry {
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  position: number;
  isCurrentUser?: boolean;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  workloadHours: number;
  pdfUrl?: string;
}

export type AssessmentQuestionType = "multiple" | "boolean" | "essay" | "roleplay";

export interface AssessmentQuestion {
  id: string;
  type: AssessmentQuestionType;
  prompt: string;
  options?: { id: string; label: string }[];
  correctAnswer?: string | boolean;
  roleplayCharacter?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationMinutes: number;
  attempts: number;
  bestScore?: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  competencies: { name: string; score: number }[];
  submittedAt: string;
}

// ---------------- Role Play Simulations ----------------

export type RolePlayDifficulty = "easy" | "medium" | "hard" | "expert";
export type RolePlayStatus = "pending" | "in_progress" | "approved" | "retry";

export interface RolePlayCriterion {
  key: string;
  label: string;
  description?: string;
}

export interface RolePlayScenario {
  id: string;
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
  title: string;
  theme: string;
  scenario: string;
  userRole: string;
  aiRole: string;
  aiCharacterName: string;
  aiCharacterAvatarUrl?: string;
  objectives: string[];
  criteria: RolePlayCriterion[];
  difficulty: RolePlayDifficulty;
  minScore: number;
  basePrompt: string;
  initialPersonality: string;
  initialMessage: string;
  estimatedMinutes: number;
}

export interface RolePlayMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  createdAt: string;
  typing?: boolean;
}

export interface RolePlayTimelineEvent {
  id: string;
  messageId: string;
  type: "success" | "error" | "opportunity" | "decision";
  title: string;
  detail: string;
}

export interface RolePlayCompetencyScore {
  key: string;
  label: string;
  score: number;
  comment?: string;
}

export interface RolePlayEvaluation {
  simulationId: string;
  overallScore: number;
  passed: boolean;
  summary: string;
  strengths: string[];
  improvements: string[];
  mistakes: string[];
  reviewTopics: string[];
  competencies: RolePlayCompetencyScore[];
  timeline: RolePlayTimelineEvent[];
  referenceConversation: RolePlayMessage[];
}

export interface RolePlaySimulation {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
  theme: string;
  difficulty: RolePlayDifficulty;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  messages: RolePlayMessage[];
  status: RolePlayStatus;
  score?: number;
  evaluation?: RolePlayEvaluation;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface DashboardSummary {
  coursesCount: number;
  overallProgress: number;
  studyMinutes: number;
  streakDays: number;
  currentCourse?: Course;
  continueLesson?: { course: Course; lesson: Lesson } | null;
  recentCourses: Course[];
  notifications: Notification[];
  achievements: Achievement[];
  ranking: RankingEntry[];
  xp: number;
  level: number;
  nextLevelXp: number;
}
