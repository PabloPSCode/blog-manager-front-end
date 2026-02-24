import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../../styles/globals.css"

interface PasswordTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
}

export const PasswordTextInput = forwardRef<
  HTMLInputElement,
  PasswordTextInputProps
>(({ inputLabel, ...rest }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-2 w-full bg-yan-400">
      <span className="text-gray-800 dark:text-gray-200 text-[12px] lg:text-sm">
        {inputLabel}
      </span>
      <div className="flex flex-row w-full h-[52px] border-2 rounded-lg z-10 bg-white dark:bg-slate-700   focus-within:border-blue-700">
        <input
          className="w-[95%] h-[48px] p-4 rounded-bl-md rounded-tl-md text-gray-700 dark:text-gray-100 outline-none bg-white dark:bg-slate-700 placeholder-custom"
          type={isPasswordVisible ? "text" : "password"}
          ref={ref}
          {...rest}
        />
        <button
          onClick={handleTogglePasswordVisibility}
          className="w-[48px]  h-[48px] flex items-center justify-center border-none outline-none bg-white dark:bg-slate-700 overflow:hidden rounded-md"
          type="button"
        >
          {isPasswordVisible ? (
            <FiEyeOff color="#b8b8b8" size={20} />
          ) : (
            <FiEye color="#b8b8b8" size={20} />
          )}
        </button>
      </div>
    </div>
  );
});

PasswordTextInput.displayName = "PasswordTextInput";
