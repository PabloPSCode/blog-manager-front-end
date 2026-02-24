import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { classes } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { ClassesTable } from "./components/ClassesTable";
import { EditClassModal } from "./components/EditClassModal";
import { WatchClassModal } from "./components/WatchClassmodal";

export function ManageClasses() {
  const [isDeleteModalOpen, setIsDeleteModalClassOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditModalClassOpen] = useState(false);
  const [isWatchClassModalOpen, setIsWatchModalClassOpen] = useState(false);

  const handleToggleEditClassModal = () => {
    setIsEditModalClassOpen(!isEditClassModalOpen);
  };
  const handleToggleDeleteModal = () => {
    setIsDeleteModalClassOpen(!isDeleteModalOpen);
  };
  const handleToggleWatchClassModal = () => {
    setIsWatchModalClassOpen(!isWatchClassModalOpen);
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Videoaulas" iconName="play-circle" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-videoaula">
              <PlusButton title="Cadastrar nova videoaula" />
            </Link>
          </div>
        </div>
        <div className="lg:w-full flex-col flex md:items-center px-4">
          <ClassesTable
            classes={classes}
            onDeleteClass={handleToggleDeleteModal}
            onUpdateClass={handleToggleEditClassModal}
            onWatchClass={handleToggleWatchClassModal}
          />
        </div>
      </div>
      <DeleteModal
        resource="conteúdo"
        isOpen={isDeleteModalOpen}
        onClose={handleToggleDeleteModal}
        onRequestClose={handleToggleDeleteModal}
        onConfirmAction={() => console.log("Class deleted")}
      />
      <EditClassModal
        isOpen={isEditClassModalOpen}
        onClose={handleToggleEditClassModal}
        onRequestClose={handleToggleEditClassModal}
        onConfirmAction={() => console.log("Class edited")}
      />
      <WatchClassModal
        classToWatch="Iniciando com scrollview"
        isOpen={isWatchClassModalOpen}
        onClose={handleToggleWatchClassModal}
        onRequestClose={handleToggleWatchClassModal}
      />
    </main>
  );
}
