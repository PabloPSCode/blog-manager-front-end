import {
  BIRTH_DATE_INVALID_MESSAGE,
  CPF_INVALID_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  MIN_PASSWORD_LENGTH,
  PASSWORD_MESSAGES_NOT_MATCH,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PHONE_INVALID_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { MaskedTextInput } from "@/components/inputs/MaskedTextInput";
import { PasswordTextInput } from "@/components/inputs/PasswordInput";
import { TextInput } from "@/components/inputs/TextInput";
import { PasswordRequirements } from "@/components/miscellaneous/PasswordRequirements";
import { birthDateMask, cpfMask, phoneMask } from "@/utils/masks";
import {
  birthDateValidationRegex,
  cpfValidationRegex,
  phoneValidationRegex,
} from "@/utils/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignUpFormInputs {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpFormProps {
  onSubmit: (data: SignUpFormInputs) => void;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .email(EMAIL_INVALID_MESSAGE),
    birthDate: yup
      .string()
      .matches(birthDateValidationRegex, BIRTH_DATE_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    cpf: yup
      .string()
      .matches(cpfValidationRegex, CPF_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    phone: yup
      .string()
      .matches(phoneValidationRegex, PHONE_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], PASSWORD_MESSAGES_NOT_MATCH)
      .required(REQUIRED_FIELD_MESSAGE), // Ensure this message is correct
  });
  const passwordValidated = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleSubmitForm: SubmitHandler<SignUpFormInputs> = (data) => {
    onSubmit(data);
  };

  const passwordValue = watch("password");

  return (
    <form
      className="max-w-lg bg-gray-50 dark:bg-slate-800 p-6 shadow-xl rounded-lg mx-auto w-[100%] lg:w-[440px] mb-[40px]"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex flex-col w-full">
        <div className="w-full my-2">
          <TextInput
            inputLabel="Nome"
            placeholder="Seu nome"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
        </div>
        <div className="w-full mr-2">
          <TextInput
            inputLabel="Email"
            placeholder="Seu email"
            autoComplete="email"
            style={{ width: "99%" }}
            {...register("email")}
          />
          {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
        </div>
        <div className="w-full flex flex-row mb-4">
          <div className="w-full">
            <MaskedTextInput
              mask={birthDateMask}
              inputLabel="Data de nascimento"
              placeholder="Ex: 12/12/1973"
              autoComplete="bday"
              style={{ width: "99%" }}
              inputMode="numeric"
              {...register("birthDate")}
            />
            {errors.birthDate && (
              <ErrorMessage errorMessage={errors.birthDate.message} />
            )}
          </div>
          <div className="w-full ml-0.5">
            <MaskedTextInput
              mask={cpfMask}
              inputLabel="CPF"
              placeholder="Seu CPF"
              autoComplete="off"
              style={{ width: "99%" }}
              inputMode="numeric"
              {...register("cpf")}
            />
            {errors.cpf && <ErrorMessage errorMessage={errors.cpf.message} />}
          </div>
        </div>
        <div>
          <MaskedTextInput
            mask={phoneMask}
            inputLabel="Telefone"
            placeholder="Seu telefone"
            autoComplete="tel"
            style={{ width: "99%" }}
            inputMode="numeric"
            {...register("phone")}
          />
          {errors.phone && <ErrorMessage errorMessage={errors.phone.message} />}
        </div>
        <div className="w-full mt-2">
          <PasswordRequirements
            password={passwordValue}
            passwordValidated={passwordValidated}
          />
        </div>
        <div className="w-full mb-4">
          <PasswordTextInput
            inputLabel="Senha"
            autoComplete="new-password"
            placeholder="Mínimo de 6 dígitos"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
        </div>
        <div className="w-full mb-4">
          <PasswordTextInput
            inputLabel="Confirmação da senha"
            placeholder="Confirme a senha"
            autoComplete="new-password"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage errorMessage={errors.passwordConfirmation.message} />
          )}
        </div>
        <div className="w-full mt-2">
          <Button
            type="submit"
            title="Fazer Cadastro"
            disabled={!isValid || !passwordValidated.current}
          />
        </div>
      </div>
    </form>
  );
}
