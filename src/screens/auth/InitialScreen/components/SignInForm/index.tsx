import {
  MIN_PASSWORD_LENGTH,
  PASSWORD_MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { LinkButton } from "@/components/buttons/LinkButton";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { PasswordTextInput } from "@/components/inputs/PasswordInput";
import { TextInput } from "@/components/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

export interface SignInFormInputs {
  domain: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: (data: SignInFormInputs) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function SignInForm({
  onSubmit,
  isSubmitting = false,
}: SignInFormProps) {
  const validationSchema = yup.object({
    domain: yup.string().required(REQUIRED_FIELD_MESSAGE),
    password: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_PASSWORD_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleSubmitForm: SubmitHandler<SignInFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 md:p-8 shadow-lg rounded-2xl mx-auto w-full max-w-[440px]"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <TextInput
        inputLabel="Domínio do seu site"
        placeholder="ex: plssistemas.com.br"
        autoComplete="url"
        {...register("domain")}
      />
      {errors.domain && <ErrorMessage errorMessage={errors.domain.message} />}
      <PasswordTextInput
        inputLabel="Senha"
        placeholder="Sua senha"
        autoComplete="current-password"
        {...register("password")}
      />
      {errors.password && (
        <ErrorMessage errorMessage={errors.password.message} />
      )}
      <div className="flex w-full my-4">
        <Link to="/recuperar-senha">
          <LinkButton title="Esqueci minha senha" />
        </Link>
      </div>
      <Button
        title={isSubmitting ? "Acessando..." : "Acessar a plataforma"}
        type="submit"
        disabled={!isValid || isSubmitting}
      />
    </form>
  );
}
