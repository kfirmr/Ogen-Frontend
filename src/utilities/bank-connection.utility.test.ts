import {
  findBankCompany,
  isValidationSlow,
  formatElapsedTime,
  resolveConnectOutcome,
  areCredentialsComplete,
  sanitizeCredentialInput,
} from "./bank-connection.utility";

import { describe, it, expect } from "vitest";
import { TIME_UNITS } from "../constants/date.constants";

const isracard = findBankCompany("isracard");
const max = findBankCompany("max");

describe("bank connection utilities", () => {
  it("only completes an ID login with a 9-digit ID, 6 card digits and a password", () => {
    expect(
      areCredentialsComplete(isracard, {
        id: "123456789",
        card6Digits: "123456",
        password: "secret",
      }),
    ).toBe(true);
    expect(
      areCredentialsComplete(isracard, {
        id: "12345",
        card6Digits: "123456",
        password: "secret",
      }),
    ).toBe(false);
  });

  it("completes a username login once both fields have a value", () => {
    expect(areCredentialsComplete(max, { username: "michal" })).toBe(false);
    expect(
      areCredentialsComplete(max, { username: "michal", password: "x" }),
    ).toBe(true);
  });

  it("keeps only digits in numeric fields and caps every field's length", () => {
    expect(sanitizeCredentialInput("id", "12-34a567890")).toBe("123456789");
    expect(sanitizeCredentialInput("username", "michal.levi")).toBe(
      "michal.levi",
    );
  });

  it("maps each backend status to the card step it shows", () => {
    expect(resolveConnectOutcome(null, max).step).toBe("VALIDATING");
    expect(resolveConnectOutcome("SYNCING", max).step).toBe("VALIDATING");
    expect(resolveConnectOutcome("ACTIVE", max).step).toBe("ACTIVE");
    expect(resolveConnectOutcome("INVALID_CREDENTIALS", max).step).toBe(
      "INVALID",
    );
    expect(resolveConnectOutcome("FAILED", max)).toEqual({
      step: "LOGIN",
      errorMessage: "לא הצלחנו להתחבר למקס כרגע. נסה שוב בעוד כמה דקות.",
    });
  });

  it("formats the elapsed time as minutes and padded seconds", () => {
    expect(formatElapsedTime(75 * TIME_UNITS.SECONDS)).toBe("⁦1:15⁩");
  });

  it("flags a validation as slow after 75 seconds", () => {
    expect(isValidationSlow(74 * TIME_UNITS.SECONDS)).toBe(false);
    expect(isValidationSlow(75 * TIME_UNITS.SECONDS)).toBe(true);
  });
});
