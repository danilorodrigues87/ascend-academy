import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/authService";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const session = authService.getSession();
    if (session) throw redirect({ to: "/dashboard" });
    throw redirect({ to: "/login" });
  },
  component: () => null,
});
