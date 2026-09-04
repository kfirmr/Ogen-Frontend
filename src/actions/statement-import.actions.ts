import { transactionService } from "../services/transaction.service";
import { statementImportService } from "../services/statement-import.service";
import { getLatestTransactionMonthKey } from "../utilities/transaction.utility";
import { RECENT_TRANSACTIONS_REQUEST } from "../constants/transaction.constants";
import type { IStatementImport } from "../interfaces/statement-import.interface";
import { getUploadErrorMessage } from "../utilities/statement-import-error.utility";

export interface IUploadStatementActionResult {
  errorMessage: string | null;
  statementImport: IStatementImport | null;
  latestTransactionMonthKey: string | null;
}

const getLatestTransactionMonthKeySafely = async (): Promise<string | null> => {
  try {
    const recentTransactions = await transactionService.getByUser(
      RECENT_TRANSACTIONS_REQUEST,
    );

    return getLatestTransactionMonthKey(recentTransactions.items);
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
      latestTransactionMonthKey: await getLatestTransactionMonthKeySafely(),
    };
  } catch (error) {
    return {
      statementImport: null,
      latestTransactionMonthKey: null,
      errorMessage: getUploadErrorMessage(error),
    };
  }
};
