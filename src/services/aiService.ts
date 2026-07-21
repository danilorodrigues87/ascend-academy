import type { ChatConversation, ChatMessage } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockConversations } from "./mocks/data";

export const aiService = {
  async listConversations(): Promise<ChatConversation[]> {
    if (USE_API) {
      return http.get<ChatConversation[]>("/ai/conversations");
    }
    await delay(200);
    return structuredClone(mockConversations);
  },
  async createConversation(
    title = "Nova conversa",
    meta?: { courseId?: string; lessonId?: string },
  ): Promise<ChatConversation> {
    if (USE_API) {
      return http.post<ChatConversation>("/ai/conversations", {
        title,
        courseId: meta?.courseId,
        lessonId: meta?.lessonId,
      });
    }
    await delay(150);
    const conv: ChatConversation = {
      id: "conv_" + Date.now(),
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    mockConversations.unshift(conv);
    return structuredClone(conv);
  },
  async sendMessage(
    conversationId: string,
    content: string,
    meta?: { courseId?: string; lessonId?: string },
  ): Promise<ChatMessage> {
    if (USE_API) {
      return http.post<ChatMessage>(
        `/ai/conversations/${encodeURIComponent(conversationId)}/messages`,
        { content, courseId: meta?.courseId, lessonId: meta?.lessonId },
      );
    }
    await delay(900);
    const conv = mockConversations.find((c) => c.id === conversationId);
    const userMsg: ChatMessage = {
      id: "m_" + Date.now(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    const assistantMsg: ChatMessage = {
      id: "m_" + (Date.now() + 1),
      role: "assistant",
      content: `Resposta simulada sobre "${content.slice(0, 60)}".`,
      createdAt: new Date().toISOString(),
    };
    if (conv) {
      conv.messages.push(userMsg, assistantMsg);
      conv.updatedAt = new Date().toISOString();
    }
    return assistantMsg;
  },
};
