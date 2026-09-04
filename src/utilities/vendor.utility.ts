import {
  VENDOR_CATEGORIES,
  VENDOR_CATEGORY_ICONS,
  VENDOR_CATEGORY_LABELS,
  FALLBACK_VENDOR_CATEGORY,
} from "../constants/vendor.constants";

import type { TVendorCategoryType } from "../constants/vendor.constants";

const VENDOR_CATEGORY_VALUES = Object.values(VENDOR_CATEGORIES) as string[];

// Guards against categories the backend added after this client was last deployed.
const isKnownVendorCategory = (
  category: string,
): category is TVendorCategoryType => VENDOR_CATEGORY_VALUES.includes(category);

export const getVendorCategoryIcon = (category: string | null): string =>
  category != null && isKnownVendorCategory(category)
    ? VENDOR_CATEGORY_ICONS[category]
    : VENDOR_CATEGORY_ICONS[FALLBACK_VENDOR_CATEGORY];

export const getVendorCategoryLabel = (category: string | null): string =>
  category != null && isKnownVendorCategory(category)
    ? VENDOR_CATEGORY_LABELS[category]
    : VENDOR_CATEGORY_LABELS[FALLBACK_VENDOR_CATEGORY];
