import type {
  TImportSourceType,
  TImportStatusType,
} from "../constants/statement-import.constants";

export interface IStatementImport {
  id: string;
  createdAt: string;
  filename: string | null;
  transactionCount: number;
  source: TImportSourceType;
  status: TImportStatusType;
  completedAt: string | null;
  errorMessage: string | null;
}
