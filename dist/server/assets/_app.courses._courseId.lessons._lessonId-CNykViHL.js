import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/_app.courses.$courseId.lessons.$lessonId.tsx
var $$splitComponentImporter = () => import("./_app.courses._courseId.lessons._lessonId-D9YBwQzq.js");
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
