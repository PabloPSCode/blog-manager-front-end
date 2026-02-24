import { Button } from "@/components/buttons/Button";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { ICertificate } from "@/interfaces/dtos/Certificate";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { KeyboardEvent, MouseEvent } from "react";
import Modal from "react-modal";

interface SeeCertificateModalProps {
  isOpen: boolean;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onConfirmAction: (param: any) => void;
  onClose: () => void;
  certificate: ICertificate;
}

export function SeeCertificateModal({
  isOpen,
  onRequestClose,
  onConfirmAction,
  onClose,
  certificate,
}: SeeCertificateModalProps) {
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
        content="Exibindo detalhes de certificado"
        className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
      />

      <div className="flex flex-row w-full my-4">
        <Subtitle
          content="Aluno:"
          className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
        />
        <Subtitle
          content={certificate.user.name}
          className="text-center text-black dark:text-white font-bold ml-2 text-[13px] md:text-[14px]"
        />
      </div>
      <div className="flex flex-row w-full my-4">
        <Subtitle
          content="Curso:"
          className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
        />
        <Subtitle
          content={certificate.course.name}
          className="text-center text-black dark:text-white font-bold ml-2 text-[13px] md:text-[14px]"
        />
      </div>
      <div className="flex flex-row w-full my-4">
        <img
          src="https://pscodepscoursetrack.blob.core.windows.net/certificates/curso-de-react-pablo-santana-silva2-certificado.png"
          width={600}
          height={300}
          alt="certifado_de_conclusao"
        />
      </div>
      <div className="flex flex-row w-full my-4">
        <Subtitle
          content="Emitido em 21/12/2023"
          className="text-center text-gray-700 dark:text-gray-100  text-[13px] md:text-[14px]"
        />
      </div>
      <Button title="Baixar" onClick={onConfirmAction} />
      <button
        onClick={onClose}
        className="text-black dark:text-white bg-gray-200 dark:bg-slate-700  p-4 rounded-lg text-[13px] md:text-[14px] w-full my-2"
      >
        Fechar
      </button>
    </Modal>
  );
}
