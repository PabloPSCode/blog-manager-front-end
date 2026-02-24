interface ErrorMessageProps {
  errorMessage: string | undefined;
}

export function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <span className="text-[12px] text-red-300 mb-2">{errorMessage}</span>;
}
