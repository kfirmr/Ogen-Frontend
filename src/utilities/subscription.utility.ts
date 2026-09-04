import {
  VENDOR_CATEGORY_ICONS,
  FALLBACK_VENDOR_CATEGORY,
} from "../constants/vendor.constants";

import {
  SUBSCRIPTION_LABELS,
  BILLING_CYCLE_LABELS,
  MONTHLY_AMOUNT_FACTORS,
  SUBSCRIPTION_SEGMENT_COLORS,
} from "../constants/subscription.constants";

import type {
  ISubscription,
  ISubscriptionView,
} from "../interfaces/subscription.interface";

import { formatMoney } from "./money.utility";
import { DEFAULT_CURRENCY } from "../constants/money.constants";
import type { IExpenseSegment } from "../interfaces/expense.interface";
import type { ITransaction } from "../interfaces/transaction.interface";
import { getNonSubscriptionExpensesTotal } from "./transaction.utility";

const getSubscriptionName = (subscription: ISubscription): string => {
  if (subscription.vendor == null) {
    return SUBSCRIPTION_LABELS.UNKNOWN_VENDOR;
  }

  return subscription.vendor.name;
};

const getSubscriptionIcon = (subscription: ISubscription): string =>
  VENDOR_CATEGORY_ICONS[
    subscription.vendor?.category ?? FALLBACK_VENDOR_CATEGORY
  ];

const getSubscriptionPrice = (subscription: ISubscription): string => {
  const formattedAmount = formatMoney({
    amount: subscription.amount,
    currency: subscription.currency,
  });

  if (formattedAmount === null) {
    return SUBSCRIPTION_LABELS.UNKNOWN_PRICE;
  }

  return `${formattedAmount} / ${BILLING_CYCLE_LABELS[subscription.billingCycle]}`;
};

const getMonthlyAmount = (subscription: ISubscription): number => {
  const amount = Number.parseFloat(subscription.amount);

  if (Number.isNaN(amount)) {
    return 0;
  }

  return Math.round(amount * MONTHLY_AMOUNT_FACTORS[subscription.billingCycle]);
};

const getSegmentColor = (index: number): string =>
  SUBSCRIPTION_SEGMENT_COLORS[index % SUBSCRIPTION_SEGMENT_COLORS.length];

const getSubscriptionsMonthlySum = (subscriptions: ISubscription[]): number =>
  subscriptions.reduce(
    (sum, subscription) => sum + getMonthlyAmount(subscription),
    0,
  );

export const toSubscriptionViews = (
  subscriptions: ISubscription[],
): ISubscriptionView[] =>
  subscriptions.map((subscription) => ({
    id: subscription.id,
    icon: getSubscriptionIcon(subscription),
    name: getSubscriptionName(subscription),
    price: getSubscriptionPrice(subscription),
  }));

export const toSubscriptionSegments = (
  subscriptions: ISubscription[],
): IExpenseSegment[] =>
  subscriptions.map((subscription, index) => ({
    color: getSegmentColor(index),
    value: getMonthlyAmount(subscription),
    label: getSubscriptionName(subscription),
  }));

export const getSubscriptionsTotal = (
  subscriptions: ISubscription[],
): string => {
  const total = getSubscriptionsMonthlySum(subscriptions);
  const currency = subscriptions[0]?.currency ?? DEFAULT_CURRENCY;

  return (
    formatMoney({ currency, amount: String(total) }) ??
    SUBSCRIPTION_LABELS.UNKNOWN_PRICE
  );
};

export const getTotalExpenses = (
  subscriptions: ISubscription[],
  transactions: ITransaction[],
): string => {
  const total =
    getSubscriptionsMonthlySum(subscriptions) +
    getNonSubscriptionExpensesTotal(transactions);
  const currency =
    subscriptions[0]?.currency ?? transactions[0]?.currency ?? DEFAULT_CURRENCY;

  return (
    formatMoney({ currency, amount: String(total) }) ??
    SUBSCRIPTION_LABELS.UNKNOWN_PRICE
  );
};

export const getSubscriptionsSavingsBadge = (
  subscriptions: ISubscription[],
): string =>
  `${SUBSCRIPTION_LABELS.SAVINGS_BADGE_PREFIX} ${getSubscriptionsTotal(subscriptions)} ${SUBSCRIPTION_LABELS.SAVINGS_BADGE_SUFFIX}`;

export const getSubscriptionsSubtitle = (count: number): string =>
  `${count} מנויים פעילים`;
