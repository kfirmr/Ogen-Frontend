import {
  formatLastSync,
  findBankCompany,
  isValidationSlow,
  formatElapsedTime,
  findConnectedAccount,
  resolveConnectOutcome,
  toConnectedAccountView,
  areCredentialsComplete,
  sanitizeCredentialInput,
} from "./bank-connection.utility";

import moment from "moment";
import { describe, it, expect } from "vitest";
import { TIME_UNITS } from "../constants/date.constants";
import type { IBankConnection } from "../interfaces/bank-connection.interface";

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

const buildAccount = (
  overrides: Partial<IBankConnection> = {},
): IBankConnection => ({
  status: "ACTIVE",
  lastError: null,
  company: "isracard",
  otpRequestedAt: null,
  lastSyncedAt: null,
  createdAt: "2026-09-21T09:00:00.000Z",
  id: "b6f0c0de-0000-4000-8000-000000000003",
  loginHint: {
    idLastDigits: "789",
    usernamePrefix: null,
    cardLastDigits: "4821",
  },
  ...overrides,
});

describe("findConnectedAccount", () => {
  it("keeps showing an account that synced before a temporary failure", () => {
    const account = buildAccount({
      status: "FAILED",
      lastSyncedAt: "2026-09-26T03:12:00.000Z",
    });

    expect(findConnectedAccount([account])).toBe(account);
  });

  it("ignores a rejected login and one still being validated", () => {
    expect(
      findConnectedAccount([
        buildAccount({ status: "INVALID_CREDENTIALS" }),
        buildAccount({ status: "PENDING_VALIDATION" }),
      ]),
    ).toBeNull();
  });

  it("prefers the most recently connected account", () => {
    const older = buildAccount({ createdAt: "2026-08-01T00:00:00.000Z" });
    const newer = buildAccount({
      company: "max",
      createdAt: "2026-09-01T00:00:00.000Z",
    });

    expect(findConnectedAccount([older, newer])).toBe(newer);
  });
});

describe("toConnectedAccountView", () => {
  it("masks the card and ID and dates the connection", () => {
    expect(toConnectedAccountView(buildAccount())).toEqual({
      mark: "י",
      name: "ישראכרט",
      kindLabel: "כרטיס אשראי",
      rows: [
        { label: "כרטיס", value: "•••• 4821" },
        { label: "תעודת זהות", value: "••••••789" },
        { label: "חובר ב־", value: "21.09.2026" },
        { label: "סנכרון אחרון", value: "ממתין לסנכרון ראשון" },
      ],
    });
  });

  it("masks a username login and omits rows for an account without a hint", () => {
    const withUsername = toConnectedAccountView(
      buildAccount({
        company: "leumi",
        loginHint: {
          idLastDigits: null,
          usernamePrefix: "no",
          cardLastDigits: null,
        },
      }),
    );
    const withoutHint = toConnectedAccountView(
      buildAccount({ loginHint: null }),
    );

    expect(withUsername.kindLabel).toBe("חשבון בנק");
    expect(withUsername.rows[0]).toEqual({ label: "משתמש", value: "no•••" });
    expect(withoutHint.rows.map((row) => row.label)).toEqual([
      "חובר ב־",
      "סנכרון אחרון",
    ]);
  });
});

describe("formatLastSync", () => {
  it("labels a sync from today with its time", () => {
    const syncedAt = moment().hour(6).minute(12).toISOString();

    expect(formatLastSync(syncedAt)).toBe("היום, 06:12");
  });

  it("dates an older sync", () => {
    expect(formatLastSync("2026-01-05T08:30:00")).toBe("05.01.2026, 08:30");
  });
});
