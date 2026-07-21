export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/brand/cti-logo.png"
        alt="CTI Educacional"
        className="h-9 w-9 shrink-0 rounded-xl object-contain"
      />
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight">CTI Educacional</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Portal do Aluno
          </span>
        </div>
      )}
    </div>
  );
}
