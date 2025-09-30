import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, ArrowLeft, Plus, X } from "lucide-react";

const competencySchema = z.object({
  title: z.string().min(2, "Título da competência é obrigatório"),
  team: z.string().optional(),
  type: z.string().min(1, "Tipo é obrigatório"),
});

type CompetencyData = z.infer<typeof competencySchema>;

interface CreateCompetenciesProps {
  onNext: (data: { competencies: CompetencyData[] }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: CompetencyData[];
  teams: Array<{ name: string }>;
}

const CreateCompetencies = ({ onNext, onBack, onSkip, initialData, teams }: CreateCompetenciesProps) => {
  const [competencies, setCompetencies] = useState<CompetencyData[]>(initialData);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CompetencyData>({
    resolver: zodResolver(competencySchema),
  });

  const addCompetency = (data: CompetencyData) => {
    setCompetencies([...competencies, data]);
    reset();
  };

  const removeCompetency = (index: number) => {
    setCompetencies(competencies.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({ competencies });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Criar Competências</CardTitle>
            <CardDescription className="text-muted-foreground">
              Defina as competências necessárias (opcional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {competencies.length > 0 && (
          <div className="space-y-3">
            {competencies.map((competency, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{competency.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Tipo: {competency.type === "technical" ? "Técnica" : "Comportamental"}
                  </p>
                  {competency.team && (
                    <p className="text-xs text-muted-foreground">Time: {competency.team}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCompetency(index)}
                  className="transition-colors hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(addCompetency)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Competência</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ex: React, Liderança, Comunicação..."
              className="transition-colors"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select onValueChange={(value) => setValue("type", value)}>
              <SelectTrigger className="transition-colors">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Técnica</SelectItem>
                <SelectItem value="behavioral">Comportamental</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
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

          <Button type="submit" variant="outline" className="w-full transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Competência
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

export default CreateCompetencies;
