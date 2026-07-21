import { n as useTheme } from "./ThemeContext-QMQ0j3Uz.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
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
					className: "mt-4 flex items-center justify-between",
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
						children: "Alterar senha"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Senha atual" }), /* @__PURE__ */ jsx(Input, { type: "password" })]
							}),
							/* @__PURE__ */ jsx("div", {}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Nova senha" }), /* @__PURE__ */ jsx(Input, { type: "password" })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Confirmar nova senha" }), /* @__PURE__ */ jsx(Input, { type: "password" })]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex justify-end",
						children: /* @__PURE__ */ jsx(Button, {
							onClick: () => toast.success("Senha alterada!"),
							children: "Salvar nova senha"
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-xl font-semibold",
					children: "Notificações"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-3",
					children: [
						{
							label: "Novas aulas",
							desc: "Avise-me quando novas aulas forem liberadas."
						},
						{
							label: "IA Pedagógica",
							desc: "Respostas e sugestões da IA."
						},
						{
							label: "Certificados",
							desc: "Quando um certificado for gerado."
						}
					].map((it) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between rounded-lg border border-border/60 p-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-medium",
							children: it.label
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: it.desc
						})] }), /* @__PURE__ */ jsx(Switch, { defaultChecked: true })]
					}, it.label))
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
