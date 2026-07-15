import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { coursesService } from "@/services";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatMinutes, initials } from "@/utils/format";
import { Clock, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Perfil — Aurora" }] }),
});

function ProfilePage() {
  const { user } = useAuth();
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: () => coursesService.list() });
  const completed = courses.filter((c) => c.progressPercent >= 100).length;

  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <Avatar className="h-24 w-24 border-2 border-primary/30 shadow-glow">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-semibold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          {user.bio && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{user.bio}</p>}
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
            <Clock className="h-6 w-6 text-primary" /> {formatMinutes(user.totalStudyMinutes)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Nível / XP</p>
          <p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold">
            <Sparkles className="h-6 w-6 text-primary" /> Nv. {user.level}
          </p>
          <Progress value={(user.xp / 6000) * 100} className="mt-2 h-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">{user.xp.toLocaleString("pt-BR")} XP</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-xl font-semibold">Dados pessoais</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={user.email} />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input defaultValue={user.phone} />
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Input defaultValue={user.city} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Biografia</Label>
            <Textarea defaultValue={user.bio} className="min-h-[100px]" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar alterações</Button>
        </div>
      </Card>
    </div>
  );
}
