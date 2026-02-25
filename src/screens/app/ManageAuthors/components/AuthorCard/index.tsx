import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";

interface AuthorCardProps {
  bio: string;
  name: string;
  photoUrl: string;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function AuthorCard({
  bio,
  name,
  photoUrl,
  onEdit,
  onDelete,
  className,
}: AuthorCardProps) {
  return (
    <article
      className={`w-full min-h-[300px] bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-5 flex flex-col ${className}`}
    >
      <header className="flex items-center">
        <img
          src={photoUrl}
          alt={`Foto do autor ${name}`}
          className="w-10 h-10 rounded-full object-cover bg-gray-300"
        />
        <h3 className="text-gray-900 dark:text-gray-100 text-sm font-semibold ml-3">
          {name}
        </h3>
      </header>

      <div className="mt-4 flex-1">
        <span className="text-gray-900 dark:text-gray-100 text-sm font-semibold">
          Biografia
        </span>
        <p className="text-gray-700 dark:text-gray-300 text-[13px] leading-5 mt-2">
          {bio}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4">
        <button
          type="button"
          className="border-none outline-none bg-transparent p-0"
          onClick={onEdit}
          aria-label={`Editar autor ${name}`}
        >
          <MdEdit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          className="border-none outline-none bg-transparent p-0"
          onClick={onDelete}
          aria-label={`Remover autor ${name}`}
        >
          <IoMdTrash className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </article>
  );
}
