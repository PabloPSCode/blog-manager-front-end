import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { authors } from "@/data/mocked";
import { IAuthor } from "@/interfaces/dtos/Author";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { AuthorCard } from "./components/AuthorCard";
import { EditAuthorModal } from "./components/EditAuthorModal";

export function ManageAuthors() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditAuthorModalOpen, setIsEditAuthorModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);

  const handleOpenEditAuthorModal = (author: IAuthor) => {
    setSelectedAuthor(author);
    setIsEditAuthorModalOpen(true);
  };

  const handleCloseEditAuthorModal = () => {
    setSelectedAuthor(null);
    setIsEditAuthorModalOpen(false);
  };

  const handleOpenDeleteModal = (author: IAuthor) => {
    setSelectedAuthor(author);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedAuthor(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteAuthor = () => {
    console.log("Author deleted", selectedAuthor?.id);
    handleCloseDeleteModal();
  };

  const handleConfirmEditAuthor = () => {
    console.log("Author edited", selectedAuthor?.id);
    handleCloseEditAuthorModal();
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon
              screenTitle="Gerenciar autores"
              iconName="user-check"
            />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-autor">
              <PlusButton title="Cadastrar novo autor" />
            </Link>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 px-4 pb-4">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              name={author.name}
              bio={author.bio}
              photoUrl={author.photoUrl}
              onEdit={() => handleOpenEditAuthorModal(author)}
              onDelete={() => handleOpenDeleteModal(author)}
            />
          ))}
        </div>
      </div>
      <DeleteModal
        resource="autor"
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onRequestClose={handleCloseDeleteModal}
        onConfirmAction={handleConfirmDeleteAuthor}
      />
      <EditAuthorModal
        isOpen={isEditAuthorModalOpen}
        author={selectedAuthor}
        onClose={handleCloseEditAuthorModal}
        onRequestClose={handleCloseEditAuthorModal}
        onConfirmAction={handleConfirmEditAuthor}
      />
    </main>
  );
}
