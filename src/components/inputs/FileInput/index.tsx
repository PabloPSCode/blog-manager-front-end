import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelDescription?: string;
  buttonTitle?: string;
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    { label, labelDescription, buttonTitle, onUpload, onChange, ...rest },
    ref
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (onUpload && onUpload !== onChange) {
        onUpload(event);
      }
    };

    return (
      <div className="flex flex-col w-full">
        <span className="text-black dark:text-white text-[12px] lg:text-sm mb-1">
          {label}
        </span>
        {labelDescription && (
          <span className="text-gray-500 text-[12px] lg:text-sm mb-1 ">
            {labelDescription}
          </span>
        )}
        <input
          className="opacity-0 mb-[-52px] cursor-pointer z-10 w-full h-[52px]"
          ref={ref}
          onChange={handleChange}
          type="file"
          {...rest}
        />
        <button
          type="button"
          className="w-full h-[52px] flex items-center justify-center bg-gray-300 font-medium rounded-lg border-2 border-black text-black text-[12px] md:text-sm"
        >
          {buttonTitle ? buttonTitle : "Selecione um arquivo"}
        </button>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
