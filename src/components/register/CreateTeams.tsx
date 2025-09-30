import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, ArrowLeft, Plus, X } from "lucide-react";

const teamSchema = z.object({
  name: z.string().min(2, "Nome do time é obrigatório"),
  description: z.string().optional(),
});

type TeamData = z.infer<typeof teamSchema>;

interface CreateTeamsProps {
  onNext: (data: { teams: TeamData[] }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: TeamData[];
}

const CreateTeams = ({ onNext, onBack, onSkip, initialData }: CreateTeamsProps) => {
  const [teams, setTeams] = useState<TeamData[]>(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamData>({
    resolver: zodResolver(teamSchema),
  });

  const addTeam = (data: TeamData) => {
    setTeams([...teams, data]);
    reset();
  };

  const removeTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ teams });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Criar Times</CardTitle>
            <CardDescription className="text-muted-foreground">
              Organize sua empresa em times (opcional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {teams.length > 0 && (
          <div className="space-y-3">
            {teams.map((team, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{team.name}</p>
                  {team.description && (
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTeam(index)}
                  className="transition-colors hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(addTeam)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Time</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Ex: Desenvolvimento, Marketing..."
              className="transition-colors"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva as responsabilidades do time..."
              rows={3}
              className="transition-colors resize-none"
            />
          </div>

          <Button type="submit" variant="outline" className="w-full transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Time
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

export default CreateTeams;
