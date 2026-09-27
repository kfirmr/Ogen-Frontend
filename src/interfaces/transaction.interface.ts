import type { IBatchCursor } from "./batch.interface";
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
  importId?: string;
  batchSize?: number;
  batchCursor?: IBatchCursor | null;
}

export interface ICategoryTotal {
  amount: string;
  category: string | null;
}

export interface ITransactionSummary {
  categories: ICategoryTotal[];
  nonSubscriptionAmount: string;
}

export interface IGetTransactionSummaryRequest {
  toDate: string;
  fromDate: string;
}
