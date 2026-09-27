import {
  MONTHS_PER_YEAR,
  SUBSCRIPTION_LABELS,
  BILLING_CYCLE_LABELS,
  MONTHLY_AMOUNT_FACTORS,
  SUBSCRIPTION_SEGMENT_COLORS,
} from "../constants/subscription.constants";

import type {
  ISubscription,
  ISubscriptionView,
} from "../interfaces/subscription.interface";

import { getVendorCategoryIcon } from "./vendor.utility";
import { formatMoney, parseAmount } from "./money.utility";
import { DEFAULT_CURRENCY } from "../constants/money.constants";
import type { IExpenseSegment } from "../interfaces/expense.interface";
import type { ISubscriptionCharge } from "../interfaces/transaction.interface";

const getSubscriptionName = (subscription: ISubscription): string => {
  if (subscription.vendor == null) {
    return SUBSCRIPTION_LABELS.UNKNOWN_VENDOR;
  }

  return subscription.vendor.name;
};

const getSubscriptionIcon = (subscription: ISubscription): string =>
  getVendorCategoryIcon(subscription.vendor?.category ?? null);

const formatSubscriptionPrice = (
  subscription: ISubscription,
  amount: string,
): string => {
  const formattedAmount = formatMoney({
    amount,
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

export const toSubscriptionView = (
  subscription: ISubscription,
): ISubscriptionView => ({
  id: subscription.id,
  icon: getSubscriptionIcon(subscription),
  name: getSubscriptionName(subscription),
  price: formatSubscriptionPrice(subscription, subscription.amount),
});

const toSubscriptionChargeView = (
  charge: ISubscriptionCharge,
): ISubscriptionView => ({
  ...toSubscriptionView(charge.subscription),
  price: formatSubscriptionPrice(charge.subscription, charge.amount),
});

export const toSubscriptionChargeViews = (
  charges: ISubscriptionCharge[],
): ISubscriptionView[] => charges.map(toSubscriptionChargeView);

export const getSubscriptionYearlyCostLabel = (
  subscription: ISubscription,
): string => {
  const yearlyAmount = getMonthlyAmount(subscription) * MONTHS_PER_YEAR;
  const formattedAmount = formatMoney({
    amount: String(yearlyAmount),
    currency: subscription.currency,
  });

  if (formattedAmount === null) {
    return SUBSCRIPTION_LABELS.UNKNOWN_PRICE;
  }

  return `${formattedAmount} ${SUBSCRIPTION_LABELS.PER_YEAR}`;
};

export const toSubscriptionChargeSegments = (
  charges: ISubscriptionCharge[],
): IExpenseSegment[] =>
  charges.map((charge, index) => ({
    color: getSegmentColor(index),
    value: Math.round(parseAmount(charge.amount)),
    label: getSubscriptionName(charge.subscription),
  }));

export const sumChargeAmounts = (charges: ISubscriptionCharge[]): number =>
  charges.reduce((sum, charge) => sum + parseAmount(charge.amount), 0);

const getSubscriptionChargesTotal = (
  charges: ISubscriptionCharge[],
): string => {
  const total = Math.round(sumChargeAmounts(charges));
  const currency = charges[0]?.subscription.currency ?? DEFAULT_CURRENCY;

  return (
    formatMoney({ currency, amount: String(total) }) ??
    SUBSCRIPTION_LABELS.UNKNOWN_PRICE
  );
};

// What cancelling the subscriptions charged this month would save, matching the month on screen.
export const getSubscriptionsSavingsBadge = (
  charges: ISubscriptionCharge[],
): string =>
  `${SUBSCRIPTION_LABELS.SAVINGS_BADGE_PREFIX} ${getSubscriptionChargesTotal(charges)} ${SUBSCRIPTION_LABELS.SAVINGS_BADGE_SUFFIX}`;

export const getSubscriptionsSubtitle = (count: number): string =>
  `${count} מנויים פעילים`;
