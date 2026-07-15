import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { certificatesService } from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Download, Eye } from "lucide-react";
import { formatDate } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app/certificates")({
  component: CertificatesPage,
  head: () => ({ meta: [{ title: "Certificados — Aurora" }] }),
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
        <p className="mt-1 text-muted-foreground">Seus certificados dos cursos concluídos.</p>
      </header>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
        </div>
      ) : certificates.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 font-display text-xl">Nenhum certificado ainda</h3>
          <p className="mt-1 text-sm text-muted-foreground">Complete um curso para conquistar seu primeiro certificado.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((c) => (
            <Card key={c.id} className="overflow-hidden p-0">
              <div className="relative gradient-hero p-8">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <p className="text-right text-xs uppercase tracking-wider text-muted-foreground">
                    Aurora EAD
                  </p>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Certificamos que</p>
                <p className="mt-2 font-display text-xl font-semibold">{user?.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">concluiu com aproveitamento</p>
                <p className="mt-2 font-display text-2xl font-semibold text-balance">{c.courseTitle}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {c.workloadHours}h · Emitido em {formatDate(c.issuedAt)}
                </p>
              </div>
              <div className="flex gap-2 border-t border-border/60 bg-muted/30 p-3">
                <Button className="flex-1 gap-2"><Eye className="h-4 w-4" /> Visualizar</Button>
                <Button variant="outline" className="flex-1 gap-2"><Download className="h-4 w-4" /> Baixar PDF</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
