import { useState } from "react";
import { Building2, Users, Briefcase, UserPlus } from "lucide-react";
import StepIndicator from "@/components/register/StepIndicator";
import CompanyRegistration from "@/components/register/CompanyRegistration";
import CompanyDetails from "@/components/register/CompanyDetails";
import AddCollaborators from "@/components/register/AddCollaborators";
import CreateTeams from "@/components/register/CreateTeams";
import CreateRoles from "@/components/register/CreateRoles";
import CompletionStep from "@/components/register/CompletionStep";

const steps = [
  { id: 1, title: "Cadastro", icon: Building2, required: true },
  { id: 2, title: "Detalhes da Empresa", icon: Building2, required: false },
  { id: 3, title: "Colaboradores", icon: Users, required: false },
  { id: 4, title: "Times", icon: UserPlus, required: false },
  { id: 5, title: "Cargos", icon: Briefcase, required: false },
];

interface RegistrationData {
  company: {
    email: string;
    password: string;
    cnpj: string;
    name: string;
  };
  companyDetails: {
    sector: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  collaborators: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  teams: Array<{
    name: string;
    description: string;
  }>;
  roles: Array<{
    title: string;
    description: string;
  }>;
}

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    company: { email: "", password: "", cnpj: "", name: "" },
    companyDetails: { sector: "", description: "", address: "", city: "", state: "", zipCode: "" },
    collaborators: [],
    teams: [],
    roles: [],
  });

  const handleNext = (data?: any) => {
    if (data) {
      setRegistrationData((prev) => ({ ...prev, ...data }));
    }
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length && !steps[currentStep - 1].required) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyRegistration onNext={handleNext} initialData={registrationData.company} />;
      case 2:
        return (
          <CompanyDetails
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.companyDetails}
          />
        );
      case 3:
        return (
          <AddCollaborators
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.collaborators}
          />
        );
      case 4:
        return (
          <CreateTeams
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.teams}
          />
        );
      case 5:
        return (
          <CreateRoles
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.roles}
          />
        );
      case 6:
        return <CompletionStep data={registrationData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentStep <= steps.length && (
          <StepIndicator steps={steps} currentStep={currentStep} />
        )}
        <div className="mt-8 animate-slide-in">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Register;
