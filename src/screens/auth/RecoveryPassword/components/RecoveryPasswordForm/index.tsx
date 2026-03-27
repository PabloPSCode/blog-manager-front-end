import { REQUIRED_FIELD_MESSAGE } from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { TextInput } from "@/components/inputs/TextInput";
import { Text } from "@/components/typography/Text";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface RecoveryPasswordInputs {
  domain: string;
}

interface RecoveryPasswordFormProps {
  onSubmit: (data: RecoveryPasswordInputs) => Promise<void> | void;
  isSubmitting?: boolean;
}

export default function RecoveryPasswordForm({
  onSubmit,
  isSubmitting = false,
}: RecoveryPasswordFormProps) {
  const validationSchema = yup.object({
    domain: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RecoveryPasswordInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleSubmitForm: SubmitHandler<RecoveryPasswordInputs> = (data) => {
    onSubmit(data);
  };

  const domainValue = watch("domain");

  return (
    <form
      className="max-w-lg bg-gray-50 dark:bg-slate-800   p-6 shadow-xl rounded-lg mx-auto w-[90%] lg:w-[400px]  mb-[40px] lg:mb-0"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="w-full flex flex-row mb-4">
        <Text content="Informe o domínio do seu site para gerar um código de redefinição de senha." />
      </div>

      <div className="w-full flex flex-col mb-4">
        <TextInput
          inputLabel="Domínio do site"
          placeholder="ex: plssistemas.com.br"
          autoComplete="url"
          {...register("domain")}
        />
        {errors.domain && <ErrorMessage errorMessage={errors.domain.message} />}
      </div>
      <div className="w-full mt-2">
        <Button
          title={isSubmitting ? "Gerando código..." : "Gerar código"}
          type="submit"
          disabled={!domainValue || !isValid || isSubmitting}
        />
      </div>
    </form>
  );
}
