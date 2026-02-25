import { Button } from "@/components/buttons/Button";
import { FileInput } from "@/components/inputs/FileInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface EditPostModalProps {
  isOpen: boolean;
  post: {
    id: string;
    title: string;
    description: string;
  } | null;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: () => void;
  onClose: () => void;
}

export function EditPostModal({
  isOpen,
  post,
  onRequestClose,
  onConfirmAction,
  onClose,
}: EditPostModalProps) {
  const { theme } = useThemeStore();

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
      <div key={post?.id ?? "post-form"}>
        <div className="my-4">
          <TextInput
            inputLabel="Título"
            placeholder="Novo título do post"
            defaultValue={post?.title}
          />
        </div>
        <div className="my-4">
          <TextAreaInput
            label="Conteúdo"
            placeholder="Conteúdo do post"
            defaultValue={post?.description}
          />
        </div>
        <div className="mt-4 mb-8">
          <FileInput
            label="Capa do post"
            labelDescription="Tamanho máximo do arquivo: 2MB"
            buttonTitle="Trocar capa do post"
          />
        </div>
      </div>
      <Button title="Salvar dados" onClick={onConfirmAction} />
      <button
        onClick={onClose}
        className="text-black dark:text-white bg-gray-200 dark:bg-slate-700  p-4 rounded-lg text-[13px] md:text-[14px] w-full my-2"
      >
        Cancelar
      </button>
    </Modal>
  );
}
