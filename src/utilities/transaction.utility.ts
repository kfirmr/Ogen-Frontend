import {
  VENDOR_CATEGORY_ICONS,
  VENDOR_CATEGORY_LABELS,
  FALLBACK_VENDOR_CATEGORY,
} from "../constants/vendor.constants";

import type {
  IExpenseSegment,
  ICategoryExpense,
} from "../interfaces/expense.interface";

import {
  TRANSACTION_LABELS,
  CATEGORY_EXPENSE_COLORS,
  RECENT_TRANSACTIONS_COUNT,
  TOP_EXPENSE_CATEGORIES_COUNT,
  NON_SUBSCRIPTION_SEGMENT_COLOR,
} from "../constants/transaction.constants";

import type {
  ITransaction,
  ITransactionView,
} from "../interfaces/transaction.interface";

import { formatExpense } from "./money.utility";
import { DATE_FORMAT } from "../constants/date.constants";
import { formatDate, getDaysAgo, normalizeDate } from "./date.utility";
import type { TVendorCategoryType } from "../constants/vendor.constants";

const DAY_LABELS: Record<number, string> = {
  0: TRANSACTION_LABELS.TODAY,
  1: TRANSACTION_LABELS.YESTERDAY,
};

const getTransactionCategory = (
  transaction: ITransaction,
): TVendorCategoryType =>
  transaction.vendor?.category ?? FALLBACK_VENDOR_CATEGORY;

const getTransactionName = (transaction: ITransaction): string =>
  transaction.originalDescription;

const getTransactionTime = (transaction: ITransaction): string => {
  const dayLabel = DAY_LABELS[getDaysAgo(transaction.transactionDate)];

  if (dayLabel != null) {
    return dayLabel;
  }

  return formatDate(
    normalizeDate(transaction.transactionDate),
    DATE_FORMAT.DATE_DOTS,
  );
};

const getTransactionAmount = (transaction: ITransaction): string =>
  formatExpense({
    amount: transaction.amount,
    currency: transaction.currency,
  }) ?? TRANSACTION_LABELS.UNKNOWN_AMOUNT;

const getTransactionValue = (transaction: ITransaction): number => {
  const amount = Number.parseFloat(transaction.amount);

  if (Number.isNaN(amount)) {
    return 0;
  }

  return amount;
};

const sumByCategory = (
  transactions: ITransaction[],
): Map<TVendorCategoryType, number> =>
  transactions.reduce((totals, transaction) => {
    const category = getTransactionCategory(transaction);
    const total = totals.get(category) ?? 0;

    return totals.set(category, total + getTransactionValue(transaction));
  }, new Map<TVendorCategoryType, number>());

const byDescendingDate = (first: ITransaction, second: ITransaction): number =>
  second.transactionDate.localeCompare(first.transactionDate);

export const toCategoryExpenses = (
  transactions: ITransaction[],
): ICategoryExpense[] =>
  [...sumByCategory(transactions).entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, TOP_EXPENSE_CATEGORIES_COUNT)
    .map(([category, value], index) => ({
      value: Math.round(value),
      icon: VENDOR_CATEGORY_ICONS[category],
      label: VENDOR_CATEGORY_LABELS[category],
      color: CATEGORY_EXPENSE_COLORS[index % CATEGORY_EXPENSE_COLORS.length],
    }));

const toTransactionView = (transaction: ITransaction): ITransactionView => ({
  id: transaction.id,
  name: getTransactionName(transaction),
  time: getTransactionTime(transaction),
  amount: getTransactionAmount(transaction),
  icon: VENDOR_CATEGORY_ICONS[getTransactionCategory(transaction)],
});

export const toTransactionViews = (
  transactions: ITransaction[],
): ITransactionView[] =>
  [...transactions].sort(byDescendingDate).map(toTransactionView);

export const toRecentTransactionViews = (
  transactions: ITransaction[],
): ITransactionView[] =>
  toTransactionViews(transactions).slice(0, RECENT_TRANSACTIONS_COUNT);

const isNonSubscriptionTransaction = (transaction: ITransaction): boolean =>
  transaction.subscriptionId == null;

export const getNonSubscriptionExpensesTotal = (
  transactions: ITransaction[],
): number =>
  Math.round(
    transactions
      .filter(isNonSubscriptionTransaction)
      .reduce((sum, transaction) => sum + getTransactionValue(transaction), 0),
  );

export const toNonSubscriptionSegment = (
  transactions: ITransaction[],
): IExpenseSegment | null => {
  const value = getNonSubscriptionExpensesTotal(transactions);

  if (value <= 0) {
    return null;
  }

  return {
    value,
    color: NON_SUBSCRIPTION_SEGMENT_COLOR,
    label: TRANSACTION_LABELS.NON_SUBSCRIPTION_EXPENSES,
  };
};

const byLatestDate = (
  latest: ITransaction,
  transaction: ITransaction,
): ITransaction =>
  transaction.transactionDate > latest.transactionDate ? transaction : latest;

// Lets the upload flow jump the month picker to wherever the just-imported data actually landed,
// since a statement's transactions are rarely dated in the current calendar month.
export const getLatestTransactionMonthKey = (
  transactions: ITransaction[],
): string | null => {
  if (transactions.length === 0) {
    return null;
  }

  const [firstTransaction, ...restTransactions] = transactions;
  const latestTransaction = restTransactions.reduce(
    byLatestDate,
    firstTransaction,
  );

  return formatDate(
    normalizeDate(latestTransaction.transactionDate),
    DATE_FORMAT.MONTHS_YEAR,
  );
};
