import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { users } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { EditUserModal } from "./components/EditUserModal";
import { UsersTable } from "./components/UsersTable";

export function ManageUsers() {
  const [isDeleteModalOpen, setIsDeleteModalUserOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditModalUserOpen] = useState(false);

  const handleToggleEditUserModal = () => {
    setIsEditModalUserOpen(!isEditUserModalOpen);
  };
  const handleToggleDeleteModal = () => {
    setIsDeleteModalUserOpen(!isDeleteModalOpen);
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Usuários" iconName="users" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-usuario">
              <PlusButton title="Cadastrar novo usuário" />
            </Link>
          </div>
        </div>
        <div className="lg:w-full flex-col flex md:items-center px-4">
          <UsersTable
            users={users}
            onDeleteUser={handleToggleDeleteModal}
            onUpdateUser={handleToggleEditUserModal}
          />
        </div>
      </div>
      <DeleteModal
        resource="usuário"
        isOpen={isDeleteModalOpen}
        onClose={handleToggleDeleteModal}
        onRequestClose={handleToggleDeleteModal}
        onConfirmAction={() => console.log("User deleted")}
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={handleToggleEditUserModal}
        onRequestClose={handleToggleEditUserModal}
        onConfirmAction={() => console.log("User edited")}
      />
    </main>
  );
}
