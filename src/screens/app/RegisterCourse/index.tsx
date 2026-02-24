import {
  DESCRIPTION_MIN_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
  FILE_TYPE_UNSUPPORTED_MESSAGE,
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
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterCourseInputs {
  name: string;
  description: string;
  cover_file: any;
}

export function RegisterCourse() {
  const MIN_COURSE_DESCRIPTION_LENGTH = 40;
  const MAX_COURSE_DESCRIPTION_LENGTH = 500;
  const MAX_COURSE_COVER_FILE_SIZE = 2 * 1024 * 1024; //2MB

  const [file, setFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    description: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_COURSE_DESCRIPTION_LENGTH, DESCRIPTION_MIN_MESSAGE),
    cover_file: yup
      .mixed()
      .required(REQUIRED_FIELD_MESSAGE)
      .test("fileSize", FILE_MAX_SIZE_MESSAGE + "2MB", (value: any) => {
        return value && value[0] && value[0].size <= MAX_COURSE_COVER_FILE_SIZE;
      })
      .test(
        "fileType",
        FILE_TYPE_UNSUPPORTED_MESSAGE + ".jpeg ou .png",
        (value: any) => {
          return (
            value &&
            value[0] &&
            ["image/jpeg", "image/png"].includes(value[0].type)
          );
        }
      ),
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

  const registerCourse: SubmitHandler<RegisterCourseInputs> = (data) => {
    console.log(data);
  };

  const descriptionValue = watch("description");

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFile({
        name: file.name,
        size: file.size,
        uri: previewUrl,
        type: file.type,
      });
      setWasFileUploaded(true);
    }
  };

  const handleRemoveUploadedFile = () => {
    setFile(null);
    setWasFileUploaded(false);
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="flex flex-col items-center w-[90%] lg:w-[560px] mx-auto">
        <div className="mb-4 w-full">
          <ScreenTitleIcon screenTitle="Cadastrar curso" iconName="book-open" />
        </div>
        <form className="w-full" onSubmit={handleSubmit(registerCourse)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Nome do curso"
              {...register("name")}
            />
            {errors.name && (
              <div>
                <ErrorMessage errorMessage={errors.name?.message} />
              </div>
            )}
          </div>
          <div className="w-full mb-4">
            <TextAreaInput
              label="Descrição"
              showTextLength
              currentTextLength={
                descriptionValue?.length ? descriptionValue.length : 0
              }
              maxTextLength={MAX_COURSE_DESCRIPTION_LENGTH}
              placeholder="Descrição do curso"
              {...register("description")}
            />
            {errors.description && (
              <div>
                <ErrorMessage errorMessage={errors.description?.message} />
              </div>
            )}
          </div>
          <div className="w-full mb-4">
            {wasFileUploaded && file ? (
              <UploadedFile
                file={{
                  name: file.name,
                  size: Number((file.size / 1024 / 1024).toFixed(2)),
                  uri: file.uri,
                  type: file.type,
                }}
                onCancel={handleRemoveUploadedFile}
              />
            ) : (
              <FileInput
                label="Capa do curso"
                labelDescription="Selecione um arquivo de até 2MB"
                onUpload={handleUploadFile}
                {...register("cover_file", { onChange: handleUploadFile })}
              />
            )}
            {errors.cover_file && (
              <div>
                <ErrorMessage errorMessage={errors.cover_file?.message} />
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <Button type="submit" title="Cadastrar Curso" disabled={!isValid} />
          </div>
        </form>
      </div>
    </main>
  );
}
