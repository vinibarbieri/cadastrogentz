import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, Plus, X } from "lucide-react";

const collaboratorSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  role: z.string().min(2, "Função é obrigatória"),
});

type CollaboratorData = z.infer<typeof collaboratorSchema>;

interface AddCollaboratorsProps {
  onNext: (data: { collaborators: CollaboratorData[] }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: CollaboratorData[];
}

const AddCollaborators = ({ onNext, onBack, onSkip, initialData }: AddCollaboratorsProps) => {
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollaboratorData>({
    resolver: zodResolver(collaboratorSchema),
  });

  const addCollaborator = (data: CollaboratorData) => {
    if (collaborators.length < 2) {
      setCollaborators([...collaborators, data]);
      reset();
    }
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
              Adicione até 2 colaboradores com acesso ao sistema (opcional)
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
                  <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                  <p className="text-sm text-muted-foreground">{collaborator.role}</p>
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

        {collaborators.length < 2 && (
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
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="colaborador@email.com"
                className="transition-colors"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Input
                id="role"
                {...register("role")}
                placeholder="Ex: Gerente, Analista..."
                className="transition-colors"
              />
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            <Button type="submit" variant="outline" className="w-full transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Colaborador
            </Button>
          </form>
        )}

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
