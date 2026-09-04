import type { IVendorSummary } from "./vendor.interface";

export interface ITransaction {
  id: string;
  amount: string;
  currency: string;
  transactionDate: string;
  originalDescription: string;
  subscriptionId: string | null;
  vendor: IVendorSummary | null;
}

export interface ITransactionView {
  id: string;
  icon: string;
  name: string;
  time: string;
  amount: string;
}

export interface IGetTransactionsRequest {
  toDate?: string;
  fromDate?: string;
  batchSize?: number;
}
