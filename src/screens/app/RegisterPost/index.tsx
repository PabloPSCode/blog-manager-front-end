import {
  DESCRIPTION_MIN_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
  FILE_TYPE_UNSUPPORTED_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { FileInput } from "@/components/inputs/FileInput";
import RichTextInput from "@/components/inputs/RichText";
import { SelectInput as Select } from "@/components/inputs/SelectInput";
import { TextInput } from "@/components/inputs/TextInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { IFile, UploadedFile } from "@/components/miscellaneous/UploadedFile";
import { authors } from "@/data/mocked";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterPostInputs {
  title: string;
  author_id: string;
  content: string;
  cover_file: any;
}

export function RegisterPost() {
  const MAX_POST_COVER_FILE_SIZE = 2 * 1024 * 1024; //2MB
  const MIN_POST_CONTENT_LENGTH = 24;

  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const authorOptions = [
    { value: "", label: "Selecione um autor" },
    ...authors.map((author) => ({
      value: author.id ?? author.name,
      label: author.name,
    })),
  ];

  const getPlainTextFromHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const validationSchema = yup.object({
    title: yup.string().required(REQUIRED_FIELD_MESSAGE),
    author_id: yup.string().required(REQUIRED_FIELD_MESSAGE),
    cover_file: yup
      .mixed()
      .required(REQUIRED_FIELD_MESSAGE)
      .test("fileSize", FILE_MAX_SIZE_MESSAGE + "2MB", (value: any) => {
        return value && value[0] && value[0].size <= MAX_POST_COVER_FILE_SIZE;
      })
      .test(
        "fileType",
        FILE_TYPE_UNSUPPORTED_MESSAGE + ".jpeg ou .png",
        (value: any) => {
          return (
            value &&
            value[0] &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
          );
        },
      ),
    content: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .test("plainTextMinLength", DESCRIPTION_MIN_MESSAGE, (value) => {
        return (
          getPlainTextFromHtml(value ?? "").length >= MIN_POST_CONTENT_LENGTH
        );
      }),
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
    setValue,
  } = useForm<RegisterPostInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      author_id: "",
      content: "",
    },
    mode: "onChange",
  });

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
    setValue("cover_file", undefined, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleRegisterPost: SubmitHandler<RegisterPostInputs> = ({
    cover_file,
    ...data
  }) => {
    console.log({
      ...data,
      coverFile: cover_file?.[0] ?? null,
      coverUrl: uploadedFile?.uri ?? null,
    });
  };

  return (
    <main className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-800 w-full">
      <div className="w-[90%] mx-auto py-6">
        <div className="mb-4 w-full">
          <ScreenTitleIcon screenTitle="Cadastrar post" iconName="file-text" />
        </div>
        <form
          className="bg-white dark:bg-slate-900 rounded-lg p-6 md:p-8"
          onSubmit={handleSubmit(handleRegisterPost)}
        >
          <input type="hidden" {...register("author_id")} />
          <input type="hidden" {...register("content")} />

          <div className="w-full flex flex-col gap-4">
            <div>
              <TextInput
                inputLabel="Título"
                placeholder="Título do post"
                {...register("title")}
              />
              {errors.title && (
                <ErrorMessage errorMessage={errors.title?.message} />
              )}
            </div>

            <div className="w-full">
              <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm mb-1">
                Conteúdo do post
              </span>
              <RichTextInput
                initialData=""
                placeholder="Escreva ou cole aqui o conteúdo do seu post. Atente-se á formatação."
                className="!w-full mt-1 border-gray-300 bg-white min-h-[240px]"
                onChange={(html) => {
                  setValue("content", html, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
                heading={false}
                findAndReplace={false}
                selectAll={false}
                removeFormat={false}
                highlight={false}
                fontFamily={false}
                fontSize={false}
                fontColor={false}
                fontBackgroundColor={false}
                alignment={false}
                indent={false}
                blockQuote={false}
                horizontalLine={false}
                mediaEmbed={false}
                codeBlock={false}
                specialCharacters={false}
              />
              {errors.content && (
                <ErrorMessage errorMessage={errors.content?.message} />
              )}
            </div>

            <div>
              <Select
                label="Autor"
                options={authorOptions}
                isSearchable={false}
                onSelectOption={(selectedOption) => {
                  setValue("author_id", String(selectedOption.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
              {errors.author_id && (
                <ErrorMessage errorMessage={errors.author_id?.message} />
              )}
            </div>

            <div>
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
                  label="Select a file"
                  labelDescription="Selecione uma imagem de até 2mb"
                  buttonTitle="SelectFileButton"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onUpload={handleUploadFile}
                  {...register("cover_file")}
                />
              )}
              {errors.cover_file && (
                <ErrorMessage
                  errorMessage={errors.cover_file?.message as string}
                />
              )}
            </div>
          </div>

          <div className="w-full mt-6">
            <Button title="Cadastrar post" type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </main>
  );
}
