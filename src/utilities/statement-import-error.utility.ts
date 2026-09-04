import { STATEMENT_UPLOAD_MESSAGES } from "../constants/statement-import.constants";

const getResponseMessage = (error: unknown): string | null => {
  if (error === null || typeof error !== "object") {
    return null;
  }

  const response = (error as Record<string, unknown>).response;

  if (response === null || typeof response !== "object") {
    return null;
  }

  const data = (response as Record<string, unknown>).data;

  if (data === null || typeof data !== "object") {
    return null;
  }

  const message = (data as Record<string, unknown>).message;

  return typeof message === "string" ? message : null;
};

export const getUploadErrorMessage = (error: unknown): string =>
  getResponseMessage(error) ?? STATEMENT_UPLOAD_MESSAGES.GENERIC_FAILURE;
