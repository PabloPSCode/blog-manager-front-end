import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import { showAlertSuccess } from "@/utils/alerts";
import { useState } from "react";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";

export function UpdatePassword() {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col lg:mt-[8vh] mt-[4vh]">
      <div className="flex flex-row mb-2 w-full sm:w-[400px] ml-8 sm:mx-auto">
        <HeaderNavigation screenTitle="Redefinição de senha" />
      </div>
      <UpdatePasswordForm
        password={password}
        setPassword={setPassword}
        onSubmit={() => showAlertSuccess("Senha alterada com sucesso")}
      />
    </div>
  );
}
