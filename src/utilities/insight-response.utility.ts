import {
  INSIGHT_TYPES,
  INSIGHT_STATUSES,
} from "../constants/insight.constants";

import { isRecord } from "./free-text-response.utility";
import type { IBatchResult } from "../interfaces/batch.interface";
import type { IInsightRecord } from "../interfaces/insight.interface";

const INSIGHT_TYPE_VALUES: readonly string[] = Object.values(INSIGHT_TYPES);
const INSIGHT_STATUS_VALUES: readonly string[] =
  Object.values(INSIGHT_STATUSES);

const hasValidMetadata = (value: Record<string, unknown>): boolean =>
  !("metadata" in value) || isRecord(value.metadata);

const hasValidEstimatedSavings = (value: Record<string, unknown>): boolean => {
  if (!("estimatedMonthlySavings" in value)) {
    return true;
  }

  return (
    value.estimatedMonthlySavings === null ||
    typeof value.estimatedMonthlySavings === "string"
  );
};

const isInsightRecord = (value: unknown): value is IInsightRecord => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.body === "string" &&
    typeof value.createdAt === "string" &&
    hasValidMetadata(value) &&
    hasValidEstimatedSavings(value) &&
    INSIGHT_TYPE_VALUES.includes(String(value.type)) &&
    INSIGHT_STATUS_VALUES.includes(String(value.status))
  );
};

const isInsightBatch = (
  value: unknown,
): value is IBatchResult<IInsightRecord> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.items)) {
    return false;
  }

  return value.items.every(isInsightRecord);
};

export const toInsightBatch = (data: unknown): IBatchResult<IInsightRecord> => {
  if (!isInsightBatch(data)) {
    throw new Error("Invalid insights response structure");
  }

  return data;
};
