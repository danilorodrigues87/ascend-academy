import { t as authService } from "./authService-BLjk4SS7.js";
import { t as Button } from "./button-DRsC1qZi.js";
import { t as Label } from "./label-B4PTMSG2.js";
import { t as Input } from "./input-DicJzR9-.js";
import { t as Logo } from "./Logo-2ZONwr81.js";
import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowLeft, KeyRound } from "lucide-react";
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPasswordPage() {
	const { token } = useSearch({ from: "/reset-password" });
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!token) {
			toast.error("Link inválido. Solicite um novo e-mail de recuperação.");
			return;
		}
		if (password !== confirm) {
			toast.error("As senhas não coincidem.");
			return;
		}
		setLoading(true);
		try {
			await authService.resetPassword(token, password);
			setDone(true);
			toast.success("Senha atualizada!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao redefinir senha");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "grid min-h-screen place-items-center bg-background p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ jsx(Logo, {}), /* @__PURE__ */ jsx("div", {
				className: "mt-10",
				children: done ? /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success",
							children: /* @__PURE__ */ jsx(KeyRound, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-6 font-display text-3xl font-semibold",
							children: "Senha redefinida"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Agora você já pode entrar com a nova senha."
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							className: "mt-8",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/login",
								children: "Ir para o login"
							})
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Nova senha"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: token ? "Escolha uma senha com pelo menos 8 caracteres." : "Este link está incompleto. Peça um novo e-mail em Recuperar senha."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "password",
									children: "Nova senha"
								}), /* @__PURE__ */ jsx(Input, {
									id: "password",
									type: "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									disabled: !token
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "confirm",
									children: "Confirmar senha"
								}), /* @__PURE__ */ jsx(Input, {
									id: "confirm",
									type: "password",
									required: true,
									minLength: 8,
									value: confirm,
									onChange: (e) => setConfirm(e.target.value),
									disabled: !token
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "w-full",
								size: "lg",
								disabled: loading || !token,
								children: loading ? "Salvando..." : "Salvar senha"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/forgot-password",
							className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Pedir novo link"]
						})
					})
				] })
			})]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
