import { Button } from "@/components/buttons/Button";
import { Dispatch, SetStateAction } from "react";
import VerificationInput from "react-verification-input";

interface CodeInputCardProps {
  code: string;
  onChangeCode: Dispatch<SetStateAction<string>>;
  isInvalidCode: boolean;
  onValidateCode: () => void;
  actionLabel?: string;
  description?: string;
  isSubmitting?: boolean;
}

export default function CodeInputCard({
  code,
  isInvalidCode,
  onChangeCode,
  onValidateCode,
  actionLabel = "Validar código",
  description = "Informe o código numérico de 6 dígitos gerado para recuperar a senha do seu site.",
  isSubmitting = false,
}: CodeInputCardProps) {
  const DEFAULT_CODE_LENGTH = 6;

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 md:p-8 shadow-lg rounded-2xl mx-auto w-full max-w-[440px] mb-6">
      <div className="w-full mb-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-full flex flex-col items-center mb-8">
        <VerificationInput
          value={code}
          onChange={onChangeCode}
          validChars="0-9"
          placeholder=""
          classNames={{
            container:
              "w-full flex items-center justify-between gap-2 sm:gap-3",
            character:
              "w-[40px] h-[56px] md:w-[48px] md:h-[64px] border-2 border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-100 text-xl text-center rounded-lg bg-white dark:bg-slate-900",
            characterInactive:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900",
            characterSelected:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border-2 border-primary",
            characterFilled:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900",
          }}
        />
      </div>
      {code.length === DEFAULT_CODE_LENGTH && isInvalidCode && (
        <div className="w-full mt-[-8px] mb-4 flex flex-col items-center text-sm">
          <span className="text-red-400 text-center">Código inválido</span>
        </div>
      )}
      <Button
        title={isSubmitting ? "Continuando..." : actionLabel}
        type="button"
        onClick={onValidateCode}
        disabled={code.length !== DEFAULT_CODE_LENGTH || isSubmitting}
      />
    </div>
  );
}
