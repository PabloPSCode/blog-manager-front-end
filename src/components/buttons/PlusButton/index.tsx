import FeatherIcon from "feather-icons-react";
import { ButtonHTMLAttributes } from "react";

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function PlusButton({ title, ...rest }: PlusButtonProps) {
  return (
    <button
      className={`flex flex-row items-center justify-center p-0.5 sm:p-2 rounded-md disabled:opacity-[0.8] min-w-5 `}
      {...rest}
    >
      <FeatherIcon
        icon="plus-circle"
        strokeWidth={1}
        className="text-primary-light  h-6 w-6 md:h-10 md:w-10 mb-0.5 block mr-1"
      />
      <span className="text-black dark:text-white lg:text-base md:text-sm text-[12px] hidden sm:flex font-bold">
        {title}
      </span>
    </button>
  );
}
