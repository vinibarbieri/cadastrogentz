import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowLeft, Plus, X } from "lucide-react";

const roleSchema = z.object({
  title: z.string().min(2, "Título do cargo é obrigatório"),
  description: z.string().optional(),
});

type RoleData = z.infer<typeof roleSchema>;

interface CreateRolesProps {
  onNext: (data: { roles: RoleData[] }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: RoleData[];
}

const CreateRoles = ({ onNext, onBack, onSkip, initialData }: CreateRolesProps) => {
  const [roles, setRoles] = useState<RoleData[]>(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleData>({
    resolver: zodResolver(roleSchema),
  });

  const addRole = (data: RoleData) => {
    setRoles([...roles, data]);
    reset();
  };

  const removeRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ roles });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Criar Cargos</CardTitle>
            <CardDescription className="text-muted-foreground">
              Defina os cargos da sua empresa (opcional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {roles.length > 0 && (
          <div className="space-y-3">
            {roles.map((role, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{role.title}</p>
                  {role.description && (
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRole(index)}
                  className="transition-colors hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(addRole)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Cargo</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ex: Gerente, Analista, Coordenador..."
              className="transition-colors"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva as responsabilidades do cargo..."
              rows={3}
              className="transition-colors resize-none"
            />
          </div>

          <Button type="submit" variant="outline" className="w-full transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cargo
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
            Finalizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateRoles;
