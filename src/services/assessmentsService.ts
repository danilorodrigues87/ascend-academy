import type { Assessment, AssessmentResult } from "@/types";
import { delay } from "./http";
import { mockAssessments } from "./mocks/data";

export const assessmentsService = {
  async list(): Promise<Assessment[]> {
    await delay(300);
    return structuredClone(mockAssessments);
  },
  async getById(id: string): Promise<Assessment | null> {
    await delay(200);
    return mockAssessments.find((a) => a.id === id) ?? null;
  },
  async submit(assessmentId: string, answers: Record<string, string>): Promise<AssessmentResult> {
    await delay(900);
    const asm = mockAssessments.find((a) => a.id === assessmentId);
    const total = asm?.questions.length ?? 1;
    const answered = Object.keys(answers).length;
    const score = Math.round((answered / total) * 90 + 5);
    return {
      id: "res_" + Date.now(),
      assessmentId,
      score,
      feedback:
        "Bom trabalho! Você demonstrou domínio dos conceitos centrais. Reforce práticas de pesquisa com usuários para elevar seu resultado.",
      strengths: ["Clareza na comunicação", "Aplicação dos princípios de UX"],
      improvements: ["Aprofundar em métricas de sucesso", "Praticar entrevistas semi-estruturadas"],
      competencies: [
        { name: "Pensamento crítico", score: 82 },
        { name: "Comunicação", score: 90 },
        { name: "Design centrado no usuário", score: 78 },
      ],
      submittedAt: new Date().toISOString(),
    };
  },
};
