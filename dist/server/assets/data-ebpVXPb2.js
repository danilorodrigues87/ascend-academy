//#region src/services/mocks/data.ts
var mockUser = {
	id: "usr_001",
	name: "Ana Beatriz Souza",
	email: "ana.souza@exemplo.com.br",
	phone: "+55 11 98888-7777",
	city: "São Paulo, SP",
	bio: "Estudante de design de produto, apaixonada por educação e tecnologia.",
	avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format",
	role: "student",
	xp: 4820,
	level: 12,
	streakDays: 17,
	totalStudyMinutes: 4380,
	createdAt: "2024-02-10T14:00:00Z"
};
var makeLessons = (moduleId, base, count, unlockedUntil = 3) => Array.from({ length: count }, (_, i) => ({
	id: `${moduleId}_l${i + 1}`,
	moduleId,
	title: `${base} — Aula ${i + 1}`,
	description: "Nesta aula você vai aprender os fundamentos, exemplos práticos e ver aplicações reais no mercado.",
	durationMinutes: 8 + i * 3 % 15,
	videoUrl: "https://www.youtube.com/embed/hu-q2Rc-2W0",
	videoProvider: "youtube",
	completed: i < 2,
	locked: i >= unlockedUntil,
	order: i + 1,
	resources: [{
		id: `${moduleId}_l${i + 1}_r1`,
		label: "Material da aula (PDF)",
		url: "#",
		type: "pdf"
	}, {
		id: `${moduleId}_l${i + 1}_r2`,
		label: "Leitura complementar",
		url: "#",
		type: "link"
	}]
}));
var mockCourses = [
	{
		id: "crs_001",
		slug: "design-de-produto-do-zero-ao-avancado",
		title: "Design de Produto: do zero ao avançado",
		description: "Uma jornada completa para se tornar um Product Designer moderno. Do research à entrega, passando por sistemas de design, prototipação e handoff.",
		shortDescription: "Fundamentos, UX research, sistemas de design e handoff.",
		coverUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=800&fit=crop&auto=format",
		bannerUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1920&h=800&fit=crop&auto=format",
		instructor: {
			id: "ins_001",
			name: "Prof. Rafael Menezes",
			avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&h=256&fit=crop&auto=format",
			title: "Head of Design · ex-Nubank",
			bio: "15 anos de experiência liderando times de produto em fintechs e SaaS."
		},
		categories: [
			"Design",
			"Produto",
			"UX"
		],
		level: "Intermediário",
		workloadHours: 42,
		estimatedMinutes: 2520,
		rating: 4.9,
		ratingCount: 1284,
		progressPercent: 62,
		objectives: [
			"Dominar princípios de UX e usabilidade",
			"Construir e manter Design Systems escaláveis",
			"Facilitar workshops e pesquisa com usuários",
			"Preparar handoff impecável para engenharia"
		],
		modulesCount: 4,
		lessonsCount: 24,
		modules: [
			{
				id: "mod_001",
				courseId: "crs_001",
				title: "Fundamentos de Design de Produto",
				order: 1,
				locked: false,
				lessons: makeLessons("mod_001", "Fundamentos", 6, 6)
			},
			{
				id: "mod_002",
				courseId: "crs_001",
				title: "UX Research na prática",
				order: 2,
				locked: false,
				lessons: makeLessons("mod_002", "Research", 6, 4)
			},
			{
				id: "mod_003",
				courseId: "crs_001",
				title: "Design Systems",
				order: 3,
				locked: false,
				lessons: makeLessons("mod_003", "Design Systems", 6, 2)
			},
			{
				id: "mod_004",
				courseId: "crs_001",
				title: "Handoff e colaboração com engenharia",
				order: 4,
				locked: true,
				lessons: makeLessons("mod_004", "Handoff", 6, 0)
			}
		],
		enrolled: true,
		lastAccessedLessonId: "mod_002_l3"
	},
	{
		id: "crs_002",
		slug: "react-avancado-arquitetura-e-performance",
		title: "React Avançado: arquitetura e performance",
		description: "Padrões modernos, gerenciamento de estado, performance, testes e arquitetura para aplicações React em produção.",
		shortDescription: "Padrões avançados, performance e arquitetura.",
		coverUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop&auto=format",
		bannerUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=1920&h=800&fit=crop&auto=format",
		instructor: {
			id: "ins_002",
			name: "Prof. Camila Duarte",
			avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format",
			title: "Staff Engineer · Google",
			bio: "Especialista em arquitetura front-end e performance web."
		},
		categories: [
			"Programação",
			"Frontend",
			"React"
		],
		level: "Avançado",
		workloadHours: 38,
		estimatedMinutes: 2280,
		rating: 4.8,
		ratingCount: 942,
		progressPercent: 34,
		objectives: [
			"Padrões de composição avançados",
			"Otimização de performance com React 19",
			"Testes robustos e CI/CD",
			"Arquitetura escalável"
		],
		modulesCount: 4,
		lessonsCount: 20,
		modules: [
			{
				id: "mod_101",
				courseId: "crs_002",
				title: "Arquitetura moderna",
				order: 1,
				locked: false,
				lessons: makeLessons("mod_101", "Arquitetura", 5, 5)
			},
			{
				id: "mod_102",
				courseId: "crs_002",
				title: "Performance profunda",
				order: 2,
				locked: false,
				lessons: makeLessons("mod_102", "Performance", 5, 3)
			},
			{
				id: "mod_103",
				courseId: "crs_002",
				title: "Testes",
				order: 3,
				locked: true,
				lessons: makeLessons("mod_103", "Testes", 5, 0)
			},
			{
				id: "mod_104",
				courseId: "crs_002",
				title: "Deploy e observabilidade",
				order: 4,
				locked: true,
				lessons: makeLessons("mod_104", "Deploy", 5, 0)
			}
		],
		enrolled: true,
		lastAccessedLessonId: "mod_102_l1"
	},
	{
		id: "crs_003",
		slug: "estrategia-de-produto-com-ia",
		title: "Estratégia de Produto com IA",
		description: "Como incorporar IA no ciclo de vida do produto: descoberta, priorização, prototipação e métricas.",
		shortDescription: "IA aplicada ao ciclo de produto.",
		coverUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&auto=format",
		bannerUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&h=800&fit=crop&auto=format",
		instructor: {
			id: "ins_003",
			name: "Prof. Igor Tavares",
			avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&auto=format",
			title: "Product Lead · IA aplicada"
		},
		categories: [
			"Produto",
			"IA",
			"Estratégia"
		],
		level: "Intermediário",
		workloadHours: 28,
		estimatedMinutes: 1680,
		rating: 4.7,
		ratingCount: 512,
		progressPercent: 12,
		objectives: [
			"Aplicar IA na descoberta de produto",
			"Priorizar oportunidades com dados",
			"Prototipar com LLMs",
			"Medir impacto real"
		],
		modulesCount: 3,
		lessonsCount: 14,
		modules: [
			{
				id: "mod_201",
				courseId: "crs_003",
				title: "IA como diferencial",
				order: 1,
				locked: false,
				lessons: makeLessons("mod_201", "IA", 5, 5)
			},
			{
				id: "mod_202",
				courseId: "crs_003",
				title: "Prototipação com LLMs",
				order: 2,
				locked: false,
				lessons: makeLessons("mod_202", "LLMs", 5, 1)
			},
			{
				id: "mod_203",
				courseId: "crs_003",
				title: "Métricas e impacto",
				order: 3,
				locked: true,
				lessons: makeLessons("mod_203", "Métricas", 4, 0)
			}
		],
		enrolled: true
	},
	{
		id: "crs_004",
		slug: "marketing-digital-para-produtos-sass",
		title: "Marketing Digital para SaaS",
		description: "Estratégias de aquisição, ativação e retenção para produtos digitais modernos.",
		shortDescription: "Growth, aquisição e retenção.",
		coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format",
		bannerUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=800&fit=crop&auto=format",
		instructor: {
			id: "ins_004",
			name: "Prof. Julia Rocha",
			avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format",
			title: "Growth Lead · SaaS"
		},
		categories: ["Marketing", "Growth"],
		level: "Iniciante",
		workloadHours: 22,
		estimatedMinutes: 1320,
		rating: 4.6,
		ratingCount: 388,
		progressPercent: 0,
		objectives: [
			"Fundamentos de growth",
			"Aquisição paga e orgânica",
			"Ativação",
			"Retenção"
		],
		modulesCount: 3,
		lessonsCount: 12,
		modules: [
			{
				id: "mod_301",
				courseId: "crs_004",
				title: "Fundamentos de Growth",
				order: 1,
				locked: false,
				lessons: makeLessons("mod_301", "Growth", 4, 4)
			},
			{
				id: "mod_302",
				courseId: "crs_004",
				title: "Aquisição",
				order: 2,
				locked: true,
				lessons: makeLessons("mod_302", "Aquisição", 4, 0)
			},
			{
				id: "mod_303",
				courseId: "crs_004",
				title: "Retenção",
				order: 3,
				locked: true,
				lessons: makeLessons("mod_303", "Retenção", 4, 0)
			}
		],
		enrolled: true
	}
];
var mockNotifications = [
	{
		id: "ntf_1",
		title: "Nova aula liberada",
		message: "‘Design Systems — Aula 3’ acabou de ser liberada.",
		type: "lesson",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 30)).toISOString(),
		read: false
	},
	{
		id: "ntf_2",
		title: "Certificado disponível",
		message: "Seu certificado do curso ‘Marketing Digital’ está pronto.",
		type: "certificate",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 4)).toISOString(),
		read: false
	},
	{
		id: "ntf_3",
		title: "IA Pedagógica respondeu",
		message: "Uma nova mensagem chegou na sua conversa com a IA.",
		type: "ai",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 22)).toISOString(),
		read: true
	},
	{
		id: "ntf_4",
		title: "Sequência de 17 dias 🔥",
		message: "Continue assim! Você está construindo um hábito incrível.",
		type: "system",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 26)).toISOString(),
		read: true
	}
];
var mockAchievements = [
	{
		id: "ach_1",
		title: "Assistiu sua primeira aula",
		subtitle: "Primeiro passo",
		description: "Assistiu sua primeira aula",
		howTo: "Conclua 1 aula.",
		icon: "Sparkles",
		rarity: "bronze",
		unlockedAt: "2024-02-11"
	},
	{
		id: "ach_2",
		title: "Assistiu 10 aulas em uma semana",
		subtitle: "Maratonista",
		description: "Assistiu 10 aulas",
		icon: "Flame",
		rarity: "prata",
		unlockedAt: "2024-05-01"
	},
	{
		id: "ach_3",
		title: "Fez 20 perguntas à IA",
		subtitle: "Curioso",
		description: "Fez 20 perguntas à IA",
		icon: "Brain",
		rarity: "prata",
		unlockedAt: "2024-07-14"
	},
	{
		id: "ach_4",
		title: "Concluiu um curso avançado",
		subtitle: "Mestre",
		description: "Concluiu um curso",
		icon: "Trophy",
		rarity: "ouro",
		progress: 62,
		goal: 100
	},
	{
		id: "ach_5",
		title: "30 dias consecutivos",
		subtitle: "Constância",
		description: "30 dias de streak",
		icon: "Calendar",
		rarity: "ouro",
		progress: 17,
		goal: 30
	},
	{
		id: "ach_6",
		title: "Alcance o nível 15",
		subtitle: "Nível 15",
		description: "Chegue ao nível 15",
		icon: "Star",
		rarity: "lendario",
		progress: 12,
		goal: 15
	}
];
var mockRanking = [
	{
		id: "r1",
		name: "Marina Alves",
		xp: 8420,
		position: 1,
		avatarUrl: "https://i.pravatar.cc/64?img=1"
	},
	{
		id: "r2",
		name: "Pedro Lima",
		xp: 7210,
		position: 2,
		avatarUrl: "https://i.pravatar.cc/64?img=2"
	},
	{
		id: "r3",
		name: "Camila Duarte",
		xp: 6120,
		position: 3,
		avatarUrl: "https://i.pravatar.cc/64?img=3"
	},
	{
		id: "usr_001",
		name: "Ana Beatriz Souza",
		xp: 4820,
		position: 4,
		isCurrentUser: true,
		avatarUrl: mockUser.avatarUrl
	},
	{
		id: "r5",
		name: "João Vitor",
		xp: 4210,
		position: 5,
		avatarUrl: "https://i.pravatar.cc/64?img=5"
	},
	{
		id: "r6",
		name: "Rafaela Nunes",
		xp: 3980,
		position: 6,
		avatarUrl: "https://i.pravatar.cc/64?img=6"
	}
];
var mockCertificates = [{
	id: "cert_1",
	courseId: "crs_004",
	courseTitle: "Marketing Digital para SaaS",
	issuedAt: "2025-11-20",
	workloadHours: 22,
	status: "valid",
	progressPercent: 100,
	code: "mockcert01"
}];
var mockAssessments = [{
	id: "asm_1",
	courseId: "crs_001",
	title: "Fundamentos de Design de Produto",
	description: "Avaliação dos conceitos do primeiro módulo.",
	durationMinutes: 30,
	attempts: 2,
	bestScore: 88,
	questions: [
		{
			id: "q1",
			type: "multiple",
			prompt: "Qual é o principal objetivo do UX Research?",
			options: [
				{
					id: "a",
					label: "Entender necessidades reais dos usuários"
				},
				{
					id: "b",
					label: "Validar cores e tipografia"
				},
				{
					id: "c",
					label: "Escrever documentação técnica"
				},
				{
					id: "d",
					label: "Reduzir custos de desenvolvimento"
				}
			],
			correctAnswer: "a"
		},
		{
			id: "q2",
			type: "boolean",
			prompt: "Um design system garante consistência entre produtos.",
			correctAnswer: true
		},
		{
			id: "q3",
			type: "essay",
			prompt: "Descreva como você conduziria um teste de usabilidade com 5 usuários."
		},
		{
			id: "q4",
			type: "roleplay",
			prompt: "Você é o PM. Um stakeholder quer cortar research. Como responder?",
			roleplayCharacter: "Stakeholder cético"
		}
	]
}];
var mockConversations = [{
	id: "conv_1",
	title: "Dúvida sobre Design Systems",
	createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 24)).toISOString(),
	updatedAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 22)).toISOString(),
	messages: [{
		id: "m1",
		role: "user",
		content: "Como estruturar tokens de cor em um design system?",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}, {
		id: "m2",
		role: "assistant",
		content: "Ótima pergunta! Tokens de cor geralmente são organizados em três camadas: **primitivos** (paleta base), **semânticos** (background, foreground, primary...) e **de componente** (button-bg, card-bg). Isso permite trocar temas sem alterar componentes.",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}]
}];
//#endregion
export { mockCourses as a, mockUser as c, mockConversations as i, mockAssessments as n, mockNotifications as o, mockCertificates as r, mockRanking as s, mockAchievements as t };
