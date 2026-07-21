import type {
  RolePlayDifficulty,
  RolePlayMessage,
  RolePlayScenario,
  RolePlaySimulation,
} from "@/types";
import { delay, http, USE_API } from "./http";
import { mockRolePlayHistory, mockRolePlayScenarios } from "./mocks/rolePlayData";

const simulations = new Map<string, RolePlaySimulation>();

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const rolePlayService = {
  async listScenarios(): Promise<RolePlayScenario[]> {
    if (USE_API) {
      return http.get<RolePlayScenario[]>("/roleplay/scenarios");
    }
    await delay(250);
    return structuredClone(mockRolePlayScenarios);
  },

  async getScenario(id: string): Promise<RolePlayScenario | null> {
    if (USE_API) {
      try {
        return await http.get<RolePlayScenario>(`/roleplay/scenarios/${encodeURIComponent(id)}`);
      } catch {
        return null;
      }
    }
    await delay(200);
    return mockRolePlayScenarios.find((s) => s.id === id) ?? null;
  },

  async listHistory(): Promise<RolePlaySimulation[]> {
    if (USE_API) {
      return http.get<RolePlaySimulation[]>("/roleplay/history");
    }
    await delay(250);
    const persisted = Array.from(simulations.values()).filter((s) => s.status !== "in_progress");
    return [...persisted, ...structuredClone(mockRolePlayHistory)].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );
  },

  async startSimulation(scenarioId: string, difficulty: RolePlayDifficulty): Promise<RolePlaySimulation> {
    if (USE_API) {
      return http.post<RolePlaySimulation>("/roleplay/simulations", { scenarioId, difficulty });
    }
    await delay(400);
    const scenario = mockRolePlayScenarios.find((s) => s.id === scenarioId);
    if (!scenario) throw new Error("Cenário não encontrado");
    const sim: RolePlaySimulation = {
      id: uid("sim"),
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      courseId: scenario.courseId,
      courseTitle: scenario.courseTitle,
      moduleTitle: scenario.moduleTitle,
      theme: scenario.theme,
      difficulty,
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      status: "in_progress",
      messages: [
        {
          id: uid("m"),
          role: "ai",
          content: scenario.initialMessage,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    simulations.set(sim.id, sim);
    return structuredClone(sim);
  },

  async getSimulation(id: string): Promise<RolePlaySimulation | null> {
    if (USE_API) {
      try {
        return await http.get<RolePlaySimulation>(`/roleplay/simulations/${encodeURIComponent(id)}`);
      } catch {
        return null;
      }
    }
    await delay(120);
    const s = simulations.get(id);
    return s ? structuredClone(s) : null;
  },

  async sendMessage(simulationId: string, content: string): Promise<RolePlayMessage> {
    if (USE_API) {
      const res = await http.post<RolePlayMessage | { message: RolePlayMessage }>(
        `/roleplay/simulations/${encodeURIComponent(simulationId)}/messages`,
        { content },
      );
      if (res && typeof res === "object" && "message" in res && res.message) {
        return res.message;
      }
      return res as RolePlayMessage;
    }
    const sim = simulations.get(simulationId);
    if (!sim) throw new Error("Simulação não encontrada");
    sim.messages.push({
      id: uid("m"),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    });
    await delay(900);
    const aiMsg: RolePlayMessage = {
      id: uid("m"),
      role: "ai",
      content: "Entendi. Pode me explicar melhor? (mock)",
      createdAt: new Date().toISOString(),
    };
    sim.messages.push(aiMsg);
    return structuredClone(aiMsg);
  },

  async finishSimulation(simulationId: string): Promise<RolePlaySimulation> {
    if (USE_API) {
      return http.post<RolePlaySimulation>(
        `/roleplay/simulations/${encodeURIComponent(simulationId)}/finish`,
      );
    }
    await delay(800);
    const sim = simulations.get(simulationId);
    if (!sim) throw new Error("Simulação não encontrada");
    sim.endedAt = new Date().toISOString();
    sim.status = "approved";
    sim.score = 80;
    return structuredClone(sim);
  },
};
