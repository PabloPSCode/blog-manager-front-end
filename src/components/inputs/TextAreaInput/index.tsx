import { InputHTMLAttributes, forwardRef } from "react";
import "../../../styles/globals.css"

interface TextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  currentTextLength?: number;
  showTextLength?: boolean;
  maxTextLength?: number;
}

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    { label, maxTextLength, currentTextLength, showTextLength, ...rest },
    ref
  ) => {
    const remainingTextLength =
      maxTextLength && currentTextLength
        ? maxTextLength - currentTextLength
        : maxTextLength;

    return (
      <div className="w-full flex flex-col h-[200px]">
        <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm mb-1">
          {label}
        </span>
        <textarea
          name="text-area"
          id="text-area"
          maxLength={maxTextLength}
          className="w-full flex flex-1 text-gray-700 border-2 rounded-lg focus:border-blue-700 focus:border-3 focus:outline-none focus:text-gray-700 bg-white dark:bg-slate-700 dark:text-gray-100 p-4 resize-none placeholder-custom"
          ref={ref}
          {...rest}
        />
        {showTextLength && (
          <span className="text-gray-700 dark:text-gray-100 text-[13px] mx-1 my-0">
            Caracteres restantes: {remainingTextLength}
          </span>
        )}
      </div>
    );
  }
);

TextAreaInput.displayName = "TextAreaInput";
