import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.courses._courseId.lessons._lessonId-ykLDh9tn.js
var $$splitComponentImporter = () => import("./_app.courses._courseId.lessons._lessonId-BFL5vjE7.mjs");
var Route = createFileRoute("/_app/courses/$courseId/lessons/$lessonId")({
	validateSearch: (s) => ({
		panel: s.panel === "ai" ? "ai" : "content",
		item: typeof s.item === "string" ? s.item : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Aula â€” CTI Educacional" }] })
});
//#endregion
export { Route as t };
