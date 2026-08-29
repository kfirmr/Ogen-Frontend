import {
  TRANSACTIONS_QUERY_KEY,
  RECENT_TRANSACTIONS_REQUEST,
} from "../constants/transaction.constants";

import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { transactionService } from "../services/transaction.service";
import type { ITransaction } from "../interfaces/transaction.interface";

const EMPTY_TRANSACTIONS: ITransaction[] = [];

export const useTransactions = (): ITransaction[] => {
  const accessToken = useAccessToken();

  const { data } = useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    enabled: accessToken !== null,
    queryFn: () => transactionService.getByUser(RECENT_TRANSACTIONS_REQUEST),
  });

  return data?.items ?? EMPTY_TRANSACTIONS;
};
