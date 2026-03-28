import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3336";
const IS_NGROK_API = /https?:\/\/[^/]*ngrok(-free)?\.(app|dev|io)\b/i.test(
  API_BASE_URL,
);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: IS_NGROK_API
    ? {
        "ngrok-skip-browser-warning": "true",
      }
    : undefined,
});

const API_FIELD_TRANSLATIONS: Record<string, string> = {
  domain: "O domínio",
  password: "A senha",
  code: "O código",
  name: "O nome",
  bio: "A biografia",
  title: "O título",
  htmlContent: "O conteúdo do post",
  authorId: "O autor",
  siteId: "O site",
  clientWhatsapp: "O WhatsApp do cliente",
  url: "A URL do site",
  id: "O identificador",
  sub: "A sessão",
};

const API_MESSAGE_TRANSLATIONS: Record<string, string> = {
  "Invalid domain or password.": "Domínio ou senha inválidos.",
  "Invalid or expired recovery code.":
    "Código de recuperação inválido ou expirado.",
  "Missing or invalid JWT.": "Sua sessão expirou. Faça login novamente.",
  "Invalid JWT.": "Sua sessão é inválida. Faça login novamente.",
  "Recovery code sent successfully to the site WhatsApp.":
    "Código de recuperação enviado com sucesso para o WhatsApp do site.",
  "Password updated successfully.": "Senha atualizada com sucesso.",
  "Recovery code is valid.": "Código de recuperação válido.",
  "Failed to generate the recovery token.":
    "Não foi possível gerar o código de recuperação.",
  "Failed to update the password.": "Não foi possível atualizar a senha.",
  "Failed to create the site record.": "Não foi possível cadastrar o site.",
  "Failed to connect to the WhatsApp provider.":
    "Não foi possível se conectar ao provedor de WhatsApp.",
  "clientWhatsapp must contain exactly 6 digits.":
    "O WhatsApp do cliente é inválido.",
  "code must contain exactly 6 digits.":
    "O código deve conter exatamente 6 dígitos.",
  "No active site was found for domain":
    "Nenhum site ativo foi encontrado para o domínio informado.",
};

const getStatusFallbackMessage = (
  status: number | undefined,
  fallbackMessage: string,
) => {
  if (!status) {
    return fallbackMessage;
  }

  const statusMessages: Record<number, string> = {
    400: "Não foi possível concluir a solicitação. Verifique os dados informados.",
    401: "Sua sessão expirou ou os dados informados são inválidos.",
    403: "Você não tem permissão para realizar esta ação.",
    404: "O recurso solicitado não foi encontrado.",
    409: "Já existe um registro com os dados informados.",
    422: "Os dados informados são inválidos. Revise e tente novamente.",
    500: "Ocorreu um erro interno. Tente novamente em instantes.",
    502: "O serviço está temporariamente indisponível. Tente novamente em instantes.",
    503: "O serviço está temporariamente indisponível. Tente novamente em instantes.",
    504: "O serviço demorou para responder. Tente novamente em instantes.",
  };

  return statusMessages[status] ?? fallbackMessage;
};

const translateApiMessage = (message: string): string => {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    return message;
  }

  if (API_MESSAGE_TRANSLATIONS[normalizedMessage]) {
    return API_MESSAGE_TRANSLATIONS[normalizedMessage];
  }

  const requiredFieldMatch = normalizedMessage.match(
    /^([a-zA-Z]+) is required\.$/,
  );

  if (requiredFieldMatch) {
    const fieldName = requiredFieldMatch[1];
    return `${API_FIELD_TRANSLATIONS[fieldName] ?? "Este campo"} é obrigatório.`;
  }

  if (/^Author .+ was not found\.$/.test(normalizedMessage)) {
    return "Autor não encontrado.";
  }

  if (/^Post .+ was not found\.$/.test(normalizedMessage)) {
    return "Post não encontrado.";
  }

  if (/^Site .+ was not found\.$/.test(normalizedMessage)) {
    return "Site não encontrado.";
  }

  if (/^No active site was found for domain .+\.$/.test(normalizedMessage)) {
    return "Nenhum site ativo foi encontrado para o domínio informado.";
  }

  if (
    /instance/i.test(normalizedMessage) &&
    /(does not exist|not found)/i.test(normalizedMessage)
  ) {
    return "A instância do WhatsApp configurada não foi encontrada.";
  }

  if (
    /(disconnected|not connected|connection closed)/i.test(normalizedMessage)
  ) {
    return "O WhatsApp configurado não está conectado no momento.";
  }

  if (/whatsapp provider returned http \d+/i.test(normalizedMessage)) {
    return "O provedor de WhatsApp retornou um erro ao enviar a mensagem.";
  }

  if (
    /network error|failed to fetch|load failed|cors/i.test(normalizedMessage)
  ) {
    return "Não foi possível se conectar ao servidor. Verifique sua conexão e tente novamente.";
  }

  if (/request failed with status code \d+/i.test(normalizedMessage)) {
    return "Não foi possível concluir a solicitação no momento.";
  }

  return normalizedMessage;
};

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "Não foi possível concluir a requisição.",
) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return translateApiMessage(responseMessage);
    }

    if (Array.isArray(responseMessage) && responseMessage.length > 0) {
      return responseMessage
        .map((message) => translateApiMessage(message))
        .join(", ");
    }

    if (error.code === "ERR_NETWORK") {
      return "Não foi possível se conectar ao servidor. Verifique sua conexão e tente novamente.";
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return translateApiMessage(error.message);
    }

    return getStatusFallbackMessage(error.response?.status, fallbackMessage);
  }

  if (error instanceof Error && error.message.trim()) {
    return translateApiMessage(error.message);
  }

  return fallbackMessage;
};
