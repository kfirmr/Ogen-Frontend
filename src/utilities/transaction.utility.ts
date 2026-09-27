import {
  getVendorCategoryIcon,
  getVendorCategoryLabel,
} from "./vendor.utility";

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
  ICategoryTotal,
  ITransactionView,
  ITransactionSummary,
  ISubscriptionCharge,
} from "../interfaces/transaction.interface";

import { DATE_FORMAT } from "../constants/date.constants";
import { DEFAULT_CURRENCY } from "../constants/money.constants";
import { formatDate, getDaysAgo, normalizeDate } from "./date.utility";
import { FALLBACK_VENDOR_CATEGORY } from "../constants/vendor.constants";
import { formatMoney, formatExpense, parseAmount } from "./money.utility";

const DAY_LABELS: Record<number, string> = {
  0: TRANSACTION_LABELS.TODAY,
  1: TRANSACTION_LABELS.YESTERDAY,
};

const getTransactionCategory = (transaction: ITransaction): string | null =>
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

// Uncategorized spend and OTHER share one slice, so the chart never shows two "other" rows.
const sumByCategory = (categoryTotals: ICategoryTotal[]): Map<string, number> =>
  categoryTotals.reduce((totals, categoryTotal) => {
    const category = categoryTotal.category ?? FALLBACK_VENDOR_CATEGORY;
    const total = totals.get(category) ?? 0;

    return totals.set(category, total + parseAmount(categoryTotal.amount));
  }, new Map<string, number>());

const byDescendingDate = (first: ITransaction, second: ITransaction): number =>
  second.transactionDate.localeCompare(first.transactionDate);

export const toCategoryExpenses = (
  summary: ITransactionSummary,
): ICategoryExpense[] =>
  [...sumByCategory(summary.categories).entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, TOP_EXPENSE_CATEGORIES_COUNT)
    .map(([category, value], index) => ({
      value: Math.round(value),
      icon: getVendorCategoryIcon(category),
      label: getVendorCategoryLabel(category),
      color: CATEGORY_EXPENSE_COLORS[index % CATEGORY_EXPENSE_COLORS.length],
    }));

const toTransactionView = (transaction: ITransaction): ITransactionView => ({
  id: transaction.id,
  name: getTransactionName(transaction),
  time: getTransactionTime(transaction),
  amount: getTransactionAmount(transaction),
  icon: getVendorCategoryIcon(getTransactionCategory(transaction)),
});

export const toTransactionViews = (
  transactions: ITransaction[],
): ITransactionView[] =>
  [...transactions].sort(byDescendingDate).map(toTransactionView);

export const toRecentTransactionViews = (
  transactions: ITransaction[],
): ITransactionView[] =>
  toTransactionViews(transactions).slice(0, RECENT_TRANSACTIONS_COUNT);

export const getNonSubscriptionExpensesTotal = (
  summary: ITransactionSummary,
): number => Math.round(parseAmount(summary.nonSubscriptionAmount));

export const toNonSubscriptionSegment = (
  summary: ITransactionSummary,
): IExpenseSegment | null => {
  const value = getNonSubscriptionExpensesTotal(summary);

  if (value <= 0) {
    return null;
  }

  return {
    value,
    color: NON_SUBSCRIPTION_SEGMENT_COLOR,
    label: TRANSACTION_LABELS.NON_SUBSCRIPTION_EXPENSES,
  };
};

const sumChargeAmounts = (charges: ISubscriptionCharge[]): number =>
  charges.reduce((sum, charge) => sum + parseAmount(charge.amount), 0);

const getSummaryCurrency = (summary: ITransactionSummary): string =>
  summary.subscriptionCharges[0]?.subscription.currency ?? DEFAULT_CURRENCY;

// Everything actually charged in the month: subscriptions at their real charge, plus the rest.
export const getTotalExpenses = (summary: ITransactionSummary): string => {
  const total =
    sumChargeAmounts(summary.subscriptionCharges) +
    parseAmount(summary.nonSubscriptionAmount);

  return (
    formatMoney({
      currency: getSummaryCurrency(summary),
      amount: String(Math.round(total)),
    }) ?? TRANSACTION_LABELS.UNKNOWN_AMOUNT
  );
};
