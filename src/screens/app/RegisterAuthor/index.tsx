import {
  DESCRIPTION_MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { FileInput } from "@/components/inputs/FileInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { IFile, UploadedFile } from "@/components/miscellaneous/UploadedFile";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterAuthorInputs {
  name: string;
  bio: string;
  photo_file?: any;
}

export function RegisterAuthor() {
  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const MIN_TUTOR_BIO_LENGTH = 24;
  const MAX_TUTOR_BIO_LENGTH = 500;

  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    photo_file: yup
      .mixed()
      .test(
        "fileType",
        "A foto deve ser um arquivo de imagem (jpg, jpeg, png)",
        (value: any) => {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return value && value[0] && allowedTypes.includes(value[0].type);
        },
      ),

    bio: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_TUTOR_BIO_LENGTH, DESCRIPTION_MIN_MESSAGE),
  });

  const revokePreviewUrl = (file: IFile | null) => {
    if (file?.uri) {
      URL.revokeObjectURL(file.uri);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<RegisterAuthorInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const bioValue = watch("bio");

  useEffect(() => {
    return () => revokePreviewUrl(uploadedFile);
  }, [uploadedFile]);

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setUploadedFile((currentFile) => {
      revokePreviewUrl(currentFile);
      return {
        name: file.name,
        size: file.size,
        uri: previewUrl,
        type: file.type,
      };
    });
    setWasFileUploaded(true);
  };

  const handleRemoveUploadedFile = () => {
    setUploadedFile((currentFile) => {
      revokePreviewUrl(currentFile);
      return null;
    });
    setWasFileUploaded(false);
    setValue("photo_file", undefined, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleRegisterAuthor: SubmitHandler<RegisterAuthorInputs> = (data) => {
    console.log({ ...data, photoUrl: uploadedFile?.uri ?? null });
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="flex flex-col items-center w-[90%] lg:w-[560px] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon
            screenTitle="Cadastrar autor"
            iconName="user-check"
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit(handleRegisterAuthor)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Nome do autor"
              {...register("name")}
            />
            {errors && errors.name && (
              <ErrorMessage errorMessage={errors.name?.message} />
            )}
          </div>
          <div className="w-full mb-4">
            {wasFileUploaded && uploadedFile ? (
              <UploadedFile
                file={{
                  name: uploadedFile.name,
                  size: Number((uploadedFile.size / 1024 / 1024).toFixed(2)),
                  uri: uploadedFile.uri,
                  type: uploadedFile.type,
                }}
                onCancel={handleRemoveUploadedFile}
              />
            ) : (
              <FileInput
                label="Foto do autor"
                labelDescription="Selecione uma imagem .jpeg ou .png"
                placeholder="Selecione a foto do autor"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onUpload={handleUploadFile}
                {...register("photo_file")}
              />
            )}
            {errors && errors.photo_file && (
              <ErrorMessage
                errorMessage={errors.photo_file?.message as string}
              />
            )}
          </div>

          <div className="w-full mb-4">
            <TextAreaInput
              label="Biografia"
              showTextLength
              currentTextLength={bioValue ? bioValue.length : 0}
              maxTextLength={MAX_TUTOR_BIO_LENGTH}
              placeholder="Biografia do autor"
              {...register("bio")}
            />
            {errors && errors.bio && (
              <ErrorMessage errorMessage={errors.bio?.message} />
            )}
          </div>
          <div className="w-full mb-4"></div>
          <div className="w-full mt-2">
            <Button title="Cadastrar Autor" type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </main>
  );
}
