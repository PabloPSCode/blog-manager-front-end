import { LinkButton } from "@/components/buttons/LinkButton";
import { Text } from "@/components/typography/Text";
import { Dispatch, SetStateAction } from "react";
import VerificationInput from "react-verification-input";

interface CodeInputCardProps {
  code: string;
  onChangeCode: Dispatch<SetStateAction<string>>;
  isInvalidCode: boolean;
  emailAddress: string;
  onResendCode: () => void;
  ableToResendCode?: boolean;
  timeToResendCode?: number;
}

export default function CodeInputCard({
  emailAddress,
  code,
  isInvalidCode,
  onChangeCode,
  onResendCode,
  ableToResendCode,
  timeToResendCode,
}: CodeInputCardProps) {
  const DEFAULT_CODE_LENGTH = 6;

  return (
    <div className="max-w-lg bg-gray-50 dark:bg-slate-800 p-6 shadow-xl rounded-lg mx-auto w-[90%] md:w-[400px]  mb-[40px] lg:mb-0">
      <div className="w-full flex flex-row mb-4 p-4">
        <Text
          content={`Informe o código numérico de 6 dígitos que enviamos para ${emailAddress}`}
        />
      </div>
      <div className="w-full flex flex-col items-center mb-6">
        <VerificationInput
          value={code}
          onChange={onChangeCode}
          validChars="0-9"
          placeholder=""
          classNames={{
            container: "container",
            character:
              "text-gray-700 dark:text-gray-100 text-xl text-center rounded-lg bg-white dark:bg-slate-900 ",
            characterInactive:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 ",
            characterSelected:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900  border-3",
            characterFilled:
              "flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 ",
          }}
        />
      </div>
      {code.length === DEFAULT_CODE_LENGTH && isInvalidCode && (
        <div className="w-full mt-[-8px] mb-4 flex flex-col items-center text-sm">
          <span className="text-red-400 text-center">Código inválido</span>
        </div>
      )}
      {!ableToResendCode && timeToResendCode && timeToResendCode > 0 && (
        <div className="w-full mt-[-8px] mb-4 flex flex-col items-center text-sm">
          <span className="text-gray-700 dark:text-gray-100 text-center text-[12px] lg:text-sm">
            Você pode solicitar um novo código em {timeToResendCode} segundos
          </span>
        </div>
      )}
      <LinkButton
        title="Reenviar código"
        onClick={onResendCode}
        disabled={!ableToResendCode}
      />
    </div>
  );
}
