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

Com mocks (sem `VITE_API_BASE_URL`):
```
E-mail:  ana.souza@exemplo.com.br
Senha:   aurora123
```

Com API real: use e-mail/senha de um aluno (`nivel=Cliente`) cadastrado no painel-cti, com matrícula ativa e curso EAD publicado.

---

## 🔐 Variáveis de ambiente

Crie `.env` na raiz:

```env
# API aluno do painel-cti
VITE_API_BASE_URL=http://localhost/pjt/painel-cti/api/v1/student
```

Sem `VITE_API_BASE_URL`, os services usam mocks. Com a variável, auth/cursos/aulas/avaliações/roleplay/IA/certificados batem na API.

### Certificados (`/certificates`)

- Emitidos **automaticamente** pelo painel quando o aluno atinge **100%** do curso (sem liberação manual).
- A API devolve `status: "valid" | "outdated"` e `progressPercent`.
- **valid:** botões Visualizar / Baixar PDF (`GET /certificates/{id}/html`).
- **outdated:** a escola editou o curso e o progresso caiu — card com CTA “Continuar curso”; PDF retorna 403 até reconcluir 100% (aí o snapshot atualiza e o `codigo` permanece).
- Regras de emissão/SQL: ver `painel-cti/ARCHITECTURE.md` (fonte da verdade do LMS).

Regras:
- Prefixo `VITE_` no front.
- Nunca coloque a API key de IA aqui — fica só no painel (escola), criptografada.
- No painel `.env`: `JWT_KEY` preenchido + `STUDENT_CORS_ORIGINS=http://localhost:8080`
- SQL: colar `painel-cti/database/lms_ead.sql` no phpMyAdmin.

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
npm run build       # gera dist/client/ (SPA estático)
npm run preview     # pré-visualiza o build
```

Com `spa: true` + `nitro: false` no `vite.config.ts`, o build produz um **site estático**
pronto para Apache compartilhado (HostGator): `dist/client/index.html` + `assets/` + `brand/` + `.htaccess`.

### Deploy no HostGator (subdomínio do aluno)

**Causa típica de 403:** pasta do site sem `index.html` (só `assets/`) ou permissões erradas.  
**Causa típica de 404 em `/login`:** Apache sem rewrite para `index.html` (falta `.htaccess`).

1. No `.env` de produção (antes do build), use URL **absoluta** da API do painel:

```env
VITE_API_BASE_URL=https://SEU-DOMINIO-DO-PAINEL/api/v1/student
```

(ex.: `https://painel.ctieducacional.com.br/api/v1/student` — ajuste ao path real)

2. Build local:

```bash
npm run build
```

3. No File Manager / FTP do subdomínio (`aluno.ctieducacional.com.br`):
   - **Apague** o conteúdo antigo da pasta do site (não deixe `src/`, `node_modules`, `package.json` na raiz pública)
   - Envie **só** o conteúdo de `dist/client/`:
     - `index.html`
     - `.htaccess`
     - `assets/`
     - `brand/`
   - Pastas `755`, arquivos `644`

4. No painel-cti (`.env`), libere CORS:

```env
STUDENT_CORS_ORIGINS=https://aluno.ctieducacional.com.br
```

5. Teste: `https://aluno…/` deve abrir (ou redirecionar ao login); `/login` não pode dar 404 do Apache.

Se usar **Git Deploy** do cPanel (`.cpanel.yml`), o script copia `dist/client/` para
`/home1/dncurs82/aluno.ctieducacional.com.br` — é preciso que `dist/client` já exista no push
(build local + commit, ou outro CI).

> ⚠️ Não copie o repositório inteiro para a pasta pública. Não misture dump de `.output/public`
> na raiz do projeto Git (isso quebrava o build e deixava o site sem `index.html`).

---

## 🧭 Estado atual (LMS)

Portal ligado à API `/api/v1/student` do painel-cti. Go-live: seguir
`painel-cti/database/LMS_CHECKLIST_PRODUCAO.md` + `lms_verificar_producao.sql`.

Polish recente: `EmptyState` em cursos/ranking/certificados/notificações/conquistas;
abas de cursos com scroll horizontal no mobile; CTAs em estados vazios.

## 🧭 Próximos passos sugeridos

- [ ] Smoke test completo do checklist de produção
- [ ] Deploy Ascend (`npm run build` → publicar `dist`)
- [ ] Ajustes finos de UX no player (só sob demanda)


---

## 📄 Licença

Uso interno.
