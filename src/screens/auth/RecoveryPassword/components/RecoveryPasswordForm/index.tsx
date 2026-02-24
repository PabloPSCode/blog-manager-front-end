import { REQUIRED_FIELD_MESSAGE } from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { MaskedTextInput } from "@/components/inputs/MaskedTextInput";
import { TextInput } from "@/components/inputs/TextInput";
import { Text } from "@/components/typography/Text";
import { cpfMask } from "@/utils/masks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface RecoveryPasswordInputs {
  email: string;
  cpf: string;
}

interface RecoveryPasswordFormProps {
  onSubmit: (data: RecoveryPasswordInputs) => void;
}

export default function RecoveryPasswordForm({
  onSubmit,
}: RecoveryPasswordFormProps) {
  const validationSchema = yup.object({
    email: yup.string().required(REQUIRED_FIELD_MESSAGE),
    cpf: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitForm = (data: RecoveryPasswordInputs) => {
    onSubmit(data);
  };

  const emailValue = watch("email");
  const cpfValue = watch("cpf");

  return (
    <form
      className="max-w-lg bg-gray-50 dark:bg-slate-800   p-6 shadow-xl rounded-lg mx-auto w-[90%] lg:w-[400px]  mb-[40px] lg:mb-0"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="w-full flex flex-row mb-4">
        <Text content="Informe seu email e CPF para receber seu código de redefinição de senha no email informado." />
      </div>

      <div className="w-full flex flex-col mb-4">
        <TextInput
          inputLabel="Email"
          placeholder="Seu email"
          {...register("email")}
        />
        {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
      </div>
      <div className="w-full flex flex-col mb-4">
        <MaskedTextInput
          mask={cpfMask}
          inputLabel="CPF"
          placeholder="Seu CPF"
          inputMode="numeric"
          {...register("cpf")}
        />
        {errors.cpf && <ErrorMessage errorMessage={errors.cpf.message} />}
      </div>
      <div className="w-full mt-2">
        <Button
          onClick={() => {}}
          title="Receber Código"
          disabled={!cpfValue || !emailValue}
        />
      </div>
    </form>
  );
}
