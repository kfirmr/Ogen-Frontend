import { statementImportService } from "../services/statement-import.service";
import type { IStatementImport } from "../interfaces/statement-import.interface";
import { getUploadErrorMessage } from "../utilities/statement-import-error.utility";

export interface IUploadStatementActionResult {
  errorMessage: string | null;
  statementImport: IStatementImport | null;
}

export const uploadStatementAction = async (
  file: File,
): Promise<IUploadStatementActionResult> => {
  try {
    const statementImport = await statementImportService.upload(file);

    return { statementImport, errorMessage: null };
  } catch (error) {
    return {
      statementImport: null,
      errorMessage: getUploadErrorMessage(error),
    };
  }
};
