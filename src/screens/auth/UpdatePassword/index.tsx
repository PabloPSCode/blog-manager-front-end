import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth.service";
import {
  clearPasswordRecoveryContext,
  readPasswordRecoveryContext,
} from "@/utils/passwordRecovery";
import { showAlertError, showAlertSuccess } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";

export function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecoveryContext, setHasRecoveryContext] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveryContext = readPasswordRecoveryContext();

    if (!recoveryContext) {
      navigate("/recuperar-senha", { replace: true });
      return;
    }

    setHasRecoveryContext(true);
  }, [navigate]);

  const handleSubmit = async () => {
    const recoveryContext = readPasswordRecoveryContext();

    if (!recoveryContext) {
      navigate("/recuperar-senha", { replace: true });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await authService.recoverPassword({
        domain: recoveryContext.domain,
        code: recoveryContext.code,
        password,
      });

      clearPasswordRecoveryContext();
      showAlertSuccess(response.message);
      navigate("/", { replace: true });
    } catch (error) {
      showAlertError(
        getApiErrorMessage(
          error,
          "Nao foi possivel redefinir a senha do site.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasRecoveryContext) {
    return null;
  }

  return (
    <div className="flex flex-col lg:mt-[8vh] mt-[4vh]">
      <div className="flex flex-row mb-2 w-full sm:w-[400px] ml-8 sm:mx-auto">
        <HeaderNavigation screenTitle="Redefinição de senha" />
      </div>
      <UpdatePasswordForm
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
