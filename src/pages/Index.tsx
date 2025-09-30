import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Plataforma de Gestão de Pessoas
        </h1>
        <p className="text-xl text-muted-foreground">
          Organize sua empresa, gerencie colaboradores e otimize seus processos
        </p>
        <Button 
          onClick={() => navigate("/register")} 
          size="lg"
          className="mt-8 transition-colors"
        >
          Começar Cadastro
        </Button>
      </div>
    </div>
  );
};

export default Index;
