import { HeaderNavigation } from "@/components/miscellaneous/HeaderNavigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeInputCard from "./components/CodeInputCard";

export function RecoveryPassword() {
  const [code, setCode] = useState("");
  const [wasValidationAttempted, setWasValidationAttempted] = useState(false);

  const navigate = useNavigate();

  //TODO-PABLO: Implement function to send recovery password
  const API_CODE = "123456";

  const isCodeValid = code === API_CODE;

  const handleValidateCode = () => {
    setWasValidationAttempted(true);
    if (isCodeValid) {
      navigate("/redefinir-senha");
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
          Código de recuperação
        </h3>
      </div>
      <CodeInputCard
        code={code}
        onChangeCode={setCode}
        isInvalidCode={
          wasValidationAttempted && code.length === 6 && !isCodeValid
        }
        onValidateCode={handleValidateCode}
      />
    </div>
  );
}
