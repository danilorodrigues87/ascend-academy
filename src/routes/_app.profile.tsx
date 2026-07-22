import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { coursesService } from "@/services";
import { authService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatMinutes, initials } from "@/utils/format";
import { Camera, Clock, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Perfil — CTI Educacional" }] }),
});

function ProfilePage() {
  const { user, setUser, refreshUser } = useAuth();
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: () => coursesService.list() });
  const completed = courses.filter((c) => c.progressPercent >= 100).length;
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Atualiza XP / tempo de estudo / streak (sessão do login fica desatualizada)
  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  if (!user) return null;

  const onPickPhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem (JPG, PNG ou WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5 MB.");
      return;
    }
    setUploading(true);
    try {
      const updated = await authService.uploadAvatar(file);
      setUser(updated);
      toast.success("Foto atualizada.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao enviar a foto.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const studyMins = user.totalStudyMinutes ?? 0;
  const nextXp = user.nextLevelXp ?? Math.max(user.xp || 1, 1);
  const xpPct = Math.min(100, ((user.xp || 0) / nextXp) * 100);
  const xpRestante = Math.max(0, nextXp - (user.xp || 0));

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-primary/30 shadow-glow">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xl">{initials(user.name)}</AvatarFallback>
          </Avatar>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full shadow"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            title="Alterar foto"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="hidden"
            onChange={(e) => void onPickPhoto(e.target.files?.[0])}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-semibold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          {user.city && <p className="mt-1 text-sm text-muted-foreground">{user.city}</p>}
          <p className="mt-2 text-xs text-muted-foreground">
            {uploading ? "Enviando foto…" : "Clique na câmera para atualizar sua foto."}
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Cursos concluídos</p>
          <p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold">
            <Trophy className="h-6 w-6 text-primary" /> {completed}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Tempo estudado</p>
          <p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold">
            <Clock className="h-6 w-6 text-primary" /> {formatMinutes(studyMins)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Nível / XP</p>
          <p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold">
            <Sparkles className="h-6 w-6 text-primary" /> Nv. {user.level}
          </p>
          <Progress value={xpPct} className="mt-2 h-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">
            {(user.xp || 0).toLocaleString("pt-BR")} / {nextXp.toLocaleString("pt-BR")} XP
            {xpRestante > 0 ? ` · faltam ${xpRestante.toLocaleString("pt-BR")}` : ""}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Dados pessoais</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Nome, e-mail e cidade são gerenciados pela escola. Você pode alterar a foto neste portal.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input value={user.name} readOnly disabled />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={user.email} readOnly disabled />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input value={user.phone || ""} readOnly disabled />
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Input value={user.city || "—"} readOnly disabled />
          </div>
        </div>
      </Card>
    </div>
  );
}
