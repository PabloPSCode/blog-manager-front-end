import { Title } from "@/components/typography/Title";
import { useAuthenticationStore } from "@/store/auth";
import { SignInForm, SignInFormInputs } from "./components/SignInForm";

export function InitialScreen() {
  const { signIn } = useAuthenticationStore();

  const handleSignIn = (data: SignInFormInputs) => {
    console.log(data);
    signIn();
  };

  return (
    <div className="flex flex-col lg:mt-[16vh] items-center lg:mb-2 mb-8">
      <Title
        content="Entrar na plataforma"
        className="text-black dark:text-white mb-6 text-xl font-bold md:text-3xl font-secondary"
      />
      <SignInForm onSubmit={handleSignIn} />
    </div>
  );
}
