import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Layout pai de /courses — lista fica no index; aulas nos filhos. */
export const Route = createFileRoute("/_app/courses")({
  component: () => <Outlet />,
});
