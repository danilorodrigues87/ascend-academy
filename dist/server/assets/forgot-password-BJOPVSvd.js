import { t as authService } from "./authService-kzsr7Ii9.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Logo } from "./Logo-2ZONwr81.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowLeft, MailCheck } from "lucide-react";
//#region src/routes/forgot-password.tsx?tsr-split=component
function ForgotPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await authService.forgotPassword(email);
			setSent(true);
			toast.success("Enviamos um link para seu email");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro");
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
				children: sent ? /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success",
							children: /* @__PURE__ */ jsx(MailCheck, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-6 font-display text-3xl font-semibold",
							children: "Verifique seu email"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Enviamos um link de recuperação para ",
								/* @__PURE__ */ jsx("span", {
									className: "font-medium text-foreground",
									children: email
								}),
								"."
							]
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-8 gap-2",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/login",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Voltar ao login"]
							})
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Recuperar senha"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Informe seu email e enviaremos um link para redefinir sua senha."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 space-y-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "w-full",
							size: "lg",
							disabled: loading,
							children: loading ? "Enviando..." : "Enviar link"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/login",
							className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Voltar ao login"]
						})
					})
				] })
			})]
		})
	});
}
//#endregion
export { ForgotPage as component };
