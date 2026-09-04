import { isRecord } from "./free-text-response.utility";
import { isVendorSummary } from "./vendor-response.utility";
import type { IBatchResult } from "../interfaces/batch.interface";
import type { ITransaction } from "../interfaces/transaction.interface";

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

const isTransactionBatch = (
  value: unknown,
): value is IBatchResult<ITransaction> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.items)) {
    return false;
  }

  return value.items.every(isTransaction);
};

export const toTransactionBatch = (
  data: unknown,
): IBatchResult<ITransaction> => {
  if (!isTransactionBatch(data)) {
    throw new Error("Invalid transactions response structure");
  }

  return data;
};
