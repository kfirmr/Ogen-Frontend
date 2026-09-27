import {
  BANK_COMPANIES,
  LOGIN_HINT_MASKS,
  BANK_CONNECT_STEPS,
  BANK_CONNECTION_POLLING,
  type TBankCompanyIdType,
  BANK_CONNECTION_STATUSES,
  CONNECTED_ACCOUNT_LABELS,
  type TBankConnectStepType,
  type TBankCredentialFieldType,
  BANK_CONNECT_OUTCOME_BY_STATUS,
  type TBankConnectionStatusType,
  BANK_CREDENTIAL_FIELD_DEFINITIONS,
} from "../constants/bank-connection.constants";

import type {
  IBankCompany,
  IBankLoginHint,
  IBankConnection,
  TBankCredentials,
  IBankConnectOutcome,
  IConnectedAccountRow,
  IConnectedAccountView,
} from "../interfaces/bank-connection.interface";

import { formatDate, getDaysAgo } from "./date.utility";
import { DATE_FORMAT, TIME_UNITS } from "../constants/date.constants";

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

const RECENT_DAY_LABELS: Record<number, string> = {
  0: CONNECTED_ACCOUNT_LABELS.TODAY,
  1: CONNECTED_ACCOUNT_LABELS.YESTERDAY,
};

// A connection stays "connected" through a later temporary failure; only a rejected login or one
// that never completed a sync is not.
const isConnectedAccount = (connection: IBankConnection): boolean => {
  const isRejected =
    connection.status === BANK_CONNECTION_STATUSES.INVALID_CREDENTIALS;
  const hasSynced =
    connection.status === BANK_CONNECTION_STATUSES.ACTIVE ||
    connection.lastSyncedAt !== null;

  return !isRejected && hasSynced;
};

const byNewestFirst = (first: IBankConnection, second: IBankConnection) =>
  second.createdAt.localeCompare(first.createdAt);

export const findConnectedAccount = (
  connections: IBankConnection[],
): IBankConnection | null =>
  [...connections].sort(byNewestFirst).find(isConnectedAccount) ?? null;

interface ILoginHintRowBuilder {
  label: string;
  format: (fragment: string) => string;
  read: (hint: IBankLoginHint) => string | null;
}

const LOGIN_HINT_ROW_BUILDERS: ILoginHintRowBuilder[] = [
  {
    label: CONNECTED_ACCOUNT_LABELS.CARD,
    read: (hint) => hint.cardLastDigits,
    format: (digits) => `${LOGIN_HINT_MASKS.CARD}${digits}`,
  },
  {
    label: CONNECTED_ACCOUNT_LABELS.ID,
    read: (hint) => hint.idLastDigits,
    format: (digits) => `${LOGIN_HINT_MASKS.ID}${digits}`,
  },
  {
    label: CONNECTED_ACCOUNT_LABELS.USER,
    read: (hint) => hint.usernamePrefix,
    format: (prefix) => `${prefix}${LOGIN_HINT_MASKS.USERNAME_SUFFIX}`,
  },
];

const toLoginHintRows = (
  hint: IBankLoginHint | null,
): IConnectedAccountRow[] => {
  if (hint === null) {
    return [];
  }

  return LOGIN_HINT_ROW_BUILDERS.flatMap((builder) => {
    const fragment = builder.read(hint);

    return fragment === null
      ? []
      : [{ label: builder.label, value: builder.format(fragment) }];
  });
};

export const formatLastSync = (lastSyncedAt: string | null): string => {
  if (lastSyncedAt === null) {
    return CONNECTED_ACCOUNT_LABELS.AWAITING_FIRST_SYNC;
  }

  const time = formatDate(new Date(lastSyncedAt), DATE_FORMAT.TIME);
  const dayLabel =
    RECENT_DAY_LABELS[getDaysAgo(lastSyncedAt)] ??
    formatDate(new Date(lastSyncedAt), DATE_FORMAT.DATE_DOTS);

  return `${dayLabel}, ${time}`;
};

export const toConnectedAccountView = (
  connection: IBankConnection,
): IConnectedAccountView => {
  const company = findBankCompany(connection.company);

  return {
    name: company.name,
    mark: company.mark,
    kindLabel: company.kindLabel,
    rows: [
      ...toLoginHintRows(connection.loginHint),
      {
        label: CONNECTED_ACCOUNT_LABELS.CONNECTED_AT,
        value: formatDate(
          new Date(connection.createdAt),
          DATE_FORMAT.DATE_DOTS,
        ),
      },
      {
        label: CONNECTED_ACCOUNT_LABELS.LAST_SYNC,
        value: formatLastSync(connection.lastSyncedAt),
      },
    ],
  };
};
