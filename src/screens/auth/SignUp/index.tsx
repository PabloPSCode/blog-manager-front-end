import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import SignUpForm from "./components/SignUpForm";

export function SignUp() {
  //TODO-PABLO: Submit data to real API
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-2 w-full sm:w-[400px] ml-8 sm:mx-auto">
        <HeaderNavigation screenTitle="Cadastro" />
      </div>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
}
