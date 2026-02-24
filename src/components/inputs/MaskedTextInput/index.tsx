import { forwardRef } from "react";
import InputMask, { Props } from "react-input-mask";
import "../../../styles/globals.css"

interface TextInputProps extends Props {
  inputLabel: string;
}

export const MaskedTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ inputLabel, ...rest }, ref) => {
    return (
      <div className="mb-2 w-full">
        <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm">
          {inputLabel}
        </span>
        <InputMask
          className="w-full h-[52px] p-4 border-2 rounded-lg text-gray-700 dark:text-gray-100 focus:border-blue-700 focus:border-3 focus:outline-none focus:text-gray-700 bg-white dark:bg-slate-700 placeholder-custom"
          inputRef={ref}
          {...rest}
        />
      </div>
    );
  }
);

MaskedTextInput.displayName = "MaskedTextInput";
