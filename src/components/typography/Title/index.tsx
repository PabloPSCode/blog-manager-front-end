import { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}
export function Title({ content, ...rest }: TitleProps) {
  return (
    <h1
      className="text-gray-900 dark:text-gray-300 font-bold text-lg md:text-xl"
      {...rest}
    >
      {content}
    </h1>
  );
}
