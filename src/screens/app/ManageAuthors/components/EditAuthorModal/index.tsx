import {
  DESCRIPTION_MIN_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "@/appConstants/index";
import { Button } from "@/components/buttons/Button";
import { ErrorMessage } from "@/components/inputs/ErrorMessage";
import { FileInput } from "@/components/inputs/FileInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { IAuthor } from "@/dtos";
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
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";

export interface EditAuthorModalInputs {
  name: string;
  bio: string;
  photo_file?: any;
}

interface EditAuthorModalProps {
  isOpen: boolean;
  author: IAuthor | null;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: (data: EditAuthorModalInputs) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export function EditAuthorModal({
  isOpen,
  author,
  onRequestClose,
  onConfirmAction,
  onClose,
  isSubmitting = false,
}: EditAuthorModalProps) {
  const { theme } = useThemeStore();
  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);
  const MIN_TUTOR_BIO_LENGTH = 24;
  const MAX_TUTOR_BIO_LENGTH = 500;

  const validationSchema = yup.object({
    name: yup.string().trim().required(REQUIRED_FIELD_MESSAGE),
    photo_file: yup.mixed().optional(),
    bio: yup
      .string()
      .trim()
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
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<EditAuthorModalInputs>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      name: "",
      bio: "",
      photo_file: undefined,
    },
  });

  const bioValue = watch("bio");

  useEffect(() => {
    reset({
      name: author?.name ?? "",
      bio: author?.bio ?? "",
      photo_file: undefined,
    });
    setWasFileUploaded(false);
    setUploadedFile((currentFile) => {
      revokePreviewUrl(currentFile);
      return null;
    });
    if (author) {
      void trigger();
    }
  }, [author, reset, trigger]);

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
      shouldDirty: true,
    });
  };

  const handleSubmitForm: SubmitHandler<EditAuthorModalInputs> = (data) => {
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
        content="Atualização dos dados do autor"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />
      <Subtitle
        content="Você pode alterar nome, biografia e foto do autor"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />
      <form
        key={author?.id ?? "author-form"}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="my-4">
          <TextInput
            inputLabel="Nome"
            placeholder="Nome do autor"
            {...register("name")}
          />
          {touchedFields.name && errors.name && (
            <ErrorMessage errorMessage={errors.name?.message} />
          )}
        </div>
        <div className="my-4">
          <TextAreaInput
            label="Biografia"
            showTextLength
            currentTextLength={bioValue ? bioValue.length : 0}
            maxTextLength={MAX_TUTOR_BIO_LENGTH}
            placeholder="Biografia do autor"
            {...register("bio")}
          />
          {touchedFields.bio && errors.bio && (
            <ErrorMessage errorMessage={errors.bio?.message} />
          )}
        </div>
        <div className="mb-8 mt-4">
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
            <>
              {author?.avatarUrl && (
                <div className="mb-4">
                  <span className="text-black dark:text-white text-[12px] lg:text-sm mb-1 block">
                    Foto atual
                  </span>
                  <img
                    src={author.avatarUrl}
                    alt={`Foto do autor ${author.name}`}
                    className="w-24 h-24 rounded-full object-cover bg-gray-300"
                  />
                </div>
              )}
              <FileInput
                label="Foto do autor"
                labelDescription="Selecione uma imagem .jpeg ou .png (opcional)"
                buttonTitle="Trocar foto do autor"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onUpload={handleUploadFile}
                {...register("photo_file")}
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
          className="text-black dark:text-white bg-gray-200 dark:bg-slate-700 p-4 rounded-lg text-[13px] md:text-[14px] w-full my-2"
        >
          Cancelar
        </button>
      </form>
    </Modal>
  );
}
