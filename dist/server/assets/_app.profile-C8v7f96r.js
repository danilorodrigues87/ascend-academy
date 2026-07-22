import { t as authService } from "./authService-BLjk4SS7.js";
import { n as useAuth } from "./AuthContext-D-o2gIWv.js";
import { t as coursesService } from "./coursesService-DFMfTh1S.js";
import { t as Button } from "./button-DRsC1qZi.js";
import { t as Progress } from "./progress-Crx1Tb8I.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DYLv5Rbv.js";
import { n as formatMinutes, r as initials } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-BLWafi8D.js";
import { t as Label } from "./label-B4PTMSG2.js";
import { t as Input } from "./input-DicJzR9-.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Camera, Clock, Sparkles, Trophy } from "lucide-react";
//#region src/routes/_app.profile.tsx?tsr-split=component
function ProfilePage() {
	const { user, setUser, refreshUser } = useAuth();
	const { data: courses = [] } = useQuery({
		queryKey: ["courses"],
		queryFn: () => coursesService.list()
	});
	const completed = courses.filter((c) => c.progressPercent >= 100).length;
	const fileRef = useRef(null);
	const [uploading, setUploading] = useState(false);
	useEffect(() => {
		refreshUser();
	}, [refreshUser]);
	if (!user) return null;
	const onPickPhoto = async (file) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Selecione uma imagem (JPG, PNG ou WEBP).");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("A imagem deve ter no máximo 5 MB.");
			return;
		}
		setUploading(true);
		try {
			const updated = await authService.uploadAvatar(file);
			setUser(updated);
			toast.success("Foto atualizada.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Falha ao enviar a foto.");
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	};
	const studyMins = user.totalStudyMinutes ?? 0;
	const nextXp = user.nextLevelXp ?? Math.max(user.xp || 1, 1);
	const xpPct = Math.min(100, (user.xp || 0) / nextXp * 100);
	const xpRestante = Math.max(0, nextXp - (user.xp || 0));
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col items-start gap-6 md:flex-row md:items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ jsxs(Avatar, {
							className: "h-24 w-24 border-2 border-primary/30 shadow-glow",
							children: [/* @__PURE__ */ jsx(AvatarImage, {
								src: user.avatarUrl,
								alt: user.name
							}), /* @__PURE__ */ jsx(AvatarFallback, {
								className: "text-xl",
								children: initials(user.name)
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "icon",
							variant: "secondary",
							className: "absolute -bottom-1 -right-1 h-9 w-9 rounded-full shadow",
							disabled: uploading,
							onClick: () => fileRef.current?.click(),
							title: "Alterar foto",
							children: /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx("input", {
							ref: fileRef,
							type: "file",
							accept: "image/jpeg,image/png,image/webp,image/*",
							className: "hidden",
							onChange: (e) => void onPickPhoto(e.target.files?.[0])
						})
					]
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
						user.city && /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: user.city
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: uploading ? "Enviando foto…" : "Clique na câmera para atualizar sua foto."
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
								formatMinutes(studyMins)
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
								value: xpPct,
								className: "mt-2 h-1.5"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									(user.xp || 0).toLocaleString("pt-BR"),
									" / ",
									nextXp.toLocaleString("pt-BR"),
									" XP",
									xpRestante > 0 ? ` · faltam ${xpRestante.toLocaleString("pt-BR")}` : ""
								]
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
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Nome, e-mail e cidade são gerenciados pela escola. Você pode alterar a foto neste portal."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Nome completo" }), /* @__PURE__ */ jsx(Input, {
									value: user.name,
									readOnly: true,
									disabled: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
									type: "email",
									value: user.email,
									readOnly: true,
									disabled: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Telefone" }), /* @__PURE__ */ jsx(Input, {
									value: user.phone || "",
									readOnly: true,
									disabled: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Cidade" }), /* @__PURE__ */ jsx(Input, {
									value: user.city || "—",
									readOnly: true,
									disabled: true
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
