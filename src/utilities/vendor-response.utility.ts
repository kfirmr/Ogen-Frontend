import { isRecord } from "./free-text-response.utility";
import type { IVendorSummary } from "../interfaces/vendor.interface";

const isVendorCategory = (value: unknown): boolean =>
  value == null || typeof value === "string";

export const isVendorSummary = (value: unknown): value is IVendorSummary => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isVendorCategory(value.category)
  );
};
