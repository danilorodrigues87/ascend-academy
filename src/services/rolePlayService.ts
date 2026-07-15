import type {
  RolePlayDifficulty,
  RolePlayEvaluation,
  RolePlayMessage,
  RolePlayScenario,
  RolePlaySimulation,
} from "@/types";
import { delay } from "./http";
import { mockRolePlayHistory, mockRolePlayScenarios } from "./mocks/rolePlayData";

/**
 * Role Play Service
 *
 * Camada preparada para integração futura com API REST em PHP e/ou
 * um provedor de IA (OpenAI, etc.). Hoje retorna respostas mockadas.
 *
 * Endpoints previstos:
 *  GET    /roleplay/scenarios
 *  GET    /roleplay/scenarios/:id
 *  POST   /roleplay/simulations                { scenarioId, difficulty }
 *  POST   /roleplay/simulations/:id/messages   { content }
 *  POST   /roleplay/simulations/:id/finish
 *  GET    /roleplay/history
 */

// In-memory store simulating persistence between calls.
const simulations = new Map<string, RolePlaySimulation>();

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Simple mock AI reply generator. Randomizes tone based on difficulty. */
function generateAiReply(
  scenario: RolePlayScenario,
  history: RolePlayMessage[],
  difficulty: RolePlayDifficulty,
): { content: string; shouldEnd: boolean } {
  const turn = history.filter((m) => m.role === "user").length;
  const lastUser = [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const lower = lastUser.toLowerCase();

  const wantsToClose =
    lower.includes("obrigad") ||
    lower.includes("agradeço") ||
    lower.includes("encerrar") ||
    lower.includes("resolver depois");

  if (wantsToClose && turn >= 3) {
    return {
      content:
        "Tudo bem, agradeço o tempo. Espero que dessa vez algo realmente mude. Até mais.",
      shouldEnd: true,
    };
  }

  const objectionsByDifficulty: Record<RolePlayDifficulty, string[]> = {
    easy: [
      "Entendi. Pode me explicar melhor?",
      "Hm, faz sentido. E como isso me ajuda no dia a dia?",
    ],
    medium: [
      "Certo, mas isso já não é algo básico que deveria funcionar?",
      "Sinceramente, não é a primeira vez que ouço isso. O que muda agora?",
      "Deixa eu entender: você está dizendo que a culpa foi minha então?",
    ],
    hard: [
      "Isso é bonito no discurso. Me mostra números.",
      "Você tem certeza disso? Porque na prática eu vejo diferente.",
      "Já testamos algo parecido e não deu certo. Por que agora seria diferente?",
    ],
    expert: [
      "Vou ser bem franco: isso soa como argumento pronto. O que você tem de concreto?",
      "Interessante. Mas eu conheço o mercado — e o que você descreveu tem 3 falhas óbvias. Quer ouvir?",
      "Antes de continuar, preciso entender: você já fez isso antes ou está aprendendo comigo agora?",
    ],
  };

  const pool = objectionsByDifficulty[difficulty];
  const line = pool[turn % pool.length];

  const followUps = [
    `Sobre ${scenario.theme.toLowerCase()}: ${line}`,
    line,
    `${line} E se possível, seja objetivo — meu tempo é curto.`,
  ];

  const shouldEnd = turn >= (difficulty === "expert" ? 10 : difficulty === "hard" ? 8 : 6) && Math.random() > 0.6;

  return {
    content: followUps[turn % followUps.length],
    shouldEnd,
  };
}

function buildEvaluation(simulation: RolePlaySimulation, scenario: RolePlayScenario): RolePlayEvaluation {
  const userMessages = simulation.messages.filter((m) => m.role === "user");
  const baseScore = Math.min(
    98,
    50 + userMessages.length * 4 + (scenario.difficulty === "easy" ? 15 : scenario.difficulty === "medium" ? 8 : 0),
  );

  const competencies = scenario.criteria.map((c, i) => ({
    key: c.key,
    label: c.label,
    score: Math.max(45, Math.min(99, baseScore + ((i * 7) % 15) - 7)),
    comment:
      i % 2 === 0
        ? "Boa condução, com espaço para aprofundar."
        : "Você aplicou bem os conceitos vistos em aula.",
  }));

  const overall = Math.round(
    competencies.reduce((s, c) => s + c.score, 0) / Math.max(1, competencies.length),
  );

  const timeline = userMessages.slice(0, 6).map((m, i) => ({
    id: uid("tl"),
    messageId: m.id,
    type: (["success", "opportunity", "error", "decision"] as const)[i % 4],
    title:
      i % 4 === 0
        ? "Boa escuta ativa"
        : i % 4 === 1
        ? "Oportunidade perdida"
        : i % 4 === 2
        ? "Argumento frágil"
        : "Boa tomada de decisão",
    detail:
      i % 4 === 0
        ? "Você validou o sentimento do interlocutor antes de responder."
        : i % 4 === 1
        ? "Aqui caberia uma pergunta aberta para aprofundar o problema."
        : i % 4 === 2
        ? "A resposta soou defensiva; foque em dados e exemplos."
        : "Bom encaminhamento para o próximo passo.",
  }));

  const referenceConversation: RolePlayMessage[] = [
    {
      id: uid("ref"),
      role: "ai",
      content: scenario.initialMessage,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid("ref"),
      role: "user",
      content:
        "Obrigado por topar essa conversa. Antes de tudo, me conta rapidamente: o que te levou a procurar o suporte na semana passada?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uid("ref"),
      role: "ai",
      content:
        "Foi uma cobrança errada no meu cartão. Fiquei três dias esperando uma resposta que fizesse sentido.",
      createdAt: new Date().toISOString(),
    },
    {
      id: uid("ref"),
      role: "user",
      content:
        "Entendo perfeitamente a frustração. Se puder, me leva pelo passo a passo do que você fez desde o momento em que viu a cobrança — quero enxergar essa jornada com o seu olhar.",
      createdAt: new Date().toISOString(),
    },
  ];

  return {
    simulationId: simulation.id,
    overallScore: overall,
    passed: overall >= scenario.minScore,
    summary:
      overall >= scenario.minScore
        ? "Parabéns! Você conduziu a simulação com segurança, aplicando bem os conceitos do módulo."
        : "Você está no caminho. Reforce alguns pontos e refaça a simulação para consolidar o aprendizado.",
    strengths: [
      "Postura profissional durante toda a conversa",
      "Boa aplicação dos conceitos do módulo",
      "Encerramento organizado",
    ],
    improvements: [
      "Aprofundar em perguntas abertas",
      "Explorar mais as motivações do interlocutor antes de propor soluções",
    ],
    mistakes: [
      "Em alguns momentos a resposta soou padronizada",
    ],
    reviewTopics: [
      `${scenario.moduleTitle}: técnicas de escuta ativa`,
      `${scenario.courseTitle}: contorno de objeções`,
    ],
    competencies,
    timeline,
    referenceConversation,
  };
}

export const rolePlayService = {
  async listScenarios(): Promise<RolePlayScenario[]> {
    await delay(250);
    return structuredClone(mockRolePlayScenarios);
  },

  async getScenario(id: string): Promise<RolePlayScenario | null> {
    await delay(200);
    return mockRolePlayScenarios.find((s) => s.id === id) ?? null;
  },

  async listHistory(): Promise<RolePlaySimulation[]> {
    await delay(250);
    const persisted = Array.from(simulations.values()).filter((s) => s.status !== "in_progress");
    return [...persisted, ...structuredClone(mockRolePlayHistory)].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );
  },

  async startSimulation(scenarioId: string, difficulty: RolePlayDifficulty): Promise<RolePlaySimulation> {
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
    await delay(120);
    const s = simulations.get(id);
    return s ? structuredClone(s) : null;
  },

  async sendMessage(simulationId: string, content: string): Promise<RolePlayMessage> {
    const sim = simulations.get(simulationId);
    if (!sim) throw new Error("Simulação não encontrada");
    const scenario = mockRolePlayScenarios.find((s) => s.id === sim.scenarioId)!;

    sim.messages.push({
      id: uid("m"),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    });

    // Simulate AI "thinking"
    await delay(900 + Math.random() * 800);

    const { content: aiContent, shouldEnd } = generateAiReply(scenario, sim.messages, sim.difficulty);
    const aiMsg: RolePlayMessage = {
      id: uid("m"),
      role: "ai",
      content: aiContent,
      createdAt: new Date().toISOString(),
    };
    sim.messages.push(aiMsg);

    if (shouldEnd) {
      // Mark suggestion to close but don't auto-finalize — user presses button.
    }

    return structuredClone(aiMsg);
  },

  async finishSimulation(simulationId: string): Promise<RolePlaySimulation> {
    await delay(1200);
    const sim = simulations.get(simulationId);
    if (!sim) throw new Error("Simulação não encontrada");
    const scenario = mockRolePlayScenarios.find((s) => s.id === sim.scenarioId)!;

    sim.endedAt = new Date().toISOString();
    sim.durationSeconds = Math.max(
      30,
      Math.round((new Date(sim.endedAt).getTime() - new Date(sim.startedAt).getTime()) / 1000),
    );
    const evaluation = buildEvaluation(sim, scenario);
    sim.evaluation = evaluation;
    sim.score = evaluation.overallScore;
    sim.status = evaluation.passed ? "approved" : "retry";

    return structuredClone(sim);
  },
};
