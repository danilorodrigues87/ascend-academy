import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { USE_API } from "@/services/http";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — Aurora Portal do Aluno" },
      { name: "description", content: "Acesse sua conta na plataforma Aurora EAD." },
    ],
  }),
});

function LoginPage() {
  const [email, setEmail] = useState(USE_API ? "" : "ana.souza@exemplo.com.br");
  const [password, setPassword] = useState(USE_API ? "" : "aurora123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Bem-vindo(a) de volta!");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no login");
      console.error("[login]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Hero side */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 gradient-hero" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&h=1200&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Logo />
          <div className="max-w-lg">
            <h1 className="font-display text-5xl font-semibold leading-tight text-balance">
              Aprenda com uma experiência de aula que <span className="text-primary">inspira</span>.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Cursos, avaliações inteligentes e uma IA pedagógica ao seu lado. Estude no seu ritmo, com prazer.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/64?img=${i + 10}`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+12.000</span> alunos aprendendo agora
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold">Entrar</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Bem-vinda de volta. Acesse sua conta para continuar seus estudos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6">
            <Card className="border-dashed p-4">
              {USE_API ? (
                <>
                  <p className="text-xs font-medium text-muted-foreground">API conectada ao painel-cti</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use e-mail e senha de um aluno cadastrado no painel (nível Cliente), com matrícula ativa.
                    O login demo (ana.souza) não funciona com a API real.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-medium text-muted-foreground">Credenciais de demonstração (mock)</p>
                  <p className="mt-1 font-mono text-xs">ana.souza@exemplo.com.br · aurora123</p>
                </>
              )}
            </Card>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Primeiro acesso?{" "}
            <Link to="/first-access" className="font-medium text-primary hover:underline">
              Ativar minha conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
