import {
  DESCRIPTION_MIN_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
  FILE_TYPE_UNSUPPORTED_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { FileInput } from "@/components/inputs/FileInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { IFile, UploadedFile } from "@/components/miscellaneous/UploadedFile";
import {
  coursesOptions,
  modulesOptions,
  tutorOptions,
} from "@/data/placeholders";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterClassInputs {
  name: string;
  description: string;
  course: string;
  tutor: string;
  module: string;
  cover_file?: any;
}

export function RegisterClass() {
  const MIN_CLASS_DESCRIPTION_LENGTH = 24;
  const MAX_CLASS_DESCRIPTION_LENGTH = 250;
  const MAX_CLASS_COVER_FILE_SIZE = 2 * 1024 * 1024; //2MB

  const [wasFileUploaded, setWasFileUploaded] = useState(false);
  const [file, setFile] = useState<IFile | null>(null);

  const validationSchema = yup.object({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    description: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(MIN_CLASS_DESCRIPTION_LENGTH, DESCRIPTION_MIN_MESSAGE),
    course: yup.string().required(REQUIRED_FIELD_MESSAGE),
    tutor: yup.string().required(REQUIRED_FIELD_MESSAGE),
    module: yup.string().required(REQUIRED_FIELD_MESSAGE),
    cover_file: yup
      .mixed()
      .optional()
      .test(
        "fileType",
        FILE_TYPE_UNSUPPORTED_MESSAGE + ".mp4, .mov, .avi, .mkv, .webm, .flv",
        (value: any) => {
          if (!value || value.length === 0) return true;
          return (
            value &&
            value[0] &&
            [
              "video/mp4",
              "video/quicktime",
              "video/x-msvideo",
              "video/x-matroska",
              "video/webm",
              "video/x-flv",
            ].includes(value[0].type)
          );
        }
      )
      .test("fileSize", FILE_MAX_SIZE_MESSAGE + "2MB", (value: any) => {
        if (!value || value.length === 0) return true; // Allow empty file
        return value[0].size <= MAX_CLASS_COVER_FILE_SIZE;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleRegisterClass: SubmitHandler<RegisterClassInputs> = (data) => {
    console.log(data);
  };

  const descriptionValue = watch("description");

  const handleCourseSelect = (selectedOption: { value: string }) => {
    setValue("course", selectedOption.value, { shouldValidate: true });
    trigger("tutor");
  };

  const handleTutorSelect = (selectedOption: { value: string }) => {
    setValue("tutor", selectedOption.value, { shouldValidate: true });
    trigger("module");
  };

  const handleModuleSelect = (selectedOption: { value: string }) => {
    setValue("module", selectedOption.value, { shouldValidate: true });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <ScreenTitleIcon
            screenTitle="Cadastrar videoaula"
            iconName="play-circle"
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit(handleRegisterClass)}>
          <div className="w-full mb-4">
            <TextInput
              inputLabel="Nome"
              placeholder="Nome do aula"
              {...register("name")}
            />
            {errors && errors.name && (
              <ErrorMessage errorMessage={errors.name?.message} />
            )}
          </div>
          <div className="w-full mb-4">
            <TextAreaInput
              label="Descrição"
              showTextLength
              currentTextLength={descriptionValue ? descriptionValue.length : 0}
              maxTextLength={MAX_CLASS_DESCRIPTION_LENGTH}
              placeholder="Descrição do aula"
              {...register("description")}
            />
            {errors && errors.description && (
              <ErrorMessage errorMessage={errors.description?.message} />
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row mb-4">
            <div className="w-full">
              <SelectInput
                label="Selecione um curso"
                options={coursesOptions}
                onSelectOption={handleCourseSelect as never}
                placeholder="Selecione um curso"
                defaultValue="Selecione um curso"
                widthVariant="mid"
              />
              {errors && errors.course && (
                <ErrorMessage errorMessage={errors.course?.message} />
              )}
            </div>
            <div className="w-full">
              <SelectInput
                label="Selecione um tutor"
                options={tutorOptions}
                onSelectOption={handleTutorSelect as never}
                placeholder="Selecione um tutor"
                defaultValue="Selecione um tutor"
                widthVariant="mid"
              />
              {errors && errors.tutor && (
                <ErrorMessage errorMessage={errors.tutor?.message} />
              )}
            </div>
          </div>
          <div className="w-full mb-4">
            <SelectInput
              label="Selecione um módulo"
              options={modulesOptions}
              onSelectOption={handleModuleSelect as never}
              placeholder="Selecione um módulo"
              defaultValue="Selecione um módulo"
            />
            {errors && errors.module && (
              <ErrorMessage errorMessage={errors.module?.message} />
            )}
          </div>
          <div className="w-full mb-2">
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
                label="Vídeoaula"
                onUpload={handleFileUpload}
                labelDescription="Selecione um arquivo de video .mp4 ou .mov de até 2MB"
                {...register("cover_file", { onChange: handleFileUpload })}
              />
            )}
          </div>
          <div className="w-full mb-4">
            {errors.cover_file && (
              <div>
                <ErrorMessage errorMessage={errors.cover_file?.message} />
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <Button title="Cadastrar Aula" type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </main>
  );
}
