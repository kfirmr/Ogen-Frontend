import { isRecord } from "./free-text-response.utility";
import type { IBatchResult } from "../interfaces/batch.interface";
import { DRAFT_ACTION_STATUSES } from "../constants/draft-action.constants";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const DRAFT_ACTION_STATUS_VALUES: readonly string[] = Object.values(
  DRAFT_ACTION_STATUSES,
);

const isNullableString = (value: unknown): boolean =>
  value === null || typeof value === "string";

const isDraftActionRecord = (value: unknown): value is IDraftActionRecord => {
  if (!isRecord(value)) {
    return false;
  }

  const hasRequiredText =
    typeof value.id === "string" &&
    typeof value.body === "string" &&
    typeof value.subject === "string" &&
    typeof value.insightId === "string" &&
    typeof value.createdAt === "string";
  const hasNullableText =
    isNullableString(value.reasoning) &&
    isNullableString(value.targetEmail) &&
    isNullableString(value.subscriptionId);
  const hasKnownStatus = DRAFT_ACTION_STATUS_VALUES.includes(
    String(value.status),
  );

  return hasRequiredText && hasNullableText && hasKnownStatus;
};

const isDraftActionBatch = (
  value: unknown,
): value is IBatchResult<IDraftActionRecord> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.items)) {
    return false;
  }

  return value.items.every(isDraftActionRecord);
};

export const toDraftActionBatch = (
  data: unknown,
): IBatchResult<IDraftActionRecord> => {
  if (!isDraftActionBatch(data)) {
    throw new Error("Invalid draft actions response structure");
  }

  return data;
};
