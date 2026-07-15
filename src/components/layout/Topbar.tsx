import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Topbar({ unread = 0 }: { unread?: number }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl md:px-6">
      <SidebarTrigger />
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar cursos, aulas, professores..."
          className="h-10 pl-9"
        />
      </div>
      <div className="flex-1 md:hidden" />
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon" className="relative" aria-label="Notificações">
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]">
                {unread}
              </Badge>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
}
