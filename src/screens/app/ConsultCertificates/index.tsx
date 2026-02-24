import { SelectInput } from "@/components/inputs/SelectInput";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { certificates } from "@/data/mocked";
import { useEffect, useState } from "react";
import { CertificatesTable } from "./components/CertificatesTable";
import { SeeCertificateModal } from "./components/SeeCertificateModal";

export function ConsultCertificates() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [certificateData, setCertificatesData] = useState(certificates);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleToggleDetailsModal = () => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
  };

  const mockedCertificate = certificates[0];

  const handleDownloadCertificate = () =>
    (window.location.href =
      "https://pscodepscoursetrack.blob.core.windows.net/certificates/curso-de-react-pablo-santana-silva2-certificado.png");

  const selectInputOptions = certificates
    .map((certificate) => ({
      value: certificate.user.name,
      label: certificate.user.name,
    }))
    .concat([{ value: "Todos os usuários", label: "Todos os usuários" }]);

  useEffect(() => {
    if (selectedUserName === "" || selectedUserName === "Todos os usuários") {
      setCertificatesData(certificates);
    } else {
      const filteredCertificates = certificates.filter(
        (certificate) => certificate.user.name === selectedUserName
      );
      setCertificatesData(filteredCertificates);
    }
  }, [selectedUserName]);

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-[95%] mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col items-center  w-full mx-auto">
        <div className="mb-2 flex lg:flex-row flex-col w-[80%] justify-start lg:justify-between items-center">
          <div className="mr-3 mb-4">
            <ScreenTitleIcon screenTitle="Certificados" iconName="star" />
          </div>
          <SelectInput
            options={selectInputOptions}
            label="Selecione um usuário para filtrar certificados relacionados"
            containerClassName="w-[100%] md:w-[50vh]"
            placeholder="Selecione um usuario"
            onSelectOption={(val) => setSelectedUserName(val.label)}
          />
        </div>
        <div className="w-full flex-col flex items-center">
          <CertificatesTable
            certificates={certificateData}
            onDownloadCertificate={handleDownloadCertificate}
            onSeeCertificate={handleToggleDetailsModal}
          />
        </div>
      </div>
      <SeeCertificateModal
        isOpen={isDetailsModalOpen}
        onRequestClose={handleToggleDetailsModal}
        onClose={handleToggleDetailsModal}
        onConfirmAction={handleDownloadCertificate}
        certificate={mockedCertificate}
      />
    </main>
  );
}
