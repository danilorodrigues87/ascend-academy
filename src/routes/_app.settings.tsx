import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { authService } from "@/services/authService";
import { useNotificationPrefs } from "@/utils/notificationPrefs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Configurações — CTI Educacional" }] }),
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [prefs, patchPrefs] = useNotificationPrefs();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  const savePassword = async () => {
    setSavingPwd(true);
    try {
      const res = await authService.changePassword(currentPassword, newPassword, confirmPassword);
      toast.success(res.message || "Senha alterada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível alterar a senha.");
    } finally {
      setSavingPwd(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header>
        <h1 className="font-display text-4xl font-semibold">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Preferências da conta e da plataforma.</p>
      </header>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Aparência</h2>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Modo escuro</p>
            <p className="text-sm text-muted-foreground">Reduz o cansaço visual durante estudos noturnos.</p>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Redefinir senha</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use a senha atual. Se esqueceu, saia da conta e use “Esqueci minha senha” na tela de login.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2 md:max-w-sm">
            <Label htmlFor="pwd-current">Senha atual</Label>
            <Input
              id="pwd-current"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd-new">Nova senha</Label>
            <Input
              id="pwd-new"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd-confirm">Confirmar nova senha</Label>
            <Input
              id="pwd-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => void savePassword()}
            disabled={savingPwd || !currentPassword || !newPassword || !confirmPassword}
            className="gap-2"
          >
            {savingPwd ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Salvar nova senha
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Notificações</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Controla o que aparece no sino e na página de notificações deste dispositivo.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
            <div>
              <p className="font-medium">Receber notificações</p>
              <p className="text-xs text-muted-foreground">Desliga todas as notificações no portal.</p>
            </div>
            <Switch
              checked={prefs.enabled}
              onCheckedChange={(v) => {
                patchPrefs({ enabled: v });
                toast.success(v ? "Notificações ativadas." : "Notificações desativadas.");
              }}
            />
          </div>
          {(
            [
              {
                key: "lessons" as const,
                label: "Novas aulas",
                desc: "Avise-me sobre aulas e progresso do curso.",
              },
              {
                key: "ai" as const,
                label: "IA Pedagógica",
                desc: "Respostas e sugestões da IA.",
              },
              {
                key: "certificates" as const,
                label: "Certificados",
                desc: "Quando um certificado for gerado ou atualizado.",
              },
            ] as const
          ).map((it) => (
            <div
              key={it.key}
              className={`flex items-center justify-between rounded-lg border border-border/60 p-3 ${!prefs.enabled ? "opacity-50" : ""}`}
            >
              <div>
                <p className="font-medium">{it.label}</p>
                <p className="text-xs text-muted-foreground">{it.desc}</p>
              </div>
              <Switch
                checked={prefs.enabled && prefs[it.key]}
                disabled={!prefs.enabled}
                onCheckedChange={(v) => patchPrefs({ [it.key]: v })}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
