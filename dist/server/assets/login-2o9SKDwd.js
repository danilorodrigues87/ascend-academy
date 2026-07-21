import { t as USE_API } from "./http-Bt_p2tgp.js";
import { n as useAuth } from "./AuthContext-Bv-CDmXH.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Logo } from "./Logo-2ZONwr81.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
//#region src/routes/login.tsx?tsr-split=component
function LoginPage() {
	const [email, setEmail] = useState(USE_API ? "" : "ana.souza@exemplo.com.br");
	const [password, setPassword] = useState(USE_API ? "" : "aurora123");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await login({
				email,
				password
			});
			toast.success("Bem-vindo(a) de volta!");
			navigate({ to: "/dashboard" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Falha no login");
			console.error("[login]", err);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid min-h-screen bg-background lg:grid-cols-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative hidden overflow-hidden lg:block",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 gradient-hero" }),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 opacity-40",
					style: {
						backgroundImage: "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&h=1200&fit=crop&auto=format')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						filter: "saturate(1.1)"
					}
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex h-full flex-col justify-between p-12",
					children: [/* @__PURE__ */ jsx(Logo, {}), /* @__PURE__ */ jsxs("div", {
						className: "max-w-lg",
						children: [
							/* @__PURE__ */ jsxs("h1", {
								className: "font-display text-5xl font-semibold leading-tight text-balance",
								children: [
									"Aprenda com uma experiência de aula que ",
									/* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "inspira"
									}),
									"."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg text-muted-foreground",
								children: "Cursos, avaliações inteligentes e uma IA pedagógica ao seu lado. Estude no seu ritmo, com prazer."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex -space-x-2",
									children: [
										1,
										2,
										3,
										4
									].map((i) => /* @__PURE__ */ jsx("img", {
										src: `https://i.pravatar.cc/64?img=${i + 10}`,
										alt: "",
										className: "h-9 w-9 rounded-full border-2 border-background"
									}, i))
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-sm text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-foreground",
										children: "+12.000"
									}), " alunos aprendendo agora"]
								})]
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center p-6 md:p-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-8 lg:hidden",
						children: /* @__PURE__ */ jsx(Logo, {})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display text-3xl font-semibold",
							children: "Entrar"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Bem-vinda de volta. Acesse sua conta para continuar seus estudos."
						})]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ jsx(Input, {
									id: "email",
									type: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "password",
										children: "Senha"
									}), /* @__PURE__ */ jsx(Link, {
										to: "/forgot-password",
										className: "text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
										children: "Esqueci minha senha"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Input, {
										id: "password",
										type: showPassword ? "text" : "password",
										autoComplete: "current-password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setShowPassword((s) => !s),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										"aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
										children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
									})]
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "submit",
								className: "w-full gap-2",
								size: "lg",
								disabled: loading,
								children: [loading ? "Entrando..." : "Entrar", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6",
						children: /* @__PURE__ */ jsx(Card, {
							className: "border-dashed p-4",
							children: USE_API ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "API conectada ao painel-cti"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Use e-mail e senha de um aluno cadastrado no painel (nível Cliente), com matrícula ativa. O login demo (ana.souza) não funciona com a API real."
							})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Credenciais de demonstração (mock)"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 font-mono text-xs",
								children: "ana.souza@exemplo.com.br · aurora123"
							})] })
						})
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-8 text-center text-sm text-muted-foreground",
						children: [
							"Primeiro acesso?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/first-access",
								className: "font-medium text-primary hover:underline",
								children: "Ativar minha conta"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
