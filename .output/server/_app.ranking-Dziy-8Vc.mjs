import { p as require_jsx_runtime } from "./_libs/@radix-ui/react-avatar+[...].mjs";
import { r as http, t as USE_API } from "./_ssr/http-s7fgt_qd.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./_ssr/avatar-gunzrkKA.mjs";
import { r as initials } from "./_ssr/format-BkgF6Xya.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { o as Trophy } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.ranking-Dziy-8Vc.js
var import_jsx_runtime = require_jsx_runtime();
async function fetchRanking() {
	if (!USE_API) return {
		entries: [],
		me: null
	};
	return http.get("/ranking");
}
function RankingPage() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["ranking"],
		queryFn: fetchRanking
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold",
				children: "Ranking da escola"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Pontuação dos alunos desta escola (XP por aulas, atividades e role plays)."
			})] }),
			data?.me && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-center gap-4 border-primary/30 bg-primary/5 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Sua posição"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-xl font-semibold",
					children: [
						"#",
						data.me.position,
						" · ",
						data.me.xp,
						" XP · Nível ",
						data.me.level
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "divide-y divide-border/60 overflow-hidden p-0",
				children: isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-none" }, i)) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-muted-foreground",
					children: "Não foi possível carregar o ranking. Execute o SQL database/lms_xp.sql se ainda não rodou."
				}) : (data?.entries ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-muted-foreground",
					children: "Ainda não há pontuações. Conclua aulas para aparecer aqui."
				}) : (data?.entries ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-8 text-sm font-semibold text-muted-foreground",
							children: ["#", e.position ?? "-"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-9 w-9",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: e.avatarUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(e.name) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: e.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Nível ", e.level]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold",
							children: [e.xp, " XP"]
						})
					]
				}, e.id))
			})
		]
	});
}
//#endregion
export { RankingPage as component };
