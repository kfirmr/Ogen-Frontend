import type { IBatchCursor, IBatchResult } from "../interfaces/batch.interface";

import {
  TRANSACTIONS_QUERY_KEY,
  MONTH_TRANSACTIONS_REQUEST,
} from "../constants/transaction.constants";

import { useEffect } from "react";
import { useAccessToken } from "../store/auth.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMonthDateRange } from "../utilities/date.utility";
import { transactionService } from "../services/transaction.service";
import type { ITransaction } from "../interfaces/transaction.interface";

const EMPTY_TRANSACTIONS: ITransaction[] = [];

const FIRST_PAGE_CURSOR: IBatchCursor | null = null;

// Pages are followed until the server reports none are left, so the month's list is never cut off.
export const useTransactions = (monthKey: string): ITransaction[] => {
  const accessToken = useAccessToken();
  const { fromDate, toDate } = getMonthDateRange(monthKey);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      enabled: accessToken !== null,
      initialPageParam: FIRST_PAGE_CURSOR,
      queryKey: [...TRANSACTIONS_QUERY_KEY, monthKey],
      getNextPageParam: (lastPage: IBatchResult<ITransaction>) =>
        lastPage.nextCursor,
      queryFn: ({ pageParam }) =>
        transactionService.getByUser({
          ...MONTH_TRANSACTIONS_REQUEST,
          toDate,
          fromDate,
          batchCursor: pageParam,
        }),
    });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    // fetchNextPage never rejects; a failed page lands in the query's error state instead.
    void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return data?.pages.flatMap((page) => page.items) ?? EMPTY_TRANSACTIONS;
};
