import { n as delay, r as http, t as USE_API } from "./http-BO5E21SS.js";
import { i as mockConversations } from "./data-gIza-OcL.js";
//#region src/services/aiService.ts
var aiService = {
	async listConversations() {
		if (USE_API) return http.get("/ai/conversations");
		await delay(200);
		return structuredClone(mockConversations);
	},
	async createConversation(title = "Nova conversa", meta) {
		if (USE_API) return http.post("/ai/conversations", {
			title,
			courseId: meta?.courseId,
			lessonId: meta?.lessonId
		});
		await delay(150);
		const conv = {
			id: "conv_" + Date.now(),
			title,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			messages: []
		};
		mockConversations.unshift(conv);
		return structuredClone(conv);
	},
	async sendMessage(conversationId, content, meta) {
		if (USE_API) return http.post(`/ai/conversations/${encodeURIComponent(conversationId)}/messages`, {
			content,
			courseId: meta?.courseId,
			lessonId: meta?.lessonId
		});
		await delay(900);
		const conv = mockConversations.find((c) => c.id === conversationId);
		const userMsg = {
			id: "m_" + Date.now(),
			role: "user",
			content,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const assistantMsg = {
			id: "m_" + (Date.now() + 1),
			role: "assistant",
			content: `Resposta simulada sobre "${content.slice(0, 60)}".`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (conv) {
			conv.messages.push(userMsg, assistantMsg);
			conv.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		}
		return assistantMsg;
	}
};
//#endregion
export { aiService as t };
