import { n as delay, r as http, t as USE_API } from "./http-BMUz0GfE.js";
//#region src/services/mocks/rolePlayData.ts
var mockRolePlayScenarios = [
	{
		id: "rp_001",
		courseId: "c_ux",
		courseTitle: "Fundamentos de UX Design",
		moduleTitle: "Módulo 3 — Pesquisa com usuários",
		title: "Entrevista com um usuário insatisfeito",
		theme: "Pesquisa qualitativa",
		scenario: "Você trabalha como pesquisador de UX na empresa XPTO, um app de mobilidade urbana. Um usuário Premium relatou má experiência com o suporte e concordou em participar de uma entrevista de 15 minutos. Ele está frustrado, mas topou conversar. Seu objetivo é extrair insights reais, sem induzir respostas.",
		userRole: "Pesquisador de UX",
		aiRole: "Usuário Premium insatisfeito",
		aiCharacterName: "Marcos Andrade",
		aiCharacterAvatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&h=256&fit=crop&auto=format",
		objectives: [
			"Demonstrar empatia genuína no início da conversa",
			"Aplicar perguntas abertas e evitar induzir respostas",
			"Coletar insights concretos sobre a jornada de suporte",
			"Encerrar a entrevista de forma profissional"
		],
		criteria: [
			{
				key: "tech",
				label: "Conhecimento técnico"
			},
			{
				key: "communication",
				label: "Comunicação"
			},
			{
				key: "clarity",
				label: "Clareza"
			},
			{
				key: "organization",
				label: "Organização"
			},
			{
				key: "empathy",
				label: "Empatia"
			},
			{
				key: "argumentation",
				label: "Argumentação"
			},
			{
				key: "creativity",
				label: "Criatividade"
			},
			{
				key: "professionalism",
				label: "Profissionalismo"
			},
			{
				key: "problem_solving",
				label: "Resolução de problemas"
			},
			{
				key: "decision",
				label: "Tomada de decisão"
			}
		],
		difficulty: "medium",
		minScore: 70,
		basePrompt: "Você é Marcos Andrade, usuário Premium do app XPTO, insatisfeito com o suporte. Aja como uma pessoa real: seja direto, às vezes irônico, faça objeções, mude de assunto quando fizer sentido, e nunca entregue respostas prontas. Adapte humor e paciência conforme o aluno conduz a conversa.",
		initialPersonality: "Impaciente, direto, mas disposto a ajudar se sentir que está sendo ouvido.",
		initialMessage: "Oi, tudo bem? Olha, vou ser sincero: já perdi muito tempo com o suporte de vocês essa semana. Espero que essa conversa aqui valha a pena. Pode começar.",
		estimatedMinutes: 15
	},
	{
		id: "rp_002",
		courseId: "c_vendas",
		courseTitle: "Vendas Consultivas B2B",
		moduleTitle: "Módulo 2 — Contorno de objeções",
		title: "Cliente cético em call de descoberta",
		theme: "Objeções de preço e valor",
		scenario: "Você é consultor de vendas de uma plataforma SaaS de gestão. Agendou uma call com o diretor financeiro de uma indústria que já usa uma solução concorrente há 4 anos. Ele topou 20 minutos, mas está claramente cético.",
		userRole: "Consultor de vendas B2B",
		aiRole: "Diretor financeiro cético",
		aiCharacterName: "Roberta Lima",
		aiCharacterAvatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&auto=format",
		objectives: [
			"Fazer perguntas de descoberta antes de apresentar solução",
			"Contornar objeções sem confrontar o cliente",
			"Traduzir features em valor de negócio",
			"Definir um próximo passo claro ao final"
		],
		criteria: [
			{
				key: "tech",
				label: "Conhecimento técnico"
			},
			{
				key: "communication",
				label: "Comunicação"
			},
			{
				key: "clarity",
				label: "Clareza"
			},
			{
				key: "argumentation",
				label: "Argumentação"
			},
			{
				key: "professionalism",
				label: "Profissionalismo"
			},
			{
				key: "problem_solving",
				label: "Resolução de problemas"
			},
			{
				key: "decision",
				label: "Tomada de decisão"
			},
			{
				key: "empathy",
				label: "Empatia"
			}
		],
		difficulty: "hard",
		minScore: 75,
		basePrompt: "Você é Roberta Lima, CFO experiente, cética a novos fornecedores. Faça objeções reais (preço, curva de aprendizado, migração, ROI). Não facilite. Mude de assunto se o vendedor não fizer boas perguntas.",
		initialPersonality: "Analítica, questionadora, com pouco tempo.",
		initialMessage: "Olha, vou ser direta: já vi umas cinco apresentações parecidas com a de vocês esse semestre. O que exatamente muda aqui? Tenho 20 minutos.",
		estimatedMinutes: 20
	},
	{
		id: "rp_003",
		courseId: "c_edu",
		courseTitle: "Comunicação com famílias na escola",
		moduleTitle: "Módulo 1 — Reuniões difíceis",
		title: "Reunião com pai preocupado",
		theme: "Comunicação empática",
		scenario: "Você é professor(a) do 5º ano. O pai de um aluno pediu reunião porque acredita que o filho está sendo tratado injustamente. Você tem 15 minutos para conduzir uma conversa produtiva.",
		userRole: "Professor(a)",
		aiRole: "Pai de aluno preocupado",
		aiCharacterName: "Sr. Henrique",
		aiCharacterAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&auto=format",
		objectives: [
			"Acolher a preocupação antes de defender a escola",
			"Trazer dados objetivos sobre o aluno",
			"Combinar próximos passos concretos"
		],
		criteria: [
			{
				key: "empathy",
				label: "Empatia"
			},
			{
				key: "communication",
				label: "Comunicação"
			},
			{
				key: "clarity",
				label: "Clareza"
			},
			{
				key: "professionalism",
				label: "Profissionalismo"
			},
			{
				key: "problem_solving",
				label: "Resolução de problemas"
			},
			{
				key: "argumentation",
				label: "Argumentação"
			}
		],
		difficulty: "easy",
		minScore: 65,
		basePrompt: "Você é Sr. Henrique, pai preocupado. Comece defensivo, mas abra espaço se o(a) professor(a) demonstrar escuta ativa.",
		initialPersonality: "Defensivo no início, protetor com o filho.",
		initialMessage: "Professor(a), obrigado por me receber. Vou direto ao ponto: acho que meu filho está sendo tratado de forma diferente dos outros e queria entender o que está acontecendo.",
		estimatedMinutes: 12
	}
];
var mockRolePlayHistory = [{
	id: "sim_hist_001",
	scenarioId: "rp_001",
	scenarioTitle: "Entrevista com um usuário insatisfeito",
	courseId: "c_ux",
	courseTitle: "Fundamentos de UX Design",
	moduleTitle: "Módulo 3 — Pesquisa com usuários",
	theme: "Pesquisa qualitativa",
	difficulty: "medium",
	startedAt: "2026-07-08T14:20:00Z",
	endedAt: "2026-07-08T14:36:12Z",
	durationSeconds: 972,
	messages: [],
	status: "approved",
	score: 88
}, {
	id: "sim_hist_002",
	scenarioId: "rp_002",
	scenarioTitle: "Cliente cético em call de descoberta",
	courseId: "c_vendas",
	courseTitle: "Vendas Consultivas B2B",
	moduleTitle: "Módulo 2 — Contorno de objeções",
	theme: "Objeções de preço e valor",
	difficulty: "hard",
	startedAt: "2026-07-02T18:05:00Z",
	endedAt: "2026-07-02T18:24:40Z",
	durationSeconds: 1180,
	messages: [],
	status: "retry",
	score: 62
}];
//#endregion
//#region src/services/rolePlayService.ts
var simulations = /* @__PURE__ */ new Map();
function uid(prefix) {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
var rolePlayService = {
	async listScenarios() {
		if (USE_API) return http.get("/roleplay/scenarios");
		await delay(250);
		return structuredClone(mockRolePlayScenarios);
	},
	async getScenario(id) {
		if (USE_API) try {
			return await http.get(`/roleplay/scenarios/${encodeURIComponent(id)}`);
		} catch {
			return null;
		}
		await delay(200);
		return mockRolePlayScenarios.find((s) => s.id === id) ?? null;
	},
	async listHistory() {
		if (USE_API) return http.get("/roleplay/history");
		await delay(250);
		return [...Array.from(simulations.values()).filter((s) => s.status !== "in_progress"), ...structuredClone(mockRolePlayHistory)].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
	},
	async startSimulation(scenarioId, difficulty) {
		if (USE_API) return http.post("/roleplay/simulations", {
			scenarioId,
			difficulty
		});
		await delay(400);
		const scenario = mockRolePlayScenarios.find((s) => s.id === scenarioId);
		if (!scenario) throw new Error("Cenário não encontrado");
		const sim = {
			id: uid("sim"),
			scenarioId: scenario.id,
			scenarioTitle: scenario.title,
			courseId: scenario.courseId,
			courseTitle: scenario.courseTitle,
			moduleTitle: scenario.moduleTitle,
			theme: scenario.theme,
			difficulty,
			startedAt: (/* @__PURE__ */ new Date()).toISOString(),
			durationSeconds: 0,
			status: "in_progress",
			messages: [{
				id: uid("m"),
				role: "ai",
				content: scenario.initialMessage,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]
		};
		simulations.set(sim.id, sim);
		return structuredClone(sim);
	},
	async getSimulation(id) {
		if (USE_API) try {
			return await http.get(`/roleplay/simulations/${encodeURIComponent(id)}`);
		} catch {
			return null;
		}
		await delay(120);
		const s = simulations.get(id);
		return s ? structuredClone(s) : null;
	},
	async sendMessage(simulationId, content) {
		if (USE_API) {
			const res = await http.post(`/roleplay/simulations/${encodeURIComponent(simulationId)}/messages`, { content });
			if (res && typeof res === "object" && "message" in res && res.message) return res.message;
			return res;
		}
		const sim = simulations.get(simulationId);
		if (!sim) throw new Error("Simulação não encontrada");
		sim.messages.push({
			id: uid("m"),
			role: "user",
			content,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		await delay(900);
		const aiMsg = {
			id: uid("m"),
			role: "ai",
			content: "Entendi. Pode me explicar melhor? (mock)",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		sim.messages.push(aiMsg);
		return structuredClone(aiMsg);
	},
	async finishSimulation(simulationId) {
		if (USE_API) return http.post(`/roleplay/simulations/${encodeURIComponent(simulationId)}/finish`);
		await delay(800);
		const sim = simulations.get(simulationId);
		if (!sim) throw new Error("Simulação não encontrada");
		sim.endedAt = (/* @__PURE__ */ new Date()).toISOString();
		sim.status = "approved";
		sim.score = 80;
		sim.xpEarned = 64;
		return structuredClone(sim);
	}
};
//#endregion
export { rolePlayService as t };
