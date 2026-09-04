import {
  TRANSACTIONS_QUERY_KEY,
  RECENT_TRANSACTIONS_REQUEST,
} from "../constants/transaction.constants";

import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { getMonthDateRange } from "../utilities/date.utility";
import { transactionService } from "../services/transaction.service";
import type { ITransaction } from "../interfaces/transaction.interface";

const EMPTY_TRANSACTIONS: ITransaction[] = [];

export const useTransactions = (monthKey: string): ITransaction[] => {
  const accessToken = useAccessToken();
  const { fromDate, toDate } = getMonthDateRange(monthKey);

  const { data } = useQuery({
    enabled: accessToken !== null,
    queryKey: [...TRANSACTIONS_QUERY_KEY, monthKey],
    queryFn: () =>
      transactionService.getByUser({
        ...RECENT_TRANSACTIONS_REQUEST,
        fromDate,
        toDate,
      }),
  });

  return data?.items ?? EMPTY_TRANSACTIONS;
};
