import { Button } from "@/components/buttons/Button";
import { FileInput } from "@/components/inputs/FileInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { TextAreaInput } from "@/components/inputs/TextAreaInput";
import { TextInput } from "@/components/inputs/TextInput";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { modulesOptions, tutorOptions } from "@/data/placeholders";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface EditClassModalProps {
  isOpen: boolean;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: (param: any) => void;
  onClose: () => void;
}

export function EditClassModal({
  isOpen,
  onRequestClose,
  onConfirmAction,
  onClose,
}: EditClassModalProps) {
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
        content="Atualização dos dados do aula"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />
      <Subtitle
        content="Você pode alterar o nome, descrição, tutor,"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />
      <Subtitle
        content=" módulo e/ou reenviar um novo arquivo de vídeo"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />

      <div className="my-4">
        <TextInput inputLabel="Nome" placeholder="Novo nome do aula" />
      </div>
      <div className="my-4">
        <TextAreaInput label="Descrição" placeholder="Descrição do aula" />
      </div>
      <div className="my-4">
        <SelectInput
          label="Tutor"
          placeholder="Selecione um novo tutor"
          options={tutorOptions}
          onSelectOption={() => {}}
        />
      </div>
      <div className="my-4">
        <SelectInput
          label="Módulo"
          placeholder="Selecione um novo módulo"
          options={modulesOptions}
          onSelectOption={() => {}}
        />
      </div>

      <div className="my-4">
        <FileInput
          label="Videoaula"
          placeholder="Selecione uma nova videoaula"
          labelDescription="Selecione um arquivo de video .mp4 ou .mov de até 2MB"
        />
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
