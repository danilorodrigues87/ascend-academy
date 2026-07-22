import { n as useAuth } from "./AuthContext-D-o2gIWv.js";
import { t as certificatesService } from "./notificationsService-CuilXXX3.js";
import { t as Button } from "./button-DRsC1qZi.js";
import { t as Skeleton } from "./skeleton-wE5XVTSu.js";
import { t as EmptyState } from "./EmptyState-CuuisWFT.js";
import { t as formatDate } from "./format-BkgF6Xya.js";
import { t as Card } from "./card-BLWafi8D.js";
import { t as Badge } from "./badge-Cc0IblCb.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Award, RefreshCw } from "lucide-react";
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
			children: "Emitidos automaticamente ao concluir 100% do curso. Se a escola atualizar o conteúdo, conclua as novas aulas para renovar."
		})] }), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-56 rounded-xl" }, i))
		}) : certificates.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
			icon: Award,
			title: "Nenhum certificado ainda",
			description: "Complete 100% das unidades de um curso para emitir o certificado automaticamente.",
			actionLabel: "Ir para meus cursos",
			actionTo: "/courses"
		}) : /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: certificates.map((c) => /* @__PURE__ */ jsx(CertificateCard, {
				cert: c,
				studentName: user?.name
			}, c.id))
		})]
	});
}
function CertificateCard({ cert: c, studentName }) {
	const outdated = (c.status ?? "valid") === "outdated";
	return /* @__PURE__ */ jsxs(Card, {
		className: `overflow-hidden p-0 ${outdated ? "opacity-90" : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative gradient-hero p-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow",
						children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-primary-foreground" })
					}), outdated ? /* @__PURE__ */ jsxs(Badge, {
						variant: "secondary",
						className: "gap-1",
						children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-3 w-3" }), " Desatualizado"]
					}) : /* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
						children: "Válido"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground",
					children: "Certificamos que"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 font-display text-xl font-semibold",
					children: studentName
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "concluiu com aproveitamento"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 font-display text-2xl font-semibold text-balance",
					children: c.courseTitle
				}),
				c.schoolName ? /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: c.schoolName
				}) : null,
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						c.workloadHours,
						"h · Emitido em ",
						formatDate(c.issuedAt),
						c.code ? ` · Cód. ${c.code}` : ""
					]
				}),
				outdated && /* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-sm text-amber-700 dark:text-amber-400",
					children: [
						"O curso foi atualizado. Progresso atual: ",
						c.progressPercent ?? 0,
						"%. Conclua o conteúdo novo para renovar o certificado."
					]
				})
			]
		}), outdated ? /* @__PURE__ */ jsx("div", {
			className: "border-t border-border/60 bg-muted/30 p-3",
			children: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "w-full gap-2",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/courses/$courseId",
					params: { courseId: c.courseId },
					children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" }), " Continuar curso"]
				})
			})
		}) : null]
	});
}
//#endregion
export { CertificatesPage as component };
