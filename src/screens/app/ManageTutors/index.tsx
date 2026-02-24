import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { tutors } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { EditTutorModal } from "./components/EditTutorModal";
import { TutorsTable } from "./components/TutorsTable";

export function ManageTutors() {
  const [isDeleteModalOpen, setIsDeleteModalTutorOpen] = useState(false);
  const [isEditTutorModalOpen, setIsEditModalTutorOpen] = useState(false);

  const handleToggleEditTutorModal = () => {
    setIsEditModalTutorOpen(!isEditTutorModalOpen);
  };
  const handleToggleDeleteModal = () => {
    setIsDeleteModalTutorOpen(!isDeleteModalOpen);
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Tutores" iconName="user-check" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-tutor">
              <PlusButton title="Cadastrar novo tutor" />
            </Link>
          </div>
        </div>
        <div className="lg:w-full flex-col flex md:items-center px-4">
          <TutorsTable
            tutors={tutors}
            onDeleteTutor={handleToggleDeleteModal}
            onUpdateTutor={handleToggleEditTutorModal}
          />
        </div>
      </div>
      <DeleteModal
        resource="tutor"
        isOpen={isDeleteModalOpen}
        onClose={handleToggleDeleteModal}
        onRequestClose={handleToggleDeleteModal}
        onConfirmAction={() => console.log("Tutor deleted")}
      />
      <EditTutorModal
        isOpen={isEditTutorModalOpen}
        onClose={handleToggleEditTutorModal}
        onRequestClose={handleToggleEditTutorModal}
        onConfirmAction={() => console.log("Tutor edited")}
      />
    </main>
  );
}
