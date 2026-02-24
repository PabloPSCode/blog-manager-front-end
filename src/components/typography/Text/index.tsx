import { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}
export function Text({ content, ...rest }: TextProps) {
  return (
    <span
      className="text-gray-600 dark:text-gray-50 font-regular text-[12px] lg:text-sm"
      {...rest}
    >
      {content}
    </span>
  );
}
