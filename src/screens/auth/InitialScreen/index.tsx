import { useAuthenticationStore } from "@/store/auth";
import { SignInForm, SignInFormInputs } from "./components/SignInForm";

export function InitialScreen() {
  const { signIn } = useAuthenticationStore();

  const handleSignIn = (data: SignInFormInputs) => {
    console.log(data);
    signIn();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-black dark:text-white text-center text-3xl md:text-5xl font-bold font-primary tracking-wide mb-10">
        GERENCIADOR DE BLOGS
      </h1>
      <h2 className="text-black dark:text-white text-center text-xl md:text-2xl font-bold font-primary mb-6">
        Entrar na plataforma
      </h2>
      <SignInForm onSubmit={handleSignIn} />
    </div>
  );
}
