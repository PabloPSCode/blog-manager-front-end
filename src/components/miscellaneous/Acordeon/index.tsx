import clsx from "clsx";
import FeatherIcon from "feather-icons-react";
import { useId, useMemo, useState } from "react";

export interface QuestionItem {
  question: string;
  answer: string;
}

export interface AccordeonProps {
  /** Lista de perguntas e respostas */
  questions: QuestionItem[];
  /** Abre múltiplos itens ao mesmo tempo (padrão: true) */
  allowMultiple?: boolean;
  /** IDs (ou índices) que iniciam abertos */
  defaultOpen?: Array<string | number>;
  /** Classes extras para o container externo */
  className?: string;
  /** Classes extras para cada item */
  itemClassName?: string;
  /** Mostrar divisórias entre itens (padrão: true) */
  showDividers?: boolean;
  /** Largura máxima opcional (ex.: "max-w-3xl") */
  maxWidthClassName?: string;
}

const Accordeon: React.FC<AccordeonProps> = ({
  questions,
  allowMultiple = true,
  defaultOpen = [],
  className,
  itemClassName,
  showDividers = true,
  maxWidthClassName = "max-w-3xl",
}: AccordeonProps) => {
  /** Normaliza defaultOpen permitindo ids (string) ou índices (number) */
  const initialOpen = useMemo(() => {
    const openSet = new Set<number>();
    defaultOpen.forEach((key) => {
      if (typeof key === "number" && key >= 0 && key < questions.length) {
        openSet.add(key);
      } else if (typeof key === "string") {
        const idx = questions.findIndex((q) => q.question === key);
        if (idx >= 0) openSet.add(idx);
      }
    });
    return openSet;
  }, [defaultOpen, questions]);

  const [openIndices, setOpenIndices] = useState<Set<number>>(initialOpen);
  const baseId = useId();

  const toggle = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      const isOpen = next.has(idx);
      if (allowMultiple) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isOpen ? next.delete(idx) : next.add(idx);
      } else {
        next.clear();
        if (!isOpen) next.add(idx);
      }
      return next;
    });
  };

  return (
    <div
      className={clsx(
        "w-full mx-auto",
        maxWidthClassName,
        "rounded-lg border border-foreground/20 bg-background text-foreground shadow-sm",
        "p-3 sm:p-4",
        className
      )}
    >
      {questions.map((q, idx) => {
        const isOpen = openIndices.has(idx);
        const headerId = `${baseId}-header-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div
            key={`${q.question}-${idx}`}
            className={clsx("w-full", itemClassName)}
          >
            {/* Header */}
            <div className="w-full flex items-start justify-between gap-3 py-2">
              <button
                id={headerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
                className={clsx(
                  "group flex flex-1 items-center text-left",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md",
                  "min-w-0"
                )}
              >
                <span
                  className={clsx(
                    "font-semibold break-words",
                    "text-sm sm:text-base md:text-lg"
                  )}
                >
                  {q.question}
                </span>
              </button>

              <button
                aria-label={isOpen ? "Recolher resposta" : "Expandir resposta"}
                onClick={() => toggle(idx)}
                className={clsx(
                  "flex-shrink-0 inline-flex items-center justify-center rounded-md",
                  "text-foreground/80 hover:text-foreground transition",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  "h-9 w-9"
                )}
              >
                {isOpen ? (
                  <FeatherIcon icon="circle-plus" className="h-6 w-6" />
                ) : (
                    <FeatherIcon icon="circle-plus" className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Painel – animação responsiva sem max-height fixa */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={clsx(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-90"
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-3 sm:pb-4">
                  <p
                    className={clsx(
                      "leading-relaxed",
                      "text-foreground/85",
                      "text-xs sm:text-sm"
                    )}
                  >
                    {q.answer}
                  </p>
                </div>
              </div>
            </div>

            {showDividers && idx !== questions.length - 1 && (
              <div className="h-px w-full bg-foreground/10" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordeon;
