import { describe, it, expect } from "vitest";
import { getAuthErrorMessage } from "./auth-error.utility";
import { AUTH_MESSAGES } from "../constants/auth.constants";

const buildAxiosError = (status: number) => ({
  isAxiosError: true,
  response: { status },
});

describe("auth-error.utility", () => {
  it("explains wrong credentials", () => {
    expect(getAuthErrorMessage(buildAxiosError(401))).toBe(
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );
  });

  it("explains an email that is already registered", () => {
    expect(getAuthErrorMessage(buildAxiosError(409))).toBe(
      AUTH_MESSAGES.EMAIL_TAKEN,
    );
  });

  it("explains an invalid payload", () => {
    expect(getAuthErrorMessage(buildAxiosError(400))).toBe(
      AUTH_MESSAGES.INVALID_DETAILS,
    );
  });

  it("explains too many attempts", () => {
    expect(getAuthErrorMessage(buildAxiosError(403))).toBe(
      AUTH_MESSAGES.TOO_MANY_ATTEMPTS,
    );
  });

  it("falls back to a generic message for an unknown failure", () => {
    expect(getAuthErrorMessage(new Error("socket hang up"))).toBe(
      AUTH_MESSAGES.GENERIC_FAILURE,
    );
  });
});
