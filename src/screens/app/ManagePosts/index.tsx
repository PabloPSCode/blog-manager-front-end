import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { IAuthor, IPost } from "@/dtos";
import { authorsService } from "@/services/authors.service";
import { postsService, POST_SITE_ID } from "@/services/posts.service";
import { showAlertError, showAlertSuccess } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import {
  EditPostModal,
  EditPostModalInputs,
} from "./components/EditPostModal";
import { PostCard } from "./components/PostCard";
import { SeePostContentModal } from "./components/SeePostContentModal";

export function ManagePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isSeePostContentModalOpen, setIsSeePostContentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const getPlainTextFromHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const getReadingTimeFromHtml = (htmlContent: string) => {
    const plainText = getPlainTextFromHtml(htmlContent);
    const words = plainText ? plainText.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min`;
  };

  const getAuthorName = (authorId: string) =>
    authors.find((author) => author.id === authorId)?.name ?? "Autor nao encontrado";

  const authorOptions = [
    { value: "", label: "Selecione um autor" },
    ...authors.map((author) => ({
      value: author.id ?? author.name,
      label: author.name,
    })),
  ];

  const loadPostsAndAuthors = async () => {
    try {
      setIsLoadingData(true);
      const [loadedPosts, loadedAuthors] = await Promise.all([
        postsService.list(),
        authorsService.list(),
      ]);

      setPosts(loadedPosts);
      setAuthors(loadedAuthors);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar posts e autores.";

      showAlertError(errorMessage);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    void loadPostsAndAuthors();
  }, []);

  const handleOpenEditPostModal = (post: IPost) => {
    setSelectedPost(post);
    setIsEditPostModalOpen(true);
  };

  const handleCloseEditPostModal = () => {
    setSelectedPost(null);
    setIsEditPostModalOpen(false);
  };

  const handleOpenDeleteModal = (post: IPost) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleOpenSeePostContentModal = (post: IPost) => {
    setSelectedPost(post);
    setIsSeePostContentModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPost(null);
    setIsDeleteModalOpen(false);
  };

  const handleCloseSeePostContentModal = () => {
    setSelectedPost(null);
    setIsSeePostContentModalOpen(false);
  };

  const handleConfirmDeletePost = async () => {
    if (!selectedPost?.id) {
      handleCloseDeleteModal();
      return;
    }

    try {
      setIsDeletingPost(true);
      await postsService.delete(selectedPost.id);
      showAlertSuccess("Post removido com sucesso");
      handleCloseDeleteModal();
      await loadPostsAndAuthors();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel remover o post.";

      showAlertError(errorMessage);
    } finally {
      setIsDeletingPost(false);
    }
  };

  const handleConfirmEditPost = async (data: EditPostModalInputs) => {
    if (!selectedPost?.id) {
      handleCloseEditPostModal();
      return;
    }

    try {
      setIsUpdatingPost(true);
      await postsService.update({
        id: selectedPost.id,
        title: data.title.trim(),
        authorId: data.authorId,
        htmlContent: data.htmlContent,
        backgroundFile: data.backgroundFile?.[0] ?? null,
      });

      showAlertSuccess("Post atualizado com sucesso");
      handleCloseEditPostModal();
      await loadPostsAndAuthors();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nao foi possivel atualizar o post.";

      showAlertError(errorMessage);
    } finally {
      setIsUpdatingPost(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Gerenciar posts" iconName="file-text" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-post">
              <PlusButton title="Cadastrar novo post" />
            </Link>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 px-4 pb-4">
          {isLoadingData ? (
            <div className="col-span-full rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-5 text-sm text-gray-700 dark:text-gray-300">
              Carregando posts...
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                coverUrl={post.backgroundUrl}
                readingTime={getReadingTimeFromHtml(post.htmlContent)}
                authorName={getAuthorName(post.authorId)}
                onPreview={() => handleOpenSeePostContentModal(post)}
                onEdit={() => handleOpenEditPostModal(post)}
                onDelete={() => handleOpenDeleteModal(post)}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-5 text-sm text-gray-700 dark:text-gray-300">
              Nenhum post cadastrado para o site {POST_SITE_ID}.
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        resource="post"
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onRequestClose={handleCloseDeleteModal}
        onConfirmAction={handleConfirmDeletePost}
      />
      <EditPostModal
        isOpen={isEditPostModalOpen}
        post={selectedPost}
        authorOptions={authorOptions}
        onClose={handleCloseEditPostModal}
        onRequestClose={handleCloseEditPostModal}
        onConfirmAction={handleConfirmEditPost}
        isSubmitting={isUpdatingPost || isDeletingPost}
      />
      <SeePostContentModal
        isOpen={isSeePostContentModalOpen}
        htmlContent={selectedPost?.htmlContent ?? ""}
        onRequestClose={handleCloseSeePostContentModal}
      />
    </main>
  );
}
