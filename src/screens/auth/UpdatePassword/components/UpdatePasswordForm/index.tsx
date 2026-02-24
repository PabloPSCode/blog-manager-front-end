import { Button } from "@/components/buttons/Button";
import { PasswordTextInput } from "@/components/inputs/PasswordInput";
import { PasswordRequirements } from "@/components/miscellaneous/PasswordRequirements";
import { Text } from "@/components/typography/Text";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

interface UpdatePasswordFormProps {
  onSubmit: () => void;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export function UpdatePasswordForm({
  onSubmit,
  password,
  setPassword,
}: UpdatePasswordFormProps) {
  const submit = async (form: FormEvent) => {
    form.preventDefault();
    onSubmit();
  };
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const passwordValidatedRef = useRef(false);

  return (
    <form
      className="max-w-lg bg-gray-50 dark:bg-slate-800  p-6 shadow-xl rounded-lg mx-auto w-[90%] lg:w-[400px] mb-[40px] lg:mb-0"
      onSubmit={submit}
    >
      <div className="w-full flex flex-row mb-4">
        <Text content="Informe uma nova senha de acesso à plataforma." />
      </div>
      <div className="w-full flex mb-4">
        <PasswordRequirements
          password={password}
          passwordValidated={passwordValidatedRef}
        />
      </div>
      <div className="w-full flex flex-row mb-4">
        <PasswordTextInput
          inputLabel="Nova senha"
          placeholder="Sua nova senha"
          value={password}
          onChange={(val) => setPassword(val.target.value)}
        />
      </div>
      <div className="w-full flex flex-row mb-4">
        <PasswordTextInput
          inputLabel="Confirmação da nova senha"
          placeholder="Confirme sua nova senha"
          value={passwordConfirmation}
          onChange={(val) => setPasswordConfirmation(val.target.value)}
        />
      </div>
      <div className="w-full mt-2">
        <Button
          type="submit"
          title="Redefinir Senha"
          disabled={
            password !== passwordConfirmation || !passwordValidatedRef.current
          }
        />
      </div>
    </form>
  );
}
