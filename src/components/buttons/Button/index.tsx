import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <button
      className={`w-full h-[52px] flex items-center justify-center bg-primary normal-case lg:text-base text-sm font-medium font-poppins rounded-lg disabled:opacity-[0.8] text-gray-50 font-secondary`}
      {...rest}
    >
      {title}
    </button>
  );
}
