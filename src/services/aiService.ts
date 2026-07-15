import type { ChatConversation, ChatMessage } from "@/types";
import { delay } from "./http";
import { mockConversations } from "./mocks/data";

// Prepared for future OpenAI/backend integration.
export const aiService = {
  async listConversations(): Promise<ChatConversation[]> {
    await delay(200);
    return structuredClone(mockConversations);
  },
  async createConversation(title = "Nova conversa"): Promise<ChatConversation> {
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
  async sendMessage(conversationId: string, content: string): Promise<ChatMessage> {
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
      content: buildMockAnswer(content),
      createdAt: new Date().toISOString(),
    };
    if (conv) {
      conv.messages.push(userMsg, assistantMsg);
      conv.updatedAt = new Date().toISOString();
    }
    return assistantMsg;
  },
};

function buildMockAnswer(q: string) {
  const trimmed = q.trim();
  return `Ótima pergunta sobre **"${trimmed.slice(0, 60)}${trimmed.length > 60 ? "..." : ""}"**.\n\nAqui vai uma explicação didática:\n\n1. **Conceito central** — comece entendendo o problema em si.\n2. **Exemplo prático** — pense num caso do seu dia a dia.\n3. **Próximo passo** — tente aplicar o conceito em um exercício.\n\nQuer que eu gere um **exercício** ou um **resumo em tópicos** sobre isso?`;
}
