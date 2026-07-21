import { n as useAuth } from "./AuthContext-CznbIjur.js";
import { t as certificatesService } from "./notificationsService-Bk97yLrW.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { t as formatDate } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-CzXpCsbD.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Award, Download, Eye } from "lucide-react";
//#region src/routes/_app.certificates.tsx?tsr-split=component
function CertificatesPage() {
	const { user } = useAuth();
	const { data: certificates = [], isLoading } = useQuery({
		queryKey: ["certificates"],
		queryFn: () => certificatesService.list()
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 md:p-8",
		children: [/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-4xl font-semibold",
			children: "Certificados"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-muted-foreground",
			children: "Seus certificados dos cursos concluídos."
		})] }), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-56 rounded-xl" }, i))
		}) : certificates.length === 0 ? /* @__PURE__ */ jsxs(Card, {
			className: "p-12 text-center",
			children: [
				/* @__PURE__ */ jsx(Award, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-4 font-display text-xl",
					children: "Nenhum certificado ainda"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Complete um curso para conquistar seu primeiro certificado."
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: certificates.map((c) => /* @__PURE__ */ jsxs(Card, {
				className: "overflow-hidden p-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative gradient-hero p-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow",
								children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-primary-foreground" })
							}), /* @__PURE__ */ jsx("p", {
								className: "text-right text-xs uppercase tracking-wider text-muted-foreground",
								children: "Aurora EAD"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Certificamos que"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-display text-xl font-semibold",
							children: user?.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "concluiu com aproveitamento"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 font-display text-2xl font-semibold text-balance",
							children: c.courseTitle
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								c.workloadHours,
								"h · Emitido em ",
								formatDate(c.issuedAt)
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2 border-t border-border/60 bg-muted/30 p-3",
					children: [/* @__PURE__ */ jsxs(Button, {
						className: "flex-1 gap-2",
						children: [/* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }), " Visualizar"]
					}), /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						className: "flex-1 gap-2",
						children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), " Baixar PDF"]
					})]
				})]
			}, c.id))
		})]
	});
}
//#endregion
export { CertificatesPage as component };
