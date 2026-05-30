import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { IAuthor } from "@/dtos";
import { authorsService } from "@/services/authors.service";
import { useAuthenticationStore } from "@/store/auth";
import { showAlertError, showAlertSuccess } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { AuthorCard } from "./components/AuthorCard";
import {
  EditAuthorModal,
  EditAuthorModalInputs,
} from "./components/EditAuthorModal";

export function ManageAuthors() {
  const site = useAuthenticationStore((state) => state.site);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  const [isUpdatingAuthor, setIsUpdatingAuthor] = useState(false);
  const [isDeletingAuthor, setIsDeletingAuthor] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditAuthorModalOpen, setIsEditAuthorModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);

  const loadAuthors = async () => {
    try {
      setIsLoadingAuthors(true);
      const loadedAuthors = await authorsService.list();
      setAuthors(loadedAuthors);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar os autores.";

      showAlertError(errorMessage);
    } finally {
      setIsLoadingAuthors(false);
    }
  };

  useEffect(() => {
    void loadAuthors();
  }, []);

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

  const handleConfirmDeleteAuthor = async () => {
    if (!selectedAuthor?.id) {
      handleCloseDeleteModal();
      return;
    }

    try {
      setIsDeletingAuthor(true);
      await authorsService.delete(selectedAuthor.id);
      showAlertSuccess("Autor removido com sucesso");
      handleCloseDeleteModal();
      await loadAuthors();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel remover o autor.";

      showAlertError(errorMessage);
    } finally {
      setIsDeletingAuthor(false);
    }
  };

  const handleConfirmEditAuthor = async (data: EditAuthorModalInputs) => {
    if (!selectedAuthor?.id) {
      handleCloseEditAuthorModal();
      return;
    }

    try {
      setIsUpdatingAuthor(true);

      await authorsService.update({
        id: selectedAuthor.id,
        name: data.name.trim(),
        bio: data.bio.trim(),
        avatarFile: data.photo_file?.[0] ?? null,
      });

      showAlertSuccess("Autor atualizado com sucesso");
      handleCloseEditAuthorModal();
      await loadAuthors();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel atualizar o autor.";

      showAlertError(errorMessage);
    } finally {
      setIsUpdatingAuthor(false);
    }
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 px-4 pb-4">
          {isLoadingAuthors ? (
            <div className="col-span-full rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-5 text-sm text-gray-700 dark:text-gray-300">
              Carregando autores...
            </div>
          ) : authors.length > 0 ? (
            authors.map((author) => (
              <AuthorCard
                key={author.id}
                name={author.name}
                bio={author.bio}
                photoUrl={author.avatarUrl}
                onEdit={() => handleOpenEditAuthorModal(author)}
                onDelete={() => handleOpenDeleteModal(author)}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-5 text-sm text-gray-700 dark:text-gray-300">
              Nenhum autor cadastrado para o site {site?.domain ?? "autenticado"}.
            </div>
          )}
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
        isSubmitting={isUpdatingAuthor || isDeletingAuthor}
      />
    </main>
  );
}
