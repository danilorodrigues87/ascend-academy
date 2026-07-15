# Aurora — Portal do Aluno

Portal do Aluno para plataforma EAD. **Front-end only** — toda comunicação
passa por uma camada de **Services** com Mock Data, pronta para ser
substituída por chamadas a uma API REST em PHP no futuro.

---

## 🚀 Stack

- **React 19** + **TypeScript** (strict)
- **TanStack Start** (SSR/roteamento file-based) + **TanStack Query**
- **Vite 7** (dev server + build)
- **Tailwind CSS v4** (tokens via `src/styles.css`)
- **shadcn/ui** (componentes base em `src/components/ui/`)
- **Bun** como gerenciador de pacotes (npm também funciona)

---

## 📋 Pré-requisitos

Instale na sua máquina:

| Ferramenta | Versão mínima | Link |
|---|---|---|
| **Node.js** | 20 LTS | https://nodejs.org |
| **Bun** (recomendado) | 1.1+ | https://bun.sh |
| **Git** | qualquer | https://git-scm.com |

> 💡 **Vem do XAMPP?** Este projeto **não usa** o Apache. O Vite sobe seu
> próprio servidor em `http://localhost:8080`. O XAMPP fica livre para,
> mais tarde, servir a API PHP em paralelo.

### Instalar o Bun

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

**macOS / Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

Confirme: `bun -v`

---

## ▶️ Rodando localmente

```bash
# 1. Instala dependências
bun install

# 2. Sobe o servidor de desenvolvimento
bun run dev
```

Abra **http://localhost:8080**. Hot reload automático a cada save.

### Scripts disponíveis

```bash
bun run dev        # dev server (Vite)
bun run build      # build de produção → dist/
bun run start      # serve o build de produção
bun run lint       # ESLint
```

### Usando npm em vez de Bun

Delete `bun.lock`, depois:
```bash
npm install
npm run dev
```

### Credenciais de demonstração

```
E-mail:  ana.souza@exemplo.com.br
Senha:   aurora123
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz (opcional enquanto está tudo mockado):

```env
# URL base da API REST em PHP (quando existir)
VITE_API_BASE_URL=http://localhost/api-ead
```

Regras:
- Variáveis expostas no front-end **DEVEM** ter o prefixo `VITE_`.
- Nunca coloque segredos aqui — este bundle vai para o navegador.
- Variáveis de servidor (server functions) usam `process.env.*`, sem prefixo.

---

## 🗂️ Arquitetura de pastas

```
src/
├── assets/          # Imagens, fontes, arquivos estáticos importados
├── components/
│   ├── common/      # Componentes compartilhados (CourseCard, Logo, StatCard...)
│   ├── layout/      # Cascas de layout (AppSidebar, Topbar)
│   └── ui/          # shadcn/ui — Button, Card, Dialog, etc.
├── contexts/        # React Contexts globais
│   ├── AuthContext.tsx    # Sessão do aluno (login/logout/token)
│   └── ThemeContext.tsx   # Light/Dark mode
├── hooks/           # Hooks reutilizáveis (use-mobile, etc.)
├── lib/             # Utilitários da lib (cn, error handling)
├── routes/          # 🚦 Roteamento file-based (TanStack Router)
│   ├── __root.tsx         # Layout raiz + <head> global
│   ├── index.tsx          # /
│   ├── login.tsx          # /login
│   ├── _app.tsx           # Layout autenticado (sidebar + topbar)
│   ├── _app.dashboard.tsx # /dashboard
│   ├── _app.courses.tsx   # /courses
│   └── _app.courses.$courseId.lessons.$lessonId.tsx  # /courses/:id/lessons/:id
├── services/        # 🔌 Camada de dados — TROCAR AQUI PARA A API PHP
│   ├── http.ts           # Cliente HTTP genérico (fetch + baseURL + auth)
│   ├── authService.ts    # login, logout, sessão
│   ├── coursesService.ts # cursos, módulos, aulas
│   ├── assessmentsService.ts
│   ├── rolePlayService.ts
│   ├── aiService.ts
│   ├── notificationsService.ts
│   ├── mocks/            # Dados simulados (só existirão até plugar a API)
│   └── index.ts          # Barrel export
├── types/           # Types e interfaces de domínio
├── utils/           # Formatação (datas, moedas, texto)
├── router.tsx       # Configuração do TanStack Router
├── start.ts         # Entry client (TanStack Start)
├── server.ts        # Entry server (SSR)
└── styles.css       # Tailwind v4 + tokens de design
```

### Convenção de rotas (TanStack Router)

Arquivo → URL:

| Arquivo | URL |
|---|---|
| `index.tsx` | `/` |
| `login.tsx` | `/login` |
| `_app.tsx` | *layout* (não aparece na URL — sidebar+topbar) |
| `_app.dashboard.tsx` | `/dashboard` |
| `_app.courses.$courseId.tsx` | `/courses/:courseId` |
| `_app.courses.$courseId.lessons.$lessonId.tsx` | `/courses/:courseId/lessons/:lessonId` |

- Pontos (`.`) viram barras (`/`)
- `$param` = parâmetro dinâmico
- Prefixo `_` = layout sem impacto na URL
- **Nunca edite** `src/routeTree.gen.ts` — é gerado automaticamente

---

## 🔌 Camada de Services (o coração da abstração)

Toda tela consome dados **apenas** por `src/services/*`. Os componentes
não sabem se o dado veio de mock ou de uma API real.

### Exemplo — hoje (mock):

```ts
// src/services/coursesService.ts
export const coursesService = {
  async list(): Promise<Course[]> {
    await delay(300);              // simula latência
    return mockCourses;
  },
};
```

### Exemplo — amanhã (API PHP):

```ts
import { http } from "./http";

export const coursesService = {
  list: () => http.get<Course[]>("/courses"),
};
```

**Nenhum componente muda.** O contrato (tipos em `src/types/`) permanece
o mesmo — só a implementação do service troca.

### Cliente HTTP (`src/services/http.ts`)

Já pronto para:
- `GET`, `POST`, `PUT`, `DELETE`
- Prefixo `VITE_API_BASE_URL`
- Header `Authorization: Bearer <token>` automático
- Tratamento de erro padronizado

---

## 🔮 Integrando com a API PHP (XAMPP)

Quando a API estiver pronta:

1. Suba a API no XAMPP em `http://localhost/api-ead/`
2. Configure o `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost/api-ead
   ```
3. Em cada arquivo de `src/services/`, troque o retorno mockado por
   `http.get` / `http.post` (endpoints já estão documentados como
   comentários nos services).
4. Libere **CORS** no PHP:
   ```php
   header("Access-Control-Allow-Origin: http://localhost:8080");
   header("Access-Control-Allow-Headers: Content-Type, Authorization");
   header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
   if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
   ```

---

## 🎨 Design System

- **Tokens** definidos em `src/styles.css` (cores, sombras, radius)
- **Fontes**: *Fraunces* (display) + *Manrope* (corpo) — carregadas em `__root.tsx`
- **Tema**: light/dark via `ThemeContext` (persistido em `localStorage`)
- **Componentes**: shadcn/ui em `src/components/ui/` — customizáveis à vontade

Regra: **nunca** use cores hardcoded (`text-white`, `bg-[#fff]`). Use os
tokens semânticos (`text-foreground`, `bg-background`, `bg-primary`).

---

## 📦 Build de produção

```bash
bun run build       # gera dist/
bun run start       # serve dist/
```

O build produz um app SSR/SSG pronto para deploy em qualquer edge runtime
(Cloudflare Workers, Vercel, Netlify) ou Node tradicional.

---

## 🧭 Próximos passos sugeridos

- [ ] Implementar API REST em PHP seguindo os contratos em `src/types/`
- [ ] Substituir mocks nos services por chamadas `http.*`
- [ ] Implementar refresh token no `authService`
- [ ] Adicionar testes (Vitest está disponível)

---

## 📄 Licença

Uso interno.
