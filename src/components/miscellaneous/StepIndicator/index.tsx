interface StepIndicatorProps {
  stepLabel: string;
  steps: number;
  activeUntilStep: number;
}

export function StepIndicator({
  stepLabel,
  activeUntilStep,
  steps,
}: StepIndicatorProps) {
  const stepsArray = Array.from({ length: steps }, (_, idx) => idx + 1);

  return (
    <div>
      <span className="text-gray-700 dark:text-gray-100 text-sm lg:text-[16px] mb-4">
        {stepLabel}
      </span>
      <div className="w-full p-1 flex flex-row mb-2">
        {stepsArray.map((step, idx) => (
          <div
            key={step}
            style={{ width: `${100 / steps}%` }}
            className={`transition-colors duration-300 ${
              idx + 1 <= activeUntilStep ? "bg-primary" : "bg-primary-light"
            } h-1 mr-1`}
          />
        ))}
      </div>
    </div>
  );
}
