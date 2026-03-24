import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface SeePostContentModalProps {
  isOpen: boolean;
  htmlContent: string;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>,
  ) => void;
}

export function SeePostContentModal({
  isOpen,
  htmlContent,
  onRequestClose,
}: SeePostContentModalProps) {
  const { theme } = useThemeStore();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose as never}
      style={
        theme === "light" ? reactModalCustomStyles : reactModalCustomStylesDark
      }
      contentLabel="Visualizacao do conteudo do post"
    >
      <div
        className="rich-text-content max-w-none overflow-y-auto text-sm leading-7 text-gray-900 dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Modal>
  );
}
