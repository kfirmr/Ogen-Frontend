import type {
  ITransaction,
  IGetTransactionsRequest,
} from "../interfaces/transaction.interface";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";
import { toTransactionBatch } from "../utilities/transaction-response.utility";

const TRANSACTION_ENDPOINTS = {
  SEARCH: "/transaction/search",
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
}

export const transactionService = new TransactionService();
