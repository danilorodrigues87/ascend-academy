import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import { authService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/first-access")({
  component: FirstAccessPage,
  head: () => ({ meta: [{ title: "Primeiro acesso — Aurora" }] }),
});

function FirstAccessPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("As senhas não conferem");
    if (password.length < 6) return toast.error("A senha deve ter pelo menos 6 caracteres");
    setLoading(true);
    try {
      await authService.firstAccess({ email, password, token: token || "demo" });
      await login({ email, password });
      toast.success("Conta ativada! Bem-vinda(o).");
      navigate({ to: "/dashboard" });
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
          <h1 className="font-display text-3xl font-semibold">Primeiro acesso</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ative sua conta com o código enviado por email e defina sua senha.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="token">Código de ativação</Label>
              <Input id="token" placeholder="Ex.: A1B2-C3D4" value={token} onChange={(e) => setToken(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar</Label>
                <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Ativando..." : "Ativar conta"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Já tenho conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
