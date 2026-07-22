import { n as delay, r as http, t as USE_API } from "./http-B1eFK7Op.js";
import { n as mockAssessments } from "./data-ebpVXPb2.js";
//#region src/services/assessmentsService.ts
var assessmentsService = {
	async list() {
		if (USE_API) return http.get("/assessments");
		await delay(300);
		return structuredClone(mockAssessments);
	},
	async getById(id) {
		if (USE_API) try {
			return await http.get(`/assessments/${encodeURIComponent(id)}`);
		} catch {
			return null;
		}
		await delay(200);
		return mockAssessments.find((a) => a.id === id) ?? null;
	},
	async start(assessmentId) {
		if (USE_API) return http.post(`/assessments/${encodeURIComponent(assessmentId)}/start`, {});
		await delay(100);
		const asm = mockAssessments.find((a) => a.id === assessmentId);
		if (!asm) throw new Error("Atividade não encontrada");
		return structuredClone(asm);
	},
	async answer(assessmentId, questionId, answer) {
		if (USE_API) return http.post(`/assessments/${encodeURIComponent(assessmentId)}/answer`, {
			questionId,
			answer
		});
		await delay(400);
		return {
			questionId,
			locked: true,
			correct: true,
			score: 100,
			feedback: "Correto (mock).",
			answeredCount: 1,
			totalQuestions: 1,
			allAnswered: true
		};
	},
	async finalize(assessmentId) {
		if (USE_API) return http.post(`/assessments/${encodeURIComponent(assessmentId)}/finalize`, {});
		await delay(500);
		return {
			id: "res_" + Date.now(),
			assessmentId,
			score: 80,
			feedback: "Atividade concluída (mock).",
			strengths: [],
			improvements: [],
			competencies: [{
				name: "Conhecimento",
				score: 80
			}],
			submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
			xpEarned: 50,
			passed: true
		};
	},
	async submit(assessmentId, answers) {
		if (USE_API) return http.post(`/assessments/${encodeURIComponent(assessmentId)}/submit`, { answers });
		await delay(900);
		const total = mockAssessments.find((a) => a.id === assessmentId)?.questions.length ?? 1;
		const answered = Object.keys(answers).length;
		const score = Math.round(answered / total * 90 + 5);
		return {
			id: "res_" + Date.now(),
			assessmentId,
			score,
			feedback: "Bom trabalho! (mock)",
			strengths: ["Clareza"],
			improvements: ["Praticar mais"],
			competencies: [{
				name: "Conhecimento",
				score
			}],
			submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
			xpEarned: 40,
			passed: score >= 70
		};
	}
};
//#endregion
export { assessmentsService as t };
