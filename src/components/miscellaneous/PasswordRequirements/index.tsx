import {
  lowerCaseRegex,
  numbersRegex,
  specialCharacterRegex,
  upperCaseRegex,
} from "@/utils/regex";
import { MutableRefObject, useCallback, useEffect, useState } from "react";

interface PasswordRequirementsProps {
  password: string;
  passwordValidated: MutableRefObject<boolean>;
}

export function PasswordRequirements({
  password = "",
  passwordValidated,
}: PasswordRequirementsProps) {
  const [hasLowerCaseLetter, setHasLowerCaseLetter] = useState(false);
  const [hasUpperCaseLetter, setHasUpperCaseLetter] = useState(false);
  const [hasNumberCharacter, setHasNumberCharacter] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasMinimalLength, setHasMinimalLength] = useState(false);

  const MINIMAL_PASSWORD_LENGTH = 8;

  const checkPassword = useCallback(() => {
    setHasLowerCaseLetter(lowerCaseRegex.test(password));
    setHasUpperCaseLetter(upperCaseRegex.test(password));
    setHasNumberCharacter(numbersRegex.test(password));
    setHasSpecialCharacter(specialCharacterRegex.test(password));
    setHasMinimalLength(password.length >= MINIMAL_PASSWORD_LENGTH);

    passwordValidated.current =
      hasLowerCaseLetter &&
      hasUpperCaseLetter &&
      hasNumberCharacter &&
      hasSpecialCharacter &&
      password.length >= MINIMAL_PASSWORD_LENGTH;
  }, [
    hasLowerCaseLetter,
    hasNumberCharacter,
    hasSpecialCharacter,
    hasUpperCaseLetter,
    password,
    passwordValidated,
  ]);

  useEffect(() => {
    checkPassword();
  }, [checkPassword]);

  return (
    <div className="w-full flex flex-col mb-2">
      <span className="text-gray-700 dark:text-gray-100 text-[12px] lg:text-sm">
        Sua senha deve conter:{" "}
      </span>
      <ul className="w-full flex flex-col list-disc pl-8">
        <li
          className={`text-[12px] lg:text-sm ${
            hasMinimalLength ? "text-green-500" : "text-gray-500"
          }`}
        >
          No mínimo {MINIMAL_PASSWORD_LENGTH} caracteres
        </li>
        <li
          className={`text-[12px] lg:text-sm ${
            hasUpperCaseLetter ? "text-green-500" : "text-gray-500"
          }`}
        >
          Pelo menos 1 letra maiúscula
        </li>
        <li
          className={`text-[12px] lg:text-sm ${
            hasLowerCaseLetter ? "text-green-500" : "text-gray-500"
          }`}
        >
          Pelo menos 1 letra minúscula
        </li>
        <li
          className={`text-[12px] lg:text-sm ${
            hasNumberCharacter ? "text-green-500" : "text-gray-500"
          }`}
        >
          Pelo menos 1 número
        </li>
        <li
          className={`text-[12px] lg:text-sm ${
            hasSpecialCharacter ? "text-green-500" : "text-gray-500"
          }`}
        >
          Pelo menos 1 caractere especial
        </li>
      </ul>
    </div>
  );
}
