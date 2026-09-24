import {
  IMPORT_STATUSES,
  IMPORT_STATUS_MESSAGES,
  TERMINAL_IMPORT_STATUSES,
} from "../constants/statement-import.constants";

import type { IStatementImport } from "../interfaces/statement-import.interface";

export const isImportFinished = (statementImport: IStatementImport): boolean =>
  TERMINAL_IMPORT_STATUSES.includes(statementImport.status);

export const isImportFailed = (statementImport: IStatementImport): boolean =>
  statementImport.status === IMPORT_STATUSES.FAILED;

export const getImportStatusMessage = (
  statementImport: IStatementImport,
): string =>
  IMPORT_STATUS_MESSAGES[statementImport.status](
    statementImport.transactionCount,
  );
