import {
  BILLING_CYCLES,
  SUBSCRIPTION_STATUSES,
} from "../constants/subscription.constants";

import { isRecord } from "./free-text-response.utility";
import { isVendorSummary } from "./vendor-response.utility";
import type { IBatchResult } from "../interfaces/batch.interface";
import type { ISubscription } from "../interfaces/subscription.interface";

const BILLING_CYCLE_VALUES: readonly string[] = Object.values(BILLING_CYCLES);
const SUBSCRIPTION_STATUS_VALUES: readonly string[] = Object.values(
  SUBSCRIPTION_STATUSES,
);

const isNullableString = (value: unknown): boolean =>
  value == null || typeof value === "string";

const isNullableVendorSummary = (value: unknown): boolean => {
  if (value == null) {
    return true;
  }

  return isVendorSummary(value);
};

const isSubscription = (value: unknown): value is ISubscription => {
  if (!isRecord(value)) {
    return false;
  }

  const hasIdentity =
    typeof value.id === "string" && typeof value.amount === "string";
  const hasMoneyShape =
    typeof value.currency === "string" &&
    BILLING_CYCLE_VALUES.includes(String(value.billingCycle));
  const hasLifecycle =
    SUBSCRIPTION_STATUS_VALUES.includes(String(value.status)) &&
    isNullableString(value.nextChargeDate);

  return (
    hasIdentity &&
    hasMoneyShape &&
    hasLifecycle &&
    isNullableVendorSummary(value.vendor)
  );
};

const isSubscriptionBatch = (
  value: unknown,
): value is IBatchResult<ISubscription> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.items)) {
    return false;
  }

  return value.items.every(isSubscription);
};

export const toSubscriptionBatch = (
  data: unknown,
): IBatchResult<ISubscription> => {
  if (!isSubscriptionBatch(data)) {
    throw new Error("Invalid subscriptions response structure");
  }

  return data;
};
