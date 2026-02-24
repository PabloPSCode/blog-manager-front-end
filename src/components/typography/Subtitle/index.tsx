import { HTMLAttributes } from "react";

interface SubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}
export function Subtitle({ content, ...rest }: SubtitleProps) {
  return (
    <h3
      className="text-gray-600 dark:text-gray-50 font-bold text-[12px] md:text-[14px]"
      {...rest}
    >
      {content}
    </h3>
  );
}
