import {
  CPF_INVALID_MESSAGE,
  DESCRIPTION_MIN_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  PHONE_INVALID_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { MaskedTextInput } from "@/components/inputs/MaskedTextInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { cpfMask, phoneMask } from "@/utils/masks";
import { cpfValidationRegex, phoneValidationRegex } from "@/utils/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterTutorInputs {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  bio: string;
}

export function RegisterTutor() {
  const MIN_TUTOR_BIO_LENGTH = 24;
  const MAX_TUTOR_BIO_LENGTH = 500;

  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: yup
      .string()
      .email(EMAIL_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    cpf: yup
      .string()
      .matches(cpfValidationRegex, CPF_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    phone: yup
      .string()
      .matches(phoneValidationRegex, PHONE_INVALID_MESSAGE)
      .required(REQUIRED_FIELD_MESSAGE),
    bio: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_TUTOR_BIO_LENGTH, DESCRIPTION_MIN_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const bioValue = watch("bio");

  const handleRegisterTutor: SubmitHandler<RegisterTutorInputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="flex flex-col items-center w-[90%] lg:w-[560px] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon
            screenTitle="Cadastrar tutor"
            iconName="user-check"
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit(handleRegisterTutor)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Nome do tutor"
              {...register("name")}
            />
            {errors && errors.name && (
              <ErrorMessage errorMessage={errors.name?.message} />
            )}
          </div>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Email"
              placeholder="Email do tutor"
              {...register("email")}
            />
            {errors && errors.email && (
              <ErrorMessage errorMessage={errors.email?.message} />
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row mb-4">
            <div className="w-full">
              <MaskedTextInput
                inputLabel="CPF"
                placeholder="CPF do tutor"
                mask={cpfMask}
                style={{ width: "99%" }}
                inputMode="numeric"
                {...register("cpf")}
              />
              {errors && errors.cpf && (
                <ErrorMessage errorMessage={errors.cpf?.message} />
              )}
            </div>
            <div className="w-full">
              <MaskedTextInput
                inputLabel="Telefone"
                placeholder="Telefone do tutor"
                mask={phoneMask}
                style={{ width: "99%" }}
                inputMode="numeric"
                {...register("phone")}
              />
              {errors && errors.phone && (
                <ErrorMessage errorMessage={errors.phone?.message} />
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextAreaInput
              label="Biografia"
              showTextLength
              currentTextLength={bioValue ? bioValue.length : 0}
              maxTextLength={MAX_TUTOR_BIO_LENGTH}
              placeholder="Biografia do tutor"
              {...register("bio")}
            />
            {errors && errors.bio && (
              <ErrorMessage errorMessage={errors.bio?.message} />
            )}
          </div>
          <div className="w-full mb-4"></div>
          <div className="w-full mt-2">
            <Button title="Cadastrar Tutor" type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </main>
  );
}
