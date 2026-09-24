import { TIME_UNITS } from "./date.constants";

export const STATEMENT_UPLOAD_MESSAGES = {
  GENERIC_FAILURE: "העלאת הקובץ נכשלה, נסו שוב",
} as const;

export const IMPORT_STATUSES = {
  FAILED: "FAILED",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  PROCESSING: "PROCESSING",
} as const;

export type TImportStatusType =
  (typeof IMPORT_STATUSES)[keyof typeof IMPORT_STATUSES];

export const IMPORT_SOURCES = {
  CSV: "CSV",
  XLSX: "XLSX",
  MANUAL: "MANUAL",
  BANK_API: "BANK_API",
} as const;

export type TImportSourceType =
  (typeof IMPORT_SOURCES)[keyof typeof IMPORT_SOURCES];

export const TERMINAL_IMPORT_STATUSES: readonly TImportStatusType[] = [
  IMPORT_STATUSES.FAILED,
  IMPORT_STATUSES.COMPLETED,
];

// Upload returns as soon as the row is marked PROCESSING and finishes parsing, classification and
// the leak scan in a background task, so the client has to poll for the final outcome.
export const IMPORT_POLLING = {
  INTERVAL_MS: 1.5 * TIME_UNITS.SECONDS,
  TIMEOUT_MS: 2 * TIME_UNITS.MINUTES,
} as const;

export const IMPORT_STATUS_MESSAGES: Record<
  TImportStatusType,
  (transactionCount: number) => string
> = {
  [IMPORT_STATUSES.FAILED]: () => STATEMENT_UPLOAD_MESSAGES.GENERIC_FAILURE,
  [IMPORT_STATUSES.PENDING]: () => "הקובץ ממתין לסריקה",
  [IMPORT_STATUSES.PROCESSING]: () =>
    "אנחנו עדיין סורקים את הקובץ, התנועות יופיעו בעוד רגע",
  [IMPORT_STATUSES.COMPLETED]: (transactionCount) =>
    `הקובץ נסרק בהצלחה, יובאו ${transactionCount} תנועות חדשות`,
};
