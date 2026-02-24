import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { modules } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { EditModuleModal } from "./components/EditModuleModal";
import { ModulesTable } from "./components/ModulesTable";

export function ManageModules() {
  const [isDeleteModalOpen, setIsDeleteModalModuleOpen] = useState(false);
  const [isEditModuleModalOpen, setIsEditModalModuleOpen] = useState(false);

  const handleToggleEditModuleModal = () => {
    setIsEditModalModuleOpen(!isEditModuleModalOpen);
  };
  const handleToggleDeleteModal = () => {
    setIsDeleteModalModuleOpen(!isDeleteModalOpen);
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Módulos" iconName="book" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-modulo">
              <PlusButton title="Cadastrar novo módulo" />
            </Link>
          </div>
        </div>
        <div className="lg:w-full flex-col flex md:items-center px-4">
          <ModulesTable
            modules={modules}
            onDeleteModule={handleToggleDeleteModal}
            onUpdateModule={handleToggleEditModuleModal}
          />
        </div>
      </div>
      <DeleteModal
        resource="módulo"
        isOpen={isDeleteModalOpen}
        onClose={handleToggleDeleteModal}
        onRequestClose={handleToggleDeleteModal}
        onConfirmAction={() => console.log("Module deleted")}
      />
      <EditModuleModal
        isOpen={isEditModuleModalOpen}
        onClose={handleToggleEditModuleModal}
        onRequestClose={handleToggleEditModuleModal}
        onConfirmAction={() => console.log("Module edited")}
      />
    </main>
  );
}
