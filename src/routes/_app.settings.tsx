import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Configurações — Aurora" }] }),
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Preferências da conta e da plataforma.</p>
      </header>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Aparência</h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Modo escuro</p>
            <p className="text-sm text-muted-foreground">Reduz o cansaço visual durante estudos noturnos.</p>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Alterar senha</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Senha atual</Label>
            <Input type="password" />
          </div>
          <div />
          <div className="space-y-2">
            <Label>Nova senha</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirmar nova senha</Label>
            <Input type="password" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => toast.success("Senha alterada!")}>Salvar nova senha</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Notificações</h2>
        <div className="mt-4 space-y-3">
          {[
            { label: "Novas aulas", desc: "Avise-me quando novas aulas forem liberadas." },
            { label: "IA Pedagógica", desc: "Respostas e sugestões da IA." },
            { label: "Certificados", desc: "Quando um certificado for gerado." },
          ].map((it) => (
            <div key={it.label} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
              <div>
                <p className="font-medium">{it.label}</p>
                <p className="text-xs text-muted-foreground">{it.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
