import clsx from "clsx";
import React, { forwardRef, useId } from "react";
import VerificationInput from "react-verification-input";

type RVProps = React.ComponentProps<typeof VerificationInput>;
type ValidChars =
  | "0-9"
  | "A-Z"
  | "a-z"
  | "0-9A-Z"
  | "0-9a-z"
  | "A-Za-z"
  | "0-9A-Za-z";

export interface CodeVerificationInputProps
  extends Omit<
    RVProps,
    "classNames" | "placeholder" | "value" | "passwordChar"
  > {
  label: string;
  helperText?: string;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  validChars?: ValidChars;
  classNames?: Partial<NonNullable<RVProps["classNames"]>>;
}

const CodeVerificationInput = forwardRef<
  HTMLDivElement,
  CodeVerificationInputProps
>(
  (
    {
      label,
      helperText,
      errorMessage,
      containerClassName,
      labelClassName,
      placeholder = "•",
      disabled,
      length = 6,
      onChange,
      onComplete,
      value,
      classNames,
      validChars,
      inputProps,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const fieldId = `code-${reactId}`;
    const helpId = `${fieldId}-help`;
    const errorId = `${fieldId}-error`;

    const base: NonNullable<RVProps["classNames"]> = {
      container: clsx("flex gap-2 sm:gap-2.5"),
      character: clsx(
        "w-9 h-10 sm:w-10 sm:h-11 md:w-11 md:h-12",
        "!rounded-md !border !bg-background !text-foreground",
        "!border-gray-300 dark:!border-gray-600",
        "text-base sm:text-lg md:text-xl",
        "flex items-center justify-center transition",
        disabled && "opacity-60 cursor-not-allowed"
      ),
      characterInactive: "",
      characterSelected: clsx(
        "!outline-none focus:!outline-none focus-visible:!outline-none",
        "focus:!shadow-none focus-visible:!shadow-none",
        "!ring-2 !ring-primary-400/40 !border-primary-600"
      ),
      characterFilled: "!border-primary-600 !text-foreground",
    };

    if (errorMessage) {
      base.character = clsx(base.character, "!border-red-500");
      base.characterSelected = clsx(
        base.characterSelected,
        "!ring-red-400/40 !border-red-500"
      );
      base.characterFilled = clsx(base.characterFilled, "!border-red-500");
    }

    const merged: NonNullable<RVProps["classNames"]> = {
      ...base,
      ...classNames,
      container: clsx(base.container, classNames?.container),
      character: clsx(base.character, classNames?.character),
      characterInactive: clsx(
        base.characterInactive,
        classNames?.characterInactive
      ),
      characterSelected: clsx(
        base.characterSelected,
        classNames?.characterSelected
      ),
      characterFilled: clsx(base.characterFilled, classNames?.characterFilled),
    };

    const mergedInputProps: NonNullable<RVProps["inputProps"]> = {
      className: clsx("focus:!outline-none focus:!ring-0 focus:!shadow-none"),
      style: { outline: "none", boxShadow: "none" },
      ...(inputProps ?? {}),
    };

    return (
      <div
        ref={ref}
        className={clsx("w-full", containerClassName)}
        aria-invalid={!!errorMessage || undefined}
      >
        <label
          htmlFor={fieldId}
          className={clsx(
            "block font-medium text-xs sm:text-sm text-foreground mb-1",
            labelClassName
          )}
        >
          {label}
        </label>

        <div className="rounded-md bg-background px-1 py-1">
          <VerificationInput
            length={length}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onComplete={onComplete}
            validChars={validChars}
            autoFocus={false}
            classNames={merged}
            inputProps={mergedInputProps}
            aria-describedby={
              errorMessage ? errorId : helperText ? helpId : undefined
            }
            aria-disabled={disabled}
            {...rest}
          />
        </div>

        {errorMessage ? (
          <p id={errorId} className="text-red-600 text-xs sm:text-sm mt-1">
            {errorMessage}
          </p>
        ) : helperText && !disabled ? (
          <p id={helpId} className="text-foreground/70 text-xs sm:text-sm mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

CodeVerificationInput.displayName = "CodeVerificationInput";
export default CodeVerificationInput;
