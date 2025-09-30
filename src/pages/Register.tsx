import { useState } from "react";
import { Building2, Users, Briefcase, UserPlus, Target } from "lucide-react";
import StepIndicator from "@/components/register/StepIndicator";
import CompanyRegistration from "@/components/register/CompanyRegistration";
import CompanyDetails from "@/components/register/CompanyDetails";
import CreateTeams from "@/components/register/CreateTeams";
import CreateRoles from "@/components/register/CreateRoles";
import CreateCompetencies from "@/components/register/CreateCompetencies";
import AddCollaborators from "@/components/register/AddCollaborators";
import CompletionStep from "@/components/register/CompletionStep";

const steps = [
  { id: 1, title: "Cadastro", icon: Building2, required: true },
  { id: 2, title: "Detalhes da Empresa", icon: Building2, required: false },
  { id: 3, title: "Times", icon: UserPlus, required: false },
  { id: 4, title: "Cargos", icon: Briefcase, required: false },
  { id: 5, title: "Competências", icon: Target, required: false },
  { id: 6, title: "Colaboradores", icon: Users, required: false },
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
    financialData: string;
    companyValues: string;
  };
  teams: Array<{
    name: string;
    objectives: string;
    location: string;
    parentTeam: string;
  }>;
  roles: Array<{
    title: string;
    level: string;
    team: string;
  }>;
  competencies: Array<{
    title: string;
    team: string;
    type: string;
  }>;
  collaborators: Array<{
    name: string;
    role: string;
    team: string;
    manager: string;
    email: string;
    password: string;
    hasLogin: boolean;
  }>;
}

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    company: { email: "", password: "", cnpj: "", name: "" },
    companyDetails: { sector: "", description: "", address: "", financialData: "", companyValues: "" },
    teams: [],
    roles: [],
    competencies: [],
    collaborators: [],
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
          <CreateTeams
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.teams}
          />
        );
      case 4:
        return (
          <CreateRoles
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.roles}
            teams={registrationData.teams}
          />
        );
      case 5:
        return (
          <CreateCompetencies
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.competencies}
            teams={registrationData.teams}
          />
        );
      case 6:
        return (
          <AddCollaborators
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            initialData={registrationData.collaborators}
            roles={registrationData.roles}
            teams={registrationData.teams}
          />
        );
      case 7:
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
