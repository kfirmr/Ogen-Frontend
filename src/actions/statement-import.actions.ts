import {
  isImportFailed,
  isImportFinished,
} from "../utilities/statement-import.utility";

import {
  IMPORT_POLLING,
  STATEMENT_UPLOAD_MESSAGES,
} from "../constants/statement-import.constants";

import { delay } from "../utilities/async.utility";
import { transactionService } from "../services/transaction.service";
import { statementImportService } from "../services/statement-import.service";
import { getLatestTransactionMonthKey } from "../utilities/transaction.utility";
import type { IStatementImport } from "../interfaces/statement-import.interface";
import { getUploadErrorMessage } from "../utilities/statement-import-error.utility";
import { IMPORTED_TRANSACTIONS_BATCH_SIZE } from "../constants/transaction.constants";

export interface IUploadStatementActionResult {
  errorMessage: string | null;
  statementImport: IStatementImport | null;
  latestTransactionMonthKey: string | null;
}

const getImportedMonthKeySafely = async (
  importId: string,
): Promise<string | null> => {
  try {
    const importedTransactions = await transactionService.getByUser({
      importId,
      batchSize: IMPORTED_TRANSACTIONS_BATCH_SIZE,
    });

    return getLatestTransactionMonthKey(importedTransactions.items);
  } catch {
    return null;
  }
};

const pollUntilFinished = async (
  statementImport: IStatementImport,
  deadline: number,
): Promise<IStatementImport> => {
  if (isImportFinished(statementImport) || Date.now() >= deadline) {
    return statementImport;
  }

  await delay(IMPORT_POLLING.INTERVAL_MS);

  const refreshedImport = await statementImportService.getById(
    statementImport.id,
  );

  return pollUntilFinished(refreshedImport, deadline);
};

export const uploadStatementAction = async (
  file: File,
): Promise<IUploadStatementActionResult> => {
  try {
    const startedImport = await statementImportService.upload(file);
    const finishedImport = await pollUntilFinished(
      startedImport,
      Date.now() + IMPORT_POLLING.TIMEOUT_MS,
    );

    if (isImportFailed(finishedImport)) {
      return {
        statementImport: finishedImport,
        latestTransactionMonthKey: null,
        errorMessage: STATEMENT_UPLOAD_MESSAGES.GENERIC_FAILURE,
      };
    }

    return {
      errorMessage: null,
      statementImport: finishedImport,
      latestTransactionMonthKey: await getImportedMonthKeySafely(
        finishedImport.id,
      ),
    };
  } catch (error) {
    return {
      statementImport: null,
      latestTransactionMonthKey: null,
      errorMessage: getUploadErrorMessage(error),
    };
  }
};
