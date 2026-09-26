import {
  BANK_COMPANY_IDS,
  BANK_CONNECTION_STATUSES,
} from "../constants/bank-connection.constants";

import type { IBankConnection } from "../interfaces/bank-connection.interface";

const BANK_COMPANY_ID_VALUES: readonly string[] =
  Object.values(BANK_COMPANY_IDS);

const BANK_CONNECTION_STATUS_VALUES: readonly string[] = Object.values(
  BANK_CONNECTION_STATUSES,
);

const isNullableString = (value: unknown): boolean =>
  value === null || typeof value === "string";

const isOneOf = (value: unknown, values: readonly string[]): boolean =>
  typeof value === "string" && values.includes(value);

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
    isOneOf(connection.company, BANK_COMPANY_ID_VALUES) &&
    isOneOf(connection.status, BANK_CONNECTION_STATUS_VALUES)
  );
};
