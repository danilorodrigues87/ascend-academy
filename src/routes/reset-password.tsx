import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import { ArrowLeft, KeyRound } from "lucide-react";
import { authService } from "@/services/authService";

type Search = { token?: string };

export const Route = createFileRoute("/reset-password")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    token: typeof s.token === "string" ? s.token : undefined,
  }),
  component: ResetPasswordPage,
  head: () => ({
    meta: [{ title: "Nova senha — CTI Educacional" }],
  }),
});

function ResetPasswordPage() {
  const { token } = useSearch({ from: "/reset-password" });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Link inválido. Solicite um novo e-mail de recuperação.");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setDone(true);
      toast.success("Senha atualizada!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-full max-w-md">
        <Logo />
        <div className="mt-10">
          {done ? (
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success">
                <KeyRound className="h-7 w-7" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-semibold">Senha redefinida</h1>
              <p className="mt-2 text-sm text-muted-foreground">Agora você já pode entrar com a nova senha.</p>
              <Button asChild className="mt-8">
                <Link to="/login">Ir para o login</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-semibold">Nova senha</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {token
                  ? "Escolha uma senha com pelo menos 8 caracteres."
                  : "Este link está incompleto. Peça um novo e-mail em Recuperar senha."}
              </p>
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!token}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmar senha</Label>
                  <Input
                    id="confirm"
                    type="password"
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    disabled={!token}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading || !token}>
                  {loading ? "Salvando..." : "Salvar senha"}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link
                  to="/forgot-password"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Pedir novo link
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
