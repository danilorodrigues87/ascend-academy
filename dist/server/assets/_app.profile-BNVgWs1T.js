import { n as useAuth } from "./AuthContext-Bv-CDmXH.js";
import { t as coursesService } from "./coursesService-DdBql3jC.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Textarea } from "./textarea-kko37XEX.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.js";
import { n as formatMinutes, r as initials } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Progress } from "./progress-DOIEKRJF.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Clock, Sparkles, Trophy } from "lucide-react";
//#region src/routes/_app.profile.tsx?tsr-split=component
function ProfilePage() {
	const { user } = useAuth();
	const { data: courses = [] } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const completed = courses.filter((c) => c.progressPercent >= 100).length;
	if (!user) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col items-start gap-6 md:flex-row md:items-center",
				children: [/* @__PURE__ */ jsxs(Avatar, {
					className: "h-24 w-24 border-2 border-primary/30 shadow-glow",
					children: [/* @__PURE__ */ jsx(AvatarImage, {
						src: user.avatarUrl,
						alt: user.name
					}), /* @__PURE__ */ jsx(AvatarFallback, { children: initials(user.name) })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-3xl font-semibold",
							children: user.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: user.email
						}),
						user.bio && /* @__PURE__ */ jsx("p", {
							className: "mt-3 max-w-2xl text-sm text-muted-foreground",
							children: user.bio
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Cursos concluídos"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
							children: [
								/* @__PURE__ */ jsx(Trophy, { className: "h-6 w-6 text-primary" }),
								" ",
								completed
							]
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Tempo estudado"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
							children: [
								/* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }),
								" ",
								formatMinutes(user.totalStudyMinutes)
							]
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Nível / XP"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 flex items-center gap-2 font-display text-3xl font-semibold",
								children: [
									/* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary" }),
									" Nv. ",
									user.level
								]
							}),
							/* @__PURE__ */ jsx(Progress, {
								value: user.xp / 6e3 * 100,
								className: "mt-2 h-1.5"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [user.xp.toLocaleString("pt-BR"), " XP"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-semibold",
						children: "Dados pessoais"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Nome completo" }), /* @__PURE__ */ jsx(Input, { defaultValue: user.name })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
									type: "email",
									defaultValue: user.email
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Telefone" }), /* @__PURE__ */ jsx(Input, { defaultValue: user.phone })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Cidade" }), /* @__PURE__ */ jsx(Input, { defaultValue: user.city })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Biografia" }), /* @__PURE__ */ jsx(Textarea, {
									defaultValue: user.bio,
									className: "min-h-[100px]"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							children: "Cancelar"
						}), /* @__PURE__ */ jsx(Button, { children: "Salvar alterações" })]
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
