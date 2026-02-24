import { ButtonHTMLAttributes } from "react";

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <button
      className={`text-primary dark:text-primary-light normal-case text-sm font-medium font-poppins rounded-lg disabled:opacity-[0.5]`}
      {...rest}
    >
      {title}
    </button>
  );
}
