import { PlusButton } from "@/components/buttons/PlusButton";
import { ScreenTitleIcon } from "@/components/miscellaneous/ScreenTitleIcon";
import { posts } from "@/data/mocked";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../components/miscellaneous/DeleteModal";
import { EditPostModal } from "./components/EditPostModal";
import { PostCard } from "./components/PostCard";

export function ManagePosts() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[number] | null>(
    null
  );

  const handleOpenEditPostModal = (post: (typeof posts)[number]) => {
    setSelectedPost(post);
    setIsEditPostModalOpen(true);
  };

  const handleCloseEditPostModal = () => {
    setSelectedPost(null);
    setIsEditPostModalOpen(false);
  };

  const handleOpenDeleteModal = (post: (typeof posts)[number]) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPost(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeletePost = () => {
    console.log("Post deleted", selectedPost?.id);
    handleCloseDeleteModal();
  };

  const handleConfirmEditPost = () => {
    console.log("Post edited", selectedPost?.id);
    handleCloseEditPostModal();
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col  w-full mx-auto xl:pr-8">
        <div className="mb-2 flex flex-row w-[full] justify-between items-center">
          <div className="mr-3 ml-4">
            <ScreenTitleIcon screenTitle="Gerenciar posts" iconName="book-open" />
          </div>
          <div className="mr-4">
            <Link to="/dashboard/cadastrar-post">
              <PlusButton title="Cadastrar novo post" />
            </Link>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 px-4 pb-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              coverUrl={post.coverUrl}
              readingTime={post.readingTime}
              authorName={post.authorName}
              onEdit={() => handleOpenEditPostModal(post)}
              onDelete={() => handleOpenDeleteModal(post)}
              className={post.id === "2" ? "border-2 border-primary" : ""}
            />
          ))}
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
        onClose={handleCloseEditPostModal}
        onRequestClose={handleCloseEditPostModal}
        onConfirmAction={handleConfirmEditPost}
      />
    </main>
  );
}
