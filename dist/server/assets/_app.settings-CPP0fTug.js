import { n as useTheme } from "./ThemeContext-QMQ0j3Uz.js";
import { t as authService } from "./authService-BLjk4SS7.js";
import { n as cn, t as Button } from "./button-DRsC1qZi.js";
import { t as Card } from "./card-BLWafi8D.js";
import { t as Label } from "./label-B4PTMSG2.js";
import { t as Input } from "./input-DicJzR9-.js";
import { n as useNotificationPrefs } from "./notificationPrefs-C1vBJD-L.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/routes/_app.settings.tsx?tsr-split=component
function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const [prefs, patchPrefs] = useNotificationPrefs();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [savingPwd, setSavingPwd] = useState(false);
	const savePassword = async () => {
		setSavingPwd(true);
		try {
			const res = await authService.changePassword(currentPassword, newPassword, confirmPassword);
			toast.success(res.message || "Senha alterada com sucesso.");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Não foi possível alterar a senha.");
		} finally {
			setSavingPwd(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Configurações"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-muted-foreground",
				children: "Preferências da conta e da plataforma."
			})] }),
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-xl font-semibold",
					children: "Aparência"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "font-medium",
						children: "Modo escuro"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Reduz o cansaço visual durante estudos noturnos."
					})] }), /* @__PURE__ */ jsx(Switch, {
						checked: theme === "dark",
						onCheckedChange: (v) => setTheme(v ? "dark" : "light")
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-semibold",
						children: "Redefinir senha"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Use a senha atual. Se esqueceu, saia da conta e use “Esqueci minha senha” na tela de login."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2 md:col-span-2 md:max-w-sm",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "pwd-current",
									children: "Senha atual"
								}), /* @__PURE__ */ jsx(Input, {
									id: "pwd-current",
									type: "password",
									autoComplete: "current-password",
									value: currentPassword,
									onChange: (e) => setCurrentPassword(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "pwd-new",
									children: "Nova senha"
								}), /* @__PURE__ */ jsx(Input, {
									id: "pwd-new",
									type: "password",
									autoComplete: "new-password",
									value: newPassword,
									onChange: (e) => setNewPassword(e.target.value),
									placeholder: "Mínimo 8 caracteres"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "pwd-confirm",
									children: "Confirmar nova senha"
								}), /* @__PURE__ */ jsx(Input, {
									id: "pwd-confirm",
									type: "password",
									autoComplete: "new-password",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex justify-end",
						children: /* @__PURE__ */ jsxs(Button, {
							onClick: () => void savePassword(),
							disabled: savingPwd || !currentPassword || !newPassword || !confirmPassword,
							className: "gap-2",
							children: [savingPwd ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : null, "Salvar nova senha"]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-semibold",
						children: "Notificações"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Controla o que aparece no sino e na página de notificações deste dispositivo."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between rounded-lg border border-border/60 p-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: "Receber notificações"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Desliga todas as notificações no portal."
							})] }), /* @__PURE__ */ jsx(Switch, {
								checked: prefs.enabled,
								onCheckedChange: (v) => {
									patchPrefs({ enabled: v });
									toast.success(v ? "Notificações ativadas." : "Notificações desativadas.");
								}
							})]
						}), [
							{
								key: "lessons",
								label: "Novas aulas",
								desc: "Avise-me sobre aulas e progresso do curso."
							},
							{
								key: "ai",
								label: "IA Pedagógica",
								desc: "Respostas e sugestões da IA."
							},
							{
								key: "certificates",
								label: "Certificados",
								desc: "Quando um certificado for gerado ou atualizado."
							}
						].map((it) => /* @__PURE__ */ jsxs("div", {
							className: `flex items-center justify-between rounded-lg border border-border/60 p-3 ${!prefs.enabled ? "opacity-50" : ""}`,
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: it.label
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: it.desc
							})] }), /* @__PURE__ */ jsx(Switch, {
								checked: prefs.enabled && prefs[it.key],
								disabled: !prefs.enabled,
								onCheckedChange: (v) => patchPrefs({ [it.key]: v })
							})]
						}, it.key))]
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
