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
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { Subtitle } from "@/components/typography/Subtitle";
import { birthDateMask, cpfMask, phoneMask } from "@/utils/masks";
import {
  birthDateValidationRegex,
  cpfValidationRegex,
  phoneValidationRegex,
} from "@/utils/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterUserInputs {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  password: string;
  passwordConfirmation?: string;
}

export function RegisterUser() {
  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: yup
      .string()
      .email(EMAIL_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
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
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_PASSWORD_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], PASSWORD_MESSAGES_NOT_MATCH)
      .required(REQUIRED_FIELD_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleRegisterUser = (data: RegisterUserInputs) => {
    console.log(data);
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="flex flex-col w-[90%] lg:w-[560px] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon
            screenTitle="Cadastrar usuário"
            iconName="user-plus"
          />
        </div>
        <Subtitle
          content="Preencha os dados abaixo para cadastrar um novo usuário"
          className="text-sm text-left text-gray-700 dark:text-white mb-4"
        />
        <form className="w-full" onSubmit={handleSubmit(handleRegisterUser)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && (
              <div className="mb-1">
                <ErrorMessage errorMessage={errors.name.message} />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row mb">
            <div className="w-full">
              <TextInput
                inputLabel="Email"
                placeholder="Seu email"
                style={{ width: "99%" }}
                {...register("email")}
              />
              {errors.email && (
                <div className="w-full">
                  <ErrorMessage errorMessage={errors.email.message} />
                </div>
              )}
            </div>
            <div className="w-full">
              <MaskedTextInput
                mask={birthDateMask}
                inputLabel="Data de nascimento"
                placeholder="Sua data de nascimento"
                style={{ width: "99%" }}
                inputMode="numeric"
                {...register("birthDate")}
              />
              {errors.birthDate && (
                <div className="mb-1">
                  <ErrorMessage errorMessage={errors.birthDate.message} />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row mb-4">
            <div className="w-full">
              <MaskedTextInput
                mask={cpfMask}
                inputLabel="CPF"
                placeholder="Seu CPF"
                style={{ width: "99%" }}
                inputMode="numeric"
                {...register("cpf")}
              />
              {errors.cpf && (
                <div className="w-full">
                  <ErrorMessage errorMessage={errors.cpf.message} />
                </div>
              )}
            </div>
            <div className="w-full">
              <MaskedTextInput
                mask={phoneMask}
                inputLabel="Telefone"
                placeholder="Seu telefone"
                style={{ width: "99%" }}
                inputMode="numeric"
                {...register("phone")}
              />
              {errors.phone && (
                <ErrorMessage errorMessage={errors.phone.message} />
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <PasswordTextInput
              inputLabel="Senha"
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
              {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation && (
              <ErrorMessage
                errorMessage={errors.passwordConfirmation.message}
              />
            )}
          </div>
          <div className="w-full mt-2">
            <Button
              type="submit"
              disabled={!isValid}
              title="Cadastrar Usuário"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
