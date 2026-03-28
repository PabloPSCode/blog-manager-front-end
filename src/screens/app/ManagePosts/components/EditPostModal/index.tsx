import {
  DESCRIPTION_MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { FileInput } from "@/components/inputs/FileInput";
import RichTextInput from "@/components/inputs/RichText";
import { SelectInput } from "@/components/inputs/SelectInput";
import { TextInput } from "@/components/inputs/TextInput";
import { IPost } from "@/dtos";
import { IFile, UploadedFile } from "@/components/miscellaneous/UploadedFile";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";

export interface EditPostModalInputs {
  title: string;
  authorId: string;
  htmlContent: string;
  backgroundFile?: any;
}

interface EditPostModalProps {
  isOpen: boolean;
  post: IPost | null;
  authorOptions: Array<{
    value: string;
    label: string;
  }>;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: (data: EditPostModalInputs) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export function EditPostModal({
  isOpen,
  post,
  authorOptions,
  onRequestClose,
  onConfirmAction,
  onClose,
  isSubmitting = false,
}: EditPostModalProps) {
  const { theme } = useThemeStore();
  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const MIN_POST_CONTENT_LENGTH = 24;

  const getPlainTextFromHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const validationSchema = yup.object({
    title: yup.string().trim().required(REQUIRED_FIELD_MESSAGE),
    authorId: yup
      .string()
      .trim()
      .required(REQUIRED_FIELD_MESSAGE)
      .test("selected-author", REQUIRED_FIELD_MESSAGE, (value) =>
        Boolean(value?.trim()),
      ),
    backgroundFile: yup.mixed().optional(),
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
    reset,
    setValue,
    control,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<EditPostModalInputs>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      title: "",
      authorId: "",
      htmlContent: "",
      backgroundFile: undefined,
    },
  });

  useEffect(() => {
    reset({
      title: post?.title ?? "",
      authorId: post?.authorId ?? "",
      htmlContent: post?.htmlContent ?? "",
      backgroundFile: undefined,
    });
    setWasFileUploaded(false);
    setUploadedFile((currentFile) => {
      revokePreviewUrl(currentFile);
      return null;
    });
    if (post) {
      void trigger();
    }
  }, [post, reset, trigger]);

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
    setValue("backgroundFile", undefined, {
      shouldDirty: true,
    });
  };

  const handleSubmitForm: SubmitHandler<EditPostModalInputs> = (data) => {
    if (isSubmitting) {
      return;
    }

    onConfirmAction(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose as never}
      style={
        theme === "light" ? reactModalCustomStyles : reactModalCustomStylesDark
      }
    >
      <Title
        content="Atualização dos dados do post"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />
      <Subtitle
        content="Você pode alterar título, conteúdo e imagem de capa do post"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />
      <form
        key={post?.id ?? "post-form"}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="my-4">
          <TextInput
            inputLabel="Título"
            placeholder="Novo título do post"
            {...register("title")}
          />
          {touchedFields.title && errors.title && (
            <ErrorMessage errorMessage={errors.title?.message} />
          )}
        </div>
        <div className="my-4">
          <Controller
            name="authorId"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="Autor"
                options={authorOptions}
                selectedOption={
                  authorOptions.find((option) => option.value === field.value) ??
                  null
                }
                isSearchable={false}
                onSelectOption={(selectedOption) => {
                  field.onChange(String(selectedOption.value));
                }}
                onBlur={() => {
                  field.onBlur();
                }}
              />
            )}
          />
          {touchedFields.authorId && errors.authorId && (
            <ErrorMessage errorMessage={errors.authorId?.message} />
          )}
        </div>
        <div className="my-4">
          <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm mb-1">
            Conteúdo do post
          </span>
          <Controller
            name="htmlContent"
            control={control}
            render={({ field }) => (
              <RichTextInput
                key={post?.id ?? "post-editor"}
                initialData={field.value}
                placeholder="Atualize o conteúdo do post."
                className="!w-full mt-1 border-gray-300 bg-white min-h-[240px]"
                onChange={field.onChange}
                onBlur={field.onBlur}
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
            )}
          />
          {touchedFields.htmlContent && errors.htmlContent && (
            <ErrorMessage errorMessage={errors.htmlContent?.message} />
          )}
        </div>
        <div className="mt-4 mb-8">
          {wasFileUploaded && uploadedFile ? (
            <UploadedFile
              file={{
                name: uploadedFile.name,
                size: Number((uploadedFile.size / 1024 / 1024).toFixed(2)),
                uri: uploadedFile.uri,
                type: uploadedFile.type,
              }}
              onCancel={handleRemoveUploadedFile}
              imageClassName="w-24 aspect-video rounded-sm"
            />
          ) : (
            <>
              {post?.backgroundUrl && (
                <div className="mb-4">
                  <span className="text-black dark:text-white text-[12px] lg:text-sm mb-1 block">
                    Capa atual
                  </span>
                  <img
                    src={post.backgroundUrl}
                    alt={`Capa do post ${post.title}`}
                    className="w-full max-w-[280px] h-[180px] rounded-md object-cover bg-gray-300"
                  />
                </div>
              )}
              <FileInput
                label="Capa do post"
                labelDescription="Tamanho máximo do arquivo: 2MB"
                buttonTitle="Trocar capa do post"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onUpload={handleUploadFile}
                {...register("backgroundFile")}
              />
            </>
          )}
        </div>
        <Button
          title={isSubmitting ? "Salvando..." : "Salvar dados"}
          type="submit"
          disabled={!isValid}
        />
        <button
          type="button"
          onClick={onClose}
          className="text-black dark:text-white bg-gray-200 dark:bg-slate-700  p-4 rounded-lg text-[13px] md:text-[14px] w-full my-2"
        >
          Cancelar
        </button>
      </form>
    </Modal>
  );
}
