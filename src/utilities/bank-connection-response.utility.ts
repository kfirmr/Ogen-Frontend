import {
  BANK_COMPANY_IDS,
  BANK_CONNECTION_STATUSES,
} from "../constants/bank-connection.constants";

import type {
  IBankLoginHint,
  IBankConnection,
} from "../interfaces/bank-connection.interface";

import { isRecord } from "./free-text-response.utility";

const BANK_COMPANY_ID_VALUES: readonly string[] =
  Object.values(BANK_COMPANY_IDS);

const BANK_CONNECTION_STATUS_VALUES: readonly string[] = Object.values(
  BANK_CONNECTION_STATUSES,
);

const isNullableString = (value: unknown): boolean =>
  value === null || typeof value === "string";

const isOneOf = (value: unknown, values: readonly string[]): boolean =>
  typeof value === "string" && values.includes(value);

const isLoginHint = (value: unknown): value is IBankLoginHint => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNullableString(value.idLastDigits) &&
    isNullableString(value.cardLastDigits) &&
    isNullableString(value.usernamePrefix)
  );
};

const isNullableLoginHint = (value: unknown): boolean =>
  value == null || isLoginHint(value);

export const isBankConnection = (value: unknown): value is IBankConnection => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const connection = value as Record<string, unknown>;

  return (
    typeof connection.id === "string" &&
    typeof connection.createdAt === "string" &&
    isNullableString(connection.lastError) &&
    isNullableString(connection.lastSyncedAt) &&
    isNullableString(connection.otpRequestedAt) &&
    isNullableLoginHint(connection.loginHint) &&
    isOneOf(connection.company, BANK_COMPANY_ID_VALUES) &&
    isOneOf(connection.status, BANK_CONNECTION_STATUS_VALUES)
  );
};

export const toBankConnections = (data: unknown): IBankConnection[] => {
  if (!Array.isArray(data) || !data.every(isBankConnection)) {
    throw new Error("Invalid bank connections response structure");
  }

  return data;
};
