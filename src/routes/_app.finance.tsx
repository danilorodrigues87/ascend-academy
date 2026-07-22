import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { financeService } from "@/services";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { Wallet } from "lucide-react";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/_app/finance")({
  component: FinancePage,
  head: () => ({ meta: [{ title: "Financeiro — CTI Educacional" }] }),
});

function formatBrl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function statusBadge(status: string) {
  if (status === "paid") return <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">Pago</Badge>;
  if (status === "overdue") return <Badge variant="destructive">Vencido</Badge>;
  return <Badge variant="secondary">Em aberto</Badge>;
}

function FinancePage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["finance"],
    queryFn: () => financeService.summary(),
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Financeiro</h1>
        <p className="mt-1 text-muted-foreground">
          Resumo das suas mensalidades e acordos. Pagamentos são feitos na escola (carnê / PIX).
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={Wallet}
          title="Não foi possível carregar o financeiro"
          onRetry={() => void refetch()}
        />
      ) : !data?.hasFinance ? (
        <EmptyState
          icon={Wallet}
          title="Nenhum lançamento financeiro"
          description="Quando a escola registrar mensalidades ou acordos, eles aparecem aqui."
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Pago</p>
              <p className="mt-1 font-display text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {formatBrl(data.totals.paid)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Em aberto</p>
              <p className="mt-1 font-display text-xl font-semibold">{formatBrl(data.totals.open)}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Vencido</p>
              <p className="mt-1 font-display text-xl font-semibold text-destructive">
                {formatBrl(data.totals.overdue)}
              </p>
            </Card>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="divide-y divide-border/60">
              {data.items.map((it) => (
                <div key={it.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{it.description}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {it.origin}
                      {it.dueDate ? ` · Venc. ${formatDate(it.dueDate)}` : ""}
                      {it.paymentType ? ` · ${it.paymentType}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatBrl(it.amount)}</p>
                    <div className="mt-1 flex justify-end">{statusBadge(it.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
