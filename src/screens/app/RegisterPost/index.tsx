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
import { IAuthor } from "@/dtos";
import { authorsService } from "@/services/authors.service";
import { postsService } from "@/services/posts.service";
import { showAlertError, showAlertSuccess } from "@/utils/alerts";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface RegisterPostInputs {
  title: string;
  authorId: string;
  htmlContent: string;
  backgroundFile: any;
}

export function RegisterPost() {
  const MAX_POST_COVER_FILE_SIZE = 2 * 1024 * 1024; //2MB
  const MIN_POST_CONTENT_LENGTH = 24;

  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getPlainTextFromHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const validationSchema = yup.object({
    title: yup.string().required(REQUIRED_FIELD_MESSAGE),
    authorId: yup.string().required(REQUIRED_FIELD_MESSAGE),
    backgroundFile: yup
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
    htmlContent: yup
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
    reset,
  } = useForm<RegisterPostInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      authorId: "",
      htmlContent: "",
    },
    mode: "onChange",
  });

  const authorOptions = [
    {
      value: "",
      label: isLoadingAuthors ? "Carregando autores..." : "Selecione um autor",
    },
    ...authors.map((author) => ({
      value: author.id ?? author.name,
      label: author.name,
    })),
  ];

  useEffect(() => {
    return () => revokePreviewUrl(uploadedFile);
  }, [uploadedFile]);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        setIsLoadingAuthors(true);
        const loadedAuthors = await authorsService.list();
        setAuthors(loadedAuthors);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar os autores.";

        showAlertError(errorMessage);
      } finally {
        setIsLoadingAuthors(false);
      }
    };

    void loadAuthors();
  }, []);

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
    setValue("backgroundFile", undefined, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleRegisterPost: SubmitHandler<RegisterPostInputs> = async (
    data,
  ) => {
    try {
      setIsSubmitting(true);

      await postsService.create({
        title: data.title.trim(),
        authorId: data.authorId,
        htmlContent: data.htmlContent,
        backgroundFile: data.backgroundFile?.[0] ?? null,
      });

      showAlertSuccess("Post cadastrado com sucesso");
      revokePreviewUrl(uploadedFile);
      setUploadedFile(null);
      setWasFileUploaded(false);
      reset({
        authorId: "",
        htmlContent: "",
        backgroundFile: undefined,
        title: "",
      });
      navigate("/dashboard/gerenciar-posts");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel cadastrar o post.";

      showAlertError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
          <input type="hidden" {...register("authorId")} />
          <input type="hidden" {...register("htmlContent")} />

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
                  setValue("htmlContent", html, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
                findAndReplace={false}
                selectAll={false}
                removeFormat={false}
                fontSize={false}
                fontColor={false}
                fontBackgroundColor={false}
                indent={false}
                horizontalLine={false}
                mediaEmbed={false}
                codeBlock={false}
                specialCharacters={false}
              />
              {errors.htmlContent && (
                <ErrorMessage errorMessage={errors.htmlContent?.message} />
              )}
            </div>

            <div>
              <Select
                label="Autor"
                options={authorOptions}
                isSearchable={false}
                onSelectOption={(selectedOption) => {
                  setValue("authorId", String(selectedOption.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
              {errors.authorId && (
                <ErrorMessage errorMessage={errors.authorId?.message} />
              )}
              {!isLoadingAuthors && authors.length === 0 && (
                <p className="text-[13px] text-gray-700 dark:text-gray-300 mt-2">
                  Cadastre ao menos um autor antes de criar um post.
                </p>
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
                    imageClassName="!w-[320px] aspect-video !rounded-md !object-cover"
                />
              ) : (
                <FileInput
                  label="Capa do post"
                  labelDescription="Selecione uma imagem de até 2mb"
                  buttonTitle="Selecionar capa do post"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onUpload={handleUploadFile}
                  {...register("backgroundFile")}
                />
              )}
              {errors.backgroundFile && (
                <ErrorMessage
                  errorMessage={errors.backgroundFile?.message as string}
                />
              )}
            </div>
          </div>

          <div className="w-full mt-6">
            <Button
              title={isSubmitting ? "Cadastrando..." : "Cadastrar post"}
              type="submit"
              disabled={!isValid || isSubmitting || isLoadingAuthors || authors.length === 0}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
