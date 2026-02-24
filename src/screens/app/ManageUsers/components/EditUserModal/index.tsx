import { Button } from "@/components/buttons/Button";
import { MaskedTextInput } from "@/components/inputs/MaskedTextInput";
import { PasswordTextInput } from "@/components/inputs/PasswordInput";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { phoneMask } from "@/utils/masks";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface EditUserModalProps {
  isOpen: boolean;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: (param: any) => void;
  onClose: () => void;
}

export function EditUserModal({
  isOpen,
  onRequestClose,
  onConfirmAction,
  onClose,
}: EditUserModalProps) {
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
        content="Atualização dos dados do usuário"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />
      <Subtitle
        content="Você pode alterar dados de telefone e/ou senha do usuário"
        className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
      />
      <div className="my-4">
        <MaskedTextInput inputLabel="Telefone" mask={phoneMask} />
      </div>
      <div className="my-4">
        <PasswordTextInput
          inputLabel="Senha antiga"
          placeholder="Informe a senha antiga"
        />
      </div>
      <div className="my-4">
        <PasswordTextInput
          inputLabel="Senha"
          placeholder="Informe a nova senha"
        />
      </div>
      <div className="my-4">
        <PasswordTextInput
          inputLabel="Confirmação de senha"
          placeholder="Confirme a nova senha"
        />
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
