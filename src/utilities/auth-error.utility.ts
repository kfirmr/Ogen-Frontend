import { AUTH_MESSAGES } from "../constants/auth.constants";

const MESSAGE_BY_STATUS: Record<number, string> = {
  400: AUTH_MESSAGES.INVALID_DETAILS,
  401: AUTH_MESSAGES.INVALID_CREDENTIALS,
  403: AUTH_MESSAGES.TOO_MANY_ATTEMPTS,
  409: AUTH_MESSAGES.EMAIL_TAKEN,
};

const getResponseStatus = (error: unknown): number | null => {
  if (error === null || typeof error !== "object") {
    return null;
  }

  const response = (error as Record<string, unknown>).response;

  if (response === null || typeof response !== "object") {
    return null;
  }

  const status = (response as Record<string, unknown>).status;

  return typeof status === "number" ? status : null;
};

export const getAuthErrorMessage = (error: unknown): string => {
  const status = getResponseStatus(error);

  if (status === null) {
    return AUTH_MESSAGES.GENERIC_FAILURE;
  }

  return MESSAGE_BY_STATUS[status] ?? AUTH_MESSAGES.GENERIC_FAILURE;
};
