import { isRecord } from "./free-text-response.utility";
import type { IVendorSummary } from "../interfaces/vendor.interface";
import { CANCELLATION_METHODS } from "../constants/subscription-cancellation.constants";

const isVendorCategory = (value: unknown): boolean =>
  value == null || typeof value === "string";

const CANCELLATION_METHOD_VALUES: readonly string[] =
  Object.values(CANCELLATION_METHODS);

const CANCELLATION_TEXT_KEYS = [
  "cancellationUrl",
  "cancellationEmail",
  "cancellationPhone",
] as const;

const isOptionalNullableText = (
  value: Record<string, unknown>,
  key: string,
): boolean =>
  !(key in value) || value[key] === null || typeof value[key] === "string";

const hasValidCancellationMethod = (value: Record<string, unknown>): boolean =>
  !("cancellationMethod" in value) ||
  value.cancellationMethod === null ||
  CANCELLATION_METHOD_VALUES.includes(String(value.cancellationMethod));

const hasValidCancellationContact = (value: Record<string, unknown>): boolean =>
  hasValidCancellationMethod(value) &&
  CANCELLATION_TEXT_KEYS.every((key) => isOptionalNullableText(value, key));

export const isVendorSummary = (value: unknown): value is IVendorSummary => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isVendorCategory(value.category) &&
    hasValidCancellationContact(value)
  );
};
