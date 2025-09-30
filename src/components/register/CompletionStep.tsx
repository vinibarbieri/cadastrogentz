import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CompletionStepProps {
  data: any;
}

const CompletionStep = ({ data }: CompletionStepProps) => {
  const navigate = useNavigate();

  const handleFinish = () => {
    console.log("Dados do cadastro:", data);
    navigate("/");
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary animate-bounce-gentle" />
          </div>
          <div>
            <CardTitle className="text-2xl">Cadastro Concluído!</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Sua conta foi criada com sucesso
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted rounded-lg p-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Empresa</p>
            <p className="text-lg font-semibold text-foreground">{data.company.name}</p>
          </div>

          {data.collaborators.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Colaboradores</p>
              <p className="text-foreground">{data.collaborators.length} colaborador(es) adicionado(s)</p>
            </div>
          )}

          {data.teams.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Times</p>
              <p className="text-foreground">{data.teams.length} time(s) criado(s)</p>
            </div>
          )}

          {data.roles.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cargos</p>
              <p className="text-foreground">{data.roles.length} cargo(s) definido(s)</p>
            </div>
          )}
        </div>

        <Button onClick={handleFinish} className="w-full transition-colors">
          Ir para a Plataforma
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompletionStep;
