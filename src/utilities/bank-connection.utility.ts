import {
  BANK_COMPANIES,
  BANK_CONNECT_STEPS,
  BANK_CONNECTION_POLLING,
  type TBankCompanyIdType,
  type TBankConnectStepType,
  type TBankCredentialFieldType,
  BANK_CONNECT_OUTCOME_BY_STATUS,
  type TBankConnectionStatusType,
  BANK_CREDENTIAL_FIELD_DEFINITIONS,
} from "../constants/bank-connection.constants";

import type {
  IBankCompany,
  TBankCredentials,
  IBankConnectOutcome,
} from "../interfaces/bank-connection.interface";

import { TIME_UNITS } from "../constants/date.constants";

const NON_DIGITS = /\D/g;

const LEFT_TO_RIGHT_ISOLATE = "⁦";

const POP_DIRECTIONAL_ISOLATE = "⁩";

export const findBankCompany = (id: TBankCompanyIdType): IBankCompany =>
  BANK_COMPANIES.find((company) => company.id === id) ?? BANK_COMPANIES[0];

export const areCredentialsComplete = (
  company: IBankCompany,
  credentials: TBankCredentials,
): boolean =>
  company.fields.every((field) =>
    BANK_CREDENTIAL_FIELD_DEFINITIONS[field].pattern.test(
      credentials[field] ?? "",
    ),
  );

export const sanitizeCredentialInput = (
  field: TBankCredentialFieldType,
  value: string,
): string => {
  const definition = BANK_CREDENTIAL_FIELD_DEFINITIONS[field];
  const allowedValue = definition.isNumeric
    ? value.replace(NON_DIGITS, "")
    : value;

  return allowedValue.slice(0, definition.maxLength);
};

export const resolveConnectOutcome = (
  status: TBankConnectionStatusType | null,
  company: IBankCompany,
): IBankConnectOutcome => {
  if (status === null) {
    return { step: BANK_CONNECT_STEPS.VALIDATING, errorMessage: null };
  }

  return BANK_CONNECT_OUTCOME_BY_STATUS[status](company);
};

export const isConnectStepSettled = (step: TBankConnectStepType): boolean =>
  step !== BANK_CONNECT_STEPS.VALIDATING;

export const getElapsedMs = (startedAt: number | null, now: number): number => {
  if (startedAt === null) {
    return 0;
  }

  return Math.max(0, now - startedAt);
};

export const isValidationSlow = (elapsedMs: number): boolean =>
  elapsedMs >= BANK_CONNECTION_POLLING.SLOW_AFTER_MS;

// Isolated as left-to-right so the minutes stay before the seconds inside Hebrew text.
export const formatElapsedTime = (elapsedMs: number): string => {
  const totalSeconds = Math.floor(elapsedMs / TIME_UNITS.SECONDS);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${LEFT_TO_RIGHT_ISOLATE}${minutes}:${seconds}${POP_DIRECTIONAL_ISOLATE}`;
};
