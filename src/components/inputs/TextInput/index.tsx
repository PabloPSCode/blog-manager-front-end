import { InputHTMLAttributes, forwardRef } from "react";
import "../../../styles/globals.css"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ inputLabel, ...rest }, ref) => {
    return (
      <div className="mb-2 w-full">
        <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm">
          {inputLabel}
        </span>
        <input
          className="w-full h-[52px] p-4 border-2 rounded-lg text-gray-700 dark:text-gray-100 focus:border-blue-700 focus:border-3 focus:outline-none focus:text-gray-700 bg-white dark:bg-slate-700 placeholder-custom"
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
