import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Layout pai das aulas — só Outlet (redirect fica no index). */
export const Route = createFileRoute("/_app/courses/$courseId")({
  component: () => <Outlet />,
  head: () => ({ meta: [{ title: "Curso — CTI Educacional" }] }),
});
