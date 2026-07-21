import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./_ssr/AuthContext-D4cYmnFW.mjs";
import { t as certificatesService } from "./_ssr/notificationsService-W8l6LgJg.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as formatDate } from "./_ssr/format-BkgF6Xya.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { B as Eye, U as Download, rt as Award } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.certificates-C_TmQraj.js
var import_jsx_runtime = require_jsx_runtime();
function CertificatesPage() {
	const { user } = useAuth();
	const { data: certificates = [], isLoading } = useQuery({
		queryKey: ["certificates"],
		queryFn: () => certificatesService.list()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-semibold",
			children: "Certificados"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Seus certificados dos cursos concluídos."
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-56 rounded-xl" }, i))
		}) : certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 font-display text-xl",
					children: "Nenhum certificado ainda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Complete um curso para conquistar seu primeiro certificado."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: certificates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative gradient-hero p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-6 w-6 text-primary-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-right text-xs uppercase tracking-wider text-muted-foreground",
								children: "Aurora EAD"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Certificamos que"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-xl font-semibold",
							children: user?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "concluiu com aproveitamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl font-semibold text-balance",
							children: c.courseTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								c.workloadHours,
								"h · Emitido em ",
								formatDate(c.issuedAt)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 border-t border-border/60 bg-muted/30 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " Visualizar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Baixar PDF"]
					})]
				})]
			}, c.id))
		})]
	});
}
//#endregion
export { CertificatesPage as component };
