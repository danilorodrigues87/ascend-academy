import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as authService } from "./authService-DJollOv2.mjs";
import { n as useAuth } from "./AuthContext-D4cYmnFW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Logo } from "./Logo-2ZONwr81.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { at as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/first-access-CJkmpWSb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FirstAccessPage() {
	const [token, setToken] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: "Primeiro acesso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Ative sua conta com o código enviado por email e defina sua senha."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "token",
									children: "Código de ativação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "token",
									placeholder: "Ex.: A1B2-C3D4",
									value: token,
									onChange: (e) => setToken(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Nova senha"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "confirm",
										children: "Confirmar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "confirm",
										type: "password",
										required: true,
										value: confirm,
										onChange: (e) => setConfirm(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								size: "lg",
								disabled: loading,
								children: loading ? "Ativando..." : "Ativar conta"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Já tenho conta"]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { FirstAccessPage as component };
