import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { getMonthDateRange } from "../utilities/date.utility";
import { transactionService } from "../services/transaction.service";
import type { ITransactionSummary } from "../interfaces/transaction.interface";
import { TRANSACTION_SUMMARY_QUERY_KEY } from "../constants/transaction.constants";

const EMPTY_SUMMARY: ITransactionSummary = {
  categories: [],
  subscriptionCharges: [],
  nonSubscriptionAmount: "0",
};

export const useTransactionSummary = (
  monthKey: string,
): ITransactionSummary => {
  const accessToken = useAccessToken();
  const { fromDate, toDate } = getMonthDateRange(monthKey);

  const { data } = useQuery({
    enabled: accessToken !== null,
    queryKey: [...TRANSACTION_SUMMARY_QUERY_KEY, monthKey],
    queryFn: () => transactionService.getSummary({ fromDate, toDate }),
  });

  return data ?? EMPTY_SUMMARY;
};
