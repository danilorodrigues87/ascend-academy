import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { certificatesService } from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { Award, RefreshCw } from "lucide-react";
import { formatDate } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";
import type { Certificate } from "@/types";

export const Route = createFileRoute("/_app/certificates")({
  component: CertificatesPage,
  head: () => ({ meta: [{ title: "Certificados — CTI Educacional" }] }),
});

function CertificatesPage() {
  const { user } = useAuth();
  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => certificatesService.list(),
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Certificados</h1>
        <p className="mt-1 text-muted-foreground">
          Emitidos automaticamente ao concluir 100% do curso. Se a escola atualizar o conteúdo, conclua as novas aulas
          para renovar.
        </p>
      </header>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="Nenhum certificado ainda"
          description="Complete 100% das unidades de um curso para emitir o certificado automaticamente."
          actionLabel="Ir para meus cursos"
          actionTo="/courses"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((c) => (
            <CertificateCard key={c.id} cert={c} studentName={user?.name} />
          ))}
        </div>
      )}
    </div>
  );
}

function CertificateCard({ cert: c, studentName }: { cert: Certificate; studentName?: string }) {
  const outdated = (c.status ?? "valid") === "outdated";

  return (
    <Card className={`overflow-hidden p-0 ${outdated ? "opacity-90" : ""}`}>
      <div className="relative gradient-hero p-8">
        <div className="flex items-start justify-between gap-2">
          <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow">
            <Award className="h-6 w-6 text-primary-foreground" />
          </div>
          {outdated ? (
            <Badge variant="secondary" className="gap-1">
              <RefreshCw className="h-3 w-3" /> Desatualizado
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              Válido
            </Badge>
          )}
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Certificamos que</p>
        <p className="mt-2 font-display text-xl font-semibold">{studentName}</p>
        <p className="mt-1 text-sm text-muted-foreground">concluiu com aproveitamento</p>
        <p className="mt-2 font-display text-2xl font-semibold text-balance">{c.courseTitle}</p>
        {c.schoolName ? <p className="mt-1 text-sm text-muted-foreground">{c.schoolName}</p> : null}
        <p className="mt-2 text-xs text-muted-foreground">
          {c.workloadHours}h · Emitido em {formatDate(c.issuedAt)}
          {c.code ? ` · Cód. ${c.code}` : ""}
        </p>
        {outdated && (
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
            O curso foi atualizado. Progresso atual: {c.progressPercent ?? 0}%. Conclua o conteúdo novo para renovar o
            certificado.
          </p>
        )}
      </div>
      {outdated ? (
        <div className="border-t border-border/60 bg-muted/30 p-3">
          <Button asChild className="w-full gap-2">
            <Link to="/courses/$courseId" params={{ courseId: c.courseId }}>
              <RefreshCw className="h-4 w-4" /> Continuar curso
            </Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
