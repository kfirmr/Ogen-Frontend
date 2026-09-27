import type {
  ITransaction,
  ICategoryTotal,
  ITransactionSummary,
  ISubscriptionCharge,
} from "../interfaces/transaction.interface";

import { isRecord } from "./free-text-response.utility";
import { isVendorSummary } from "./vendor-response.utility";
import { isSubscription } from "./subscription-response.utility";
import type { IBatchCursor, IBatchResult } from "../interfaces/batch.interface";

const isTransaction = (value: unknown): value is ITransaction => {
  if (!isRecord(value)) {
    return false;
  }

  const hasIdentity =
    typeof value.id === "string" &&
    typeof value.originalDescription === "string";
  const hasMoneyShape =
    typeof value.amount === "string" && typeof value.currency === "string";
  const hasDate = typeof value.transactionDate === "string";
  const hasValidSubscriptionId =
    value.subscriptionId == null || typeof value.subscriptionId === "string";

  return (
    hasIdentity &&
    hasMoneyShape &&
    hasDate &&
    hasValidSubscriptionId &&
    (value.vendor == null || isVendorSummary(value.vendor))
  );
};

const isBatchCursor = (value: unknown): value is IBatchCursor => {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.id === "string" && typeof value.createdAt === "string";
};

const isTransactionBatch = (
  value: unknown,
): value is IBatchResult<ITransaction> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.items)) {
    return false;
  }

  const hasValidCursor =
    value.nextCursor === null || isBatchCursor(value.nextCursor);

  return hasValidCursor && value.items.every(isTransaction);
};

export const toTransactionBatch = (
  data: unknown,
): IBatchResult<ITransaction> => {
  if (!isTransactionBatch(data)) {
    throw new Error("Invalid transactions response structure");
  }

  return data;
};

const isCategoryTotal = (value: unknown): value is ICategoryTotal => {
  if (!isRecord(value)) {
    return false;
  }

  const hasAmount = typeof value.amount === "string";
  const hasValidCategory =
    value.category === null || typeof value.category === "string";

  return hasAmount && hasValidCategory;
};

const isSubscriptionCharge = (value: unknown): value is ISubscriptionCharge => {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.amount === "string" && isSubscription(value.subscription);
};

const isTransactionSummary = (value: unknown): value is ITransactionSummary => {
  if (!isRecord(value)) {
    return false;
  }

  const hasCategories =
    Array.isArray(value.categories) && value.categories.every(isCategoryTotal);

  const hasSubscriptionCharges =
    Array.isArray(value.subscriptionCharges) &&
    value.subscriptionCharges.every(isSubscriptionCharge);
  const hasNonSubscriptionAmount =
    typeof value.nonSubscriptionAmount === "string";

  return hasCategories && hasSubscriptionCharges && hasNonSubscriptionAmount;
};

export const toTransactionSummary = (data: unknown): ITransactionSummary => {
  if (!isTransactionSummary(data)) {
    throw new Error("Invalid transaction summary response structure");
  }

  return data;
};
