const DEFAULT_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const formatDate = (value?: string | Date | null) => {
  if (!value) {
    return "";
  }

  const parsedDate = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return DEFAULT_DATE_FORMATTER.format(parsedDate);
};
