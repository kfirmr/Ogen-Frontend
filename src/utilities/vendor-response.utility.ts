import { isRecord } from "./free-text-response.utility";
import { VENDOR_CATEGORIES } from "../constants/vendor.constants";
import type { IVendorSummary } from "../interfaces/vendor.interface";

const VENDOR_CATEGORY_VALUES: readonly string[] =
  Object.values(VENDOR_CATEGORIES);

const isVendorCategory = (value: unknown): boolean => {
  if (value == null) {
    return true;
  }

  return typeof value === "string" && VENDOR_CATEGORY_VALUES.includes(value);
};

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
