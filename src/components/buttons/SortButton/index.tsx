import { ButtonHTMLAttributes } from "react";
import { PiSortAscendingLight, PiSortDescendingLight } from "react-icons/pi";

interface SortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sortType: "asc" | "desc";
}

export function SortButton({ sortType, ...rest }: SortButtonProps) {
  const buttonStyle =
    "flex flex-row items-center justify-center p-1 bg-white dark:bg-slate-900  rounded-md disabled:opacity-[0.8] text-gray-700 dark:text-gray-100 font-bold mb-[-8px] hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-800";

  return (
    <>
      {sortType === "asc" ? (
        <button className={buttonStyle} {...rest}>
          <PiSortAscendingLight className="lg:h-5 lg:w-5 h-4 w-4 mr-0.5  text-black dark:text-white hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800`" />
        </button>
      ) : (
        <button className={buttonStyle} {...rest}>
          <PiSortDescendingLight className="lg:h-5 lg:w-5 h-4 w-4   text-black dark:text-white hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800`" />
        </button>
      )}
    </>
  );
}
