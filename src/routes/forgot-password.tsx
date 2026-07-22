import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import { ArrowLeft, MailCheck } from "lucide-react";
import { authService } from "@/services/authService";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({
    meta: [{ title: "Recuperar senha — CTI Educacional" }],
  }),
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success("Enviamos um link para seu email");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-full max-w-md">
        <Logo />
        <div className="mt-10">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success">
                <MailCheck className="h-7 w-7" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-semibold">Verifique seu email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enviamos um link de recuperação para <span className="font-medium text-foreground">{email}</span>.
              </p>
              <Button asChild variant="outline" className="mt-8 gap-2">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4" /> Voltar ao login
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-semibold">Recuperar senha</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Informe seu email e enviaremos um link para redefinir sua senha.
              </p>
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar link"}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Voltar ao login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
