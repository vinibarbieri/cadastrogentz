import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft } from "lucide-react";

const schema = z.object({
  sector: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CompanyDetailsProps {
  onNext: (data: { companyDetails: FormData }) => void;
  onBack: () => void;
  onSkip: () => void;
  initialData: FormData;
}

const CompanyDetails = ({ onNext, onBack, onSkip, initialData }: CompanyDetailsProps) => {
  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const onSubmit = (data: FormData) => {
    onNext({ companyDetails: data });
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Detalhes da Empresa</CardTitle>
            <CardDescription className="text-muted-foreground">
              Informe mais dados sobre sua empresa (opcional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sector">Área de Atuação</Label>
            <Input
              id="sector"
              {...register("sector")}
              placeholder="Ex: Tecnologia, Varejo, Serviços..."
              className="transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Produto/Serviço</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva o que sua empresa faz..."
              rows={4}
              className="transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Rua, número"
                className="transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="Cidade"
                className="transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register("state")}
                placeholder="UF"
                maxLength={2}
                className="transition-colors"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                {...register("zipCode")}
                placeholder="00000-000"
                className="transition-colors"
              />
            </div>
          </div>

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
            <Button type="submit" className="flex-1 transition-colors">
              Continuar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
