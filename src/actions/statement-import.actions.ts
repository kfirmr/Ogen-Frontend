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

export const uploadStatementAction = async (
  file: File,
): Promise<IUploadStatementActionResult> => {
  try {
    const statementImport = await statementImportService.upload(file);

    return {
      statementImport,
      errorMessage: null,
      latestTransactionMonthKey: await getImportedMonthKeySafely(
        statementImport.id,
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
