import { FiClock, FiEye } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";

interface PostCardProps {
  title: string;
  coverUrl: string;
  readingTime: string;
  authorName: string;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function PostCard({
  title,
  coverUrl,
  readingTime,
  authorName,
  onPreview,
  onEdit,
  onDelete,
  className,
}: PostCardProps) {
  return (
    <article
      className={`w-full min-h-[320px] bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex flex-col ${className ?? ""}`}
    >
      <img
        src={coverUrl}
        alt={`Capa do post ${title}`}
        className="w-full h-[180px] rounded-md object-cover bg-gray-300"
      />

      <h3 className="text-gray-900 dark:text-gray-100 text-sm sm:text-base font-semibold leading-tight mt-2 ">
        {title}
      </h3>

      <div className="mt-4 flex flex-row items-end justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
            <FiClock className="w-4 h-4 mr-2" />
            <span>{readingTime}</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Por {authorName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800"
            onClick={onPreview}
            aria-label={`Ver conteudo do post ${title}`}
          >
            <FiEye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span>Ver conteudo</span>
          </button>
          <button
            type="button"
            className="border-none outline-none bg-transparent p-0"
            onClick={onEdit}
            aria-label={`Editar post ${title}`}
          >
            <MdEdit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            type="button"
            className="border-none outline-none bg-transparent p-0"
            onClick={onDelete}
            aria-label={`Remover post ${title}`}
          >
            <IoMdTrash className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </article>
  );
}
