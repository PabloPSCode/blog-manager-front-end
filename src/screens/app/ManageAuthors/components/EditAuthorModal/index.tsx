import { Button } from "@/components/buttons/Button";
import { FileInput } from "@/components/inputs/FileInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { IAuthor } from "@/interfaces/dtos/Author";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface EditAuthorModalProps {
  isOpen: boolean;
  author: IAuthor | null;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: () => void;
  onClose: () => void;
}

export function EditAuthorModal({
  isOpen,
  author,
  onRequestClose,
  onConfirmAction,
  onClose,
}: EditAuthorModalProps) {
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
        content="Atualização dos dados do autor"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />
      <Subtitle
        content="Você pode alterar nome, biografia e foto do autor"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />
      <div key={author?.id ?? "author-form"}>
        <div className="my-4">
          <TextInput
            inputLabel="Nome"
            placeholder="Nome do autor"
            defaultValue={author?.name}
          />
        </div>
        <div className="my-4">
          <TextAreaInput
            label="Biografia"
            placeholder="Biografia do autor"
            defaultValue={author?.bio}
          />
        </div>
        <div className="mb-8 mt-4">
          <FileInput
            label="Foto do autor"
            buttonTitle="Trocar foto do autor"
          />
        </div>
      </div>
      <Button title="Salvar dados" onClick={onConfirmAction} />
      <button
        onClick={onClose}
        className="text-black dark:text-white bg-gray-200 dark:bg-slate-700 p-4 rounded-lg text-[13px] md:text-[14px] w-full my-2"
      >
        Cancelar
      </button>
    </Modal>
  );
}
