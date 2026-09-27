import type {
  ITransaction,
  ITransactionSummary,
  IGetTransactionsRequest,
  IGetTransactionSummaryRequest,
} from "../interfaces/transaction.interface";

import {
  toTransactionBatch,
  toTransactionSummary,
} from "../utilities/transaction-response.utility";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";

const TRANSACTION_ENDPOINTS = {
  SEARCH: "/transaction/search",
  SUMMARY: "/transaction/summary",
} as const;

class TransactionService {
  async getByUser(
    request: IGetTransactionsRequest,
  ): Promise<IBatchResult<ITransaction>> {
    const response = await apiClient.post<unknown>(
      TRANSACTION_ENDPOINTS.SEARCH,
      request,
    );

    return toTransactionBatch(response.data);
  }

  async getSummary(
    request: IGetTransactionSummaryRequest,
  ): Promise<ITransactionSummary> {
    const response = await apiClient.post<unknown>(
      TRANSACTION_ENDPOINTS.SUMMARY,
      request,
    );

    return toTransactionSummary(response.data);
  }
}

export const transactionService = new TransactionService();
