import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

const collaboratorSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  role: z.string().min(1, "Cargo é obrigatório"),
  team: z.string().optional(),
  manager: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  hasLogin: z.boolean(),
}).refine((data) => {
  if (data.hasLogin) {
    return data.email && data.password;
  }
  return true;
}, {
  message: "Email e senha são obrigatórios para colaboradores com login",
  path: ["email"],
});

type CollaboratorData = z.infer<typeof collaboratorSchema>;

interface AddCollaboratorsProps {
  onNext: (data: { collaborators: CollaboratorData[] }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: CollaboratorData[];
  roles: Array<{ title: string }>;
  teams: Array<{ name: string }>;
}

const AddCollaborators = ({ onNext, onBack, onSkip, initialData, roles, teams }: AddCollaboratorsProps) => {
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>(initialData);
  const [hasLogin, setHasLogin] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CollaboratorData>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: { hasLogin: false },
  });

  const loginCollaboratorsCount = collaborators.filter(c => c.hasLogin).length;

  const addCollaborator = (data: CollaboratorData) => {
    if (data.hasLogin && loginCollaboratorsCount >= 2) {
      toast.error("Você pode adicionar no máximo 2 colaboradores com login");
      return;
    }
    setCollaborators([...collaborators, data]);
    reset();
    setHasLogin(false);
  };

  const removeCollaborator = (index: number) => {
    setCollaborators(collaborators.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ collaborators });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Adicionar Colaboradores</CardTitle>
            <CardDescription className="text-muted-foreground">
              Adicione colaboradores da sua empresa (opcional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {collaborators.length > 0 && (
          <div className="space-y-3">
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{collaborator.name}</p>
                  <p className="text-sm text-muted-foreground">Cargo: {collaborator.role}</p>
                  {collaborator.team && (
                    <p className="text-xs text-muted-foreground">Time: {collaborator.team}</p>
                  )}
                  {collaborator.manager && (
                    <p className="text-xs text-muted-foreground">Gestor: {collaborator.manager}</p>
                  )}
                  {collaborator.hasLogin && (
                    <p className="text-xs text-primary">✓ Terá login no sistema</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCollaborator(index)}
                  className="transition-colors hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(addCollaborator)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Colaborador</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Nome completo"
              className="transition-colors"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Cargo</Label>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger className="transition-colors">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role, index) => (
                  <SelectItem key={index} value={role.title}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Time (opcional)</Label>
            <Select onValueChange={(value) => setValue("team", value)}>
              <SelectTrigger className="transition-colors">
                <SelectValue placeholder="Selecione um time" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team, index) => (
                  <SelectItem key={index} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager">Gestor (opcional)</Label>
            <Input
              id="manager"
              {...register("manager")}
              placeholder="Nome do gestor"
              className="transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="hasLogin"
              checked={hasLogin}
              onCheckedChange={(checked) => {
                setHasLogin(checked as boolean);
                setValue("hasLogin", checked as boolean);
              }}
              disabled={loginCollaboratorsCount >= 2 && !hasLogin}
            />
            <Label htmlFor="hasLogin" className="cursor-pointer">
              Este colaborador terá login no sistema ({loginCollaboratorsCount}/2)
            </Label>
          </div>

          {hasLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@exemplo.com"
                  className="transition-colors"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Senha de acesso"
                  className="transition-colors"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            </>
          )}

          <Button type="submit" variant="outline" className="w-full transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Colaborador
          </Button>
        </form>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onSkip}
            className="flex-1 transition-colors"
          >
            Pular esta etapa
          </Button>
          <Button onClick={handleNext} className="flex-1 transition-colors">
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddCollaborators;
