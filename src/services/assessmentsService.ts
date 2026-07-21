import type { Assessment, AssessmentResult } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockAssessments } from "./mocks/data";

export type AnswerResult = {
  questionId: string;
  locked: boolean;
  correct: boolean | null;
  score: number | null;
  feedback?: string | null;
  answeredCount: number;
  totalQuestions: number;
  allAnswered: boolean;
  attempt?: Assessment["attempt"];
};

export const assessmentsService = {
  async list(): Promise<Assessment[]> {
    if (USE_API) {
      return http.get<Assessment[]>("/assessments");
    }
    await delay(300);
    return structuredClone(mockAssessments);
  },
  async getById(id: string): Promise<Assessment | null> {
    if (USE_API) {
      try {
        return await http.get<Assessment>(`/assessments/${encodeURIComponent(id)}`);
      } catch {
        return null;
      }
    }
    await delay(200);
    return mockAssessments.find((a) => a.id === id) ?? null;
  },
  async start(assessmentId: string): Promise<Assessment> {
    if (USE_API) {
      return http.post<Assessment>(`/assessments/${encodeURIComponent(assessmentId)}/start`, {});
    }
    await delay(100);
    const asm = mockAssessments.find((a) => a.id === assessmentId);
    if (!asm) throw new Error("Atividade não encontrada");
    return structuredClone(asm);
  },
  async answer(assessmentId: string, questionId: string, answer: string): Promise<AnswerResult> {
    if (USE_API) {
      return http.post<AnswerResult>(`/assessments/${encodeURIComponent(assessmentId)}/answer`, {
        questionId,
        answer,
      });
    }
    await delay(400);
    return {
      questionId,
      locked: true,
      correct: true,
      score: 100,
      feedback: "Correto (mock).",
      answeredCount: 1,
      totalQuestions: 1,
      allAnswered: true,
    };
  },
  async finalize(assessmentId: string): Promise<AssessmentResult> {
    if (USE_API) {
      return http.post<AssessmentResult>(`/assessments/${encodeURIComponent(assessmentId)}/finalize`, {});
    }
    await delay(500);
    return {
      id: "res_" + Date.now(),
      assessmentId,
      score: 80,
      feedback: "Atividade concluída (mock).",
      strengths: [],
      improvements: [],
      competencies: [{ name: "Conhecimento", score: 80 }],
      submittedAt: new Date().toISOString(),
      xpEarned: 50,
      passed: true,
    };
  },
  async submit(assessmentId: string, answers: Record<string, string>): Promise<AssessmentResult> {
    if (USE_API) {
      return http.post<AssessmentResult>(`/assessments/${encodeURIComponent(assessmentId)}/submit`, {
        answers,
      });
    }
    await delay(900);
    const asm = mockAssessments.find((a) => a.id === assessmentId);
    const total = asm?.questions.length ?? 1;
    const answered = Object.keys(answers).length;
    const score = Math.round((answered / total) * 90 + 5);
    return {
      id: "res_" + Date.now(),
      assessmentId,
      score,
      feedback: "Bom trabalho! (mock)",
      strengths: ["Clareza"],
      improvements: ["Praticar mais"],
      competencies: [{ name: "Conhecimento", score }],
      submittedAt: new Date().toISOString(),
      xpEarned: 40,
      passed: score >= 70,
    };
  },
};
