export interface IStatementImport {
  id: string;
  status: string;
  filename: string | null;
  transactionCount: number;
  errorMessage: string | null;
}
