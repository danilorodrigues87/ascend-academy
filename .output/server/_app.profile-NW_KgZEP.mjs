import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./_ssr/AuthContext-D4cYmnFW.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./_ssr/avatar-gunzrkKA.mjs";
import { n as formatMinutes, r as initials } from "./_ssr/format-BkgF6Xya.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { W as Clock, o as Trophy, p as Sparkles } from "./_libs/lucide-react.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Progress } from "./_ssr/progress-DOIEKRJF.mjs";
import { t as coursesService } from "./_ssr/coursesService-DXN4SuWd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.profile-NW_KgZEP.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user } = useAuth();
	const { data: courses = [] } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const completed = courses.filter((c) => c.progressPercent >= 100).length;
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col items-start gap-6 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "h-24 w-24 border-2 border-primary/30 shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: user.avatarUrl,
						alt: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(user.name) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold",
							children: user.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: user.email
						}),
						user.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-sm text-muted-foreground",
							children: user.bio
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Cursos concluídos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6 text-primary" }),
								" ",
								completed
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Tempo estudado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-6 w-6 text-primary" }),
								" ",
								formatMinutes(user.totalStudyMinutes)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Nível / XP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-primary" }),
									" Nv. ",
									user.level
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: user.xp / 6e3 * 100,
								className: "mt-2 h-1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [user.xp.toLocaleString("pt-BR"), " XP"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Dados pessoais"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome completo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: user.name })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									defaultValue: user.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: user.phone })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { defaultValue: user.city })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Biografia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									defaultValue: user.bio,
									className: "min-h-[100px]"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Salvar alterações" })]
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
