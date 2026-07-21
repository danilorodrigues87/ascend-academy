import { t as authService } from "./authService-kzsr7Ii9.js";
import { n as useAuth } from "./AuthContext-CznbIjur.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Logo } from "./Logo-2ZONwr81.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
//#region src/routes/first-access.tsx?tsr-split=component
function FirstAccessPage() {
	const [token, setToken] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const submit = async (e) => {
		e.preventDefault();
		if (password !== confirm) return toast.error("As senhas não conferem");
		if (password.length < 6) return toast.error("A senha deve ter pelo menos 6 caracteres");
		setLoading(true);
		try {
			await authService.firstAccess({
				email,
				password,
				token: token || "demo"
			});
			await login({
				email,
				password
			});
			toast.success("Conta ativada! Bem-vinda(o).");
			navigate({ to: "/dashboard" });
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
			children: [/* @__PURE__ */ jsx(Logo, {}), /* @__PURE__ */ jsxs("div", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Primeiro acesso"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Ative sua conta com o código enviado por email e defina sua senha."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "token",
									children: "Código de ativação"
								}), /* @__PURE__ */ jsx(Input, {
									id: "token",
									placeholder: "Ex.: A1B2-C3D4",
									value: token,
									onChange: (e) => setToken(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
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
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "password",
										children: "Nova senha"
									}), /* @__PURE__ */ jsx(Input, {
										id: "password",
										type: "password",
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value)
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "confirm",
										children: "Confirmar"
									}), /* @__PURE__ */ jsx(Input, {
										id: "confirm",
										type: "password",
										required: true,
										value: confirm,
										onChange: (e) => setConfirm(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "w-full",
								size: "lg",
								disabled: loading,
								children: loading ? "Ativando..." : "Ativar conta"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/login",
							className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Já tenho conta"]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { FirstAccessPage as component };
