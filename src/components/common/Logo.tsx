import { GraduationCap } from "lucide-react";

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-primary shadow-glow">
        <GraduationCap className="h-5 w-5 text-primary-foreground" />
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight">Aurora</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Portal do Aluno</span>
        </div>
      )}
    </div>
  );
}
