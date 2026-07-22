import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "@/services";
import { filterNotificationsByPrefs, useNotificationPrefs } from "@/utils/notificationPrefs";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [clientReady, setClientReady] = useState(false);
  const [prefs] = useNotificationPrefs();

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (clientReady && !loading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [clientReady, isAuthenticated, loading, navigate]);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsService.list(),
    enabled: clientReady && isAuthenticated,
  });
  const visible = filterNotificationsByPrefs(notifications, prefs);
  const unread = visible.filter((n) => !n.read).length;

  if (!clientReady || loading || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="min-w-0 flex-1">
          <Topbar unread={unread} />
          <main className="flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
