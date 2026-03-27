import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth.service";
import {
  savePasswordRecoveryContext,
  clearPasswordRecoveryContext,
} from "@/utils/passwordRecovery";
import { showAlertError, showAlertSuccess } from "@/utils/alerts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeInputCard from "./components/CodeInputCard";
import RecoveryPasswordForm, {
  RecoveryPasswordInputs,
} from "./components/RecoveryPasswordForm";

export function RecoveryPassword() {
  const [code, setCode] = useState("");
  const [requestedDomain, setRequestedDomain] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [wasValidationAttempted, setWasValidationAttempted] = useState(false);

  const navigate = useNavigate();

  const handleGenerateCode = async (data: RecoveryPasswordInputs) => {
    try {
      setIsGeneratingCode(true);
      clearPasswordRecoveryContext();

      const generatedToken = await authService.createRecoveryPasswordToken({
        domain: data.domain.trim(),
      });

      setRequestedDomain(generatedToken.domain);
      setCode("");
      setWasValidationAttempted(false);
      showAlertSuccess(generatedToken.message);
    } catch (error) {
      showAlertError(
        getApiErrorMessage(
          error,
          "Nao foi possivel gerar o codigo de recuperacao.",
        ),
      );
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleValidateCode = async () => {
    if (!requestedDomain || code.length !== 6) {
      return;
    }

    try {
      setIsContinuing(true);
      setWasValidationAttempted(false);

      await authService.validateRecoveryPasswordToken({
        domain: requestedDomain,
        code,
      });

      savePasswordRecoveryContext({
        domain: requestedDomain,
        code,
      });
      navigate("/redefinir-senha");
    } catch (error) {
      setWasValidationAttempted(true);
      showAlertError(
        getApiErrorMessage(error, "Codigo de recuperacao invalido."),
      );
    } finally {
      setIsContinuing(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-black dark:text-white text-center text-3xl md:text-5xl font-bold font-primary tracking-wide mb-10">
        GERENCIADOR DE BLOGS
      </h1>
      <div className="w-full max-w-[440px]">
        <HeaderNavigation screenTitle="Recuperar senha" />
        <h3 className="text-black dark:text-white text-lg md:text-xl font-bold font-primary my-6">
          {requestedDomain ? "Código de recuperação" : "Gerar código de recuperação"}
        </h3>
      </div>
      {requestedDomain ? (
        <CodeInputCard
          code={code}
          onChangeCode={setCode}
          isInvalidCode={wasValidationAttempted}
          onValidateCode={handleValidateCode}
          actionLabel="Continuar"
          isSubmitting={isContinuing}
          description={`Informe o código numérico de 6 dígitos gerado para o domínio ${requestedDomain}.`}
        />
      ) : (
        <RecoveryPasswordForm
          onSubmit={handleGenerateCode}
          isSubmitting={isGeneratingCode}
        />
      )}
    </div>
  );
}
