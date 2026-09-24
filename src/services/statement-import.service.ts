import { apiClient } from "./api-client";
import type { IStatementImport } from "../interfaces/statement-import.interface";

const STATEMENT_IMPORT_ENDPOINTS = {
  BASE: "/statement-import",
  UPLOAD: "/statement-import/upload",
} as const;

class StatementImportService {
  async upload(file: File): Promise<IStatementImport> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post<IStatementImport>(
      STATEMENT_IMPORT_ENDPOINTS.UPLOAD,
      formData,
    );

    return response.data;
  }

  async getById(id: string): Promise<IStatementImport> {
    const response = await apiClient.get<IStatementImport>(
      `${STATEMENT_IMPORT_ENDPOINTS.BASE}/${id}`,
    );

    return response.data;
  }
}

export const statementImportService = new StatementImportService();
