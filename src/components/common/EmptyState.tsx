import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onRetry?: () => void;
  className?: string;
};

/** Empty / error state padrão do portal. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  onRetry,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/80 bg-card/40 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      {description ? <p className="max-w-md text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Tentar de novo
          </Button>
        ) : null}
        {actionLabel && actionTo ? (
          <Button asChild size="sm">
            <Link to={actionTo as never}>{actionLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
