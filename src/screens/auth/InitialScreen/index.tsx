import { authService } from "@/services/auth.service";
import { useAuthenticationStore } from "@/store/auth";
import { getApiErrorMessage } from "@/services/api";
import { showAlertError } from "@/utils/alerts";
import { useState } from "react";
import { SignInForm, SignInFormInputs } from "./components/SignInForm";

export function InitialScreen() {
  const { signIn } = useAuthenticationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (data: SignInFormInputs) => {
    try {
      setIsSubmitting(true);

      const authenticatedSite = await authService.login({
        domain: data.domain.trim(),
        password: data.password,
      });
      const { jwt, ...site } = authenticatedSite;

      signIn({
        jwt,
        site,
      });
    } catch (error) {
      showAlertError(
        getApiErrorMessage(error, "Nao foi possivel autenticar o site."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-black dark:text-white text-center text-3xl md:text-5xl font-bold font-primary tracking-wide mb-10">
        GERENCIADOR DE BLOGS
      </h1>
      <h2 className="text-black dark:text-white text-center text-xl md:text-2xl font-bold font-primary mb-6">
        Entrar na plataforma
      </h2>
      <SignInForm onSubmit={handleSignIn} isSubmitting={isSubmitting} />
    </div>
  );
}
