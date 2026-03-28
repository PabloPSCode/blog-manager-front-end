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

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "Nao foi possivel concluir a requisicao.",
) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (Array.isArray(responseMessage) && responseMessage.length > 0) {
      return responseMessage.join(", ");
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
};
