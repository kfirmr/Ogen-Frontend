import type { IAuthSession } from "../interfaces/auth.interface";

const isAuthUser = (value: unknown): boolean => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.fullName === "string"
  );
};

export const isAuthSession = (value: unknown): value is IAuthSession => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const session = value as Record<string, unknown>;

  return typeof session.accessToken === "string" && isAuthUser(session.user);
};
