import telecomIcon from "../assets/icons/telecom_media.png";
import subscriptionsIcon from "../assets/icons/subscriptions.png";
import healthFitnessIcon from "../assets/icons/health_fitness.png";
import housingUtilitiesIcon from "../assets/icons/housing_utilities.png";

export const VENDOR_CATEGORIES = {
  OTHER: "OTHER",
  FITNESS: "FITNESS",
  SOFTWARE: "SOFTWARE",
  INSURANCE: "INSURANCE",
  STREAMING: "STREAMING",
  UTILITIES: "UTILITIES",
  COMMUNICATION: "COMMUNICATION",
} as const;

export type TVendorCategoryType =
  (typeof VENDOR_CATEGORIES)[keyof typeof VENDOR_CATEGORIES];

export const FALLBACK_VENDOR_CATEGORY = VENDOR_CATEGORIES.OTHER;

export const VENDOR_CATEGORY_ICONS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: subscriptionsIcon,
  [VENDOR_CATEGORIES.FITNESS]: healthFitnessIcon,
  [VENDOR_CATEGORIES.SOFTWARE]: subscriptionsIcon,
  [VENDOR_CATEGORIES.INSURANCE]: subscriptionsIcon,
  [VENDOR_CATEGORIES.STREAMING]: subscriptionsIcon,
  [VENDOR_CATEGORIES.UTILITIES]: housingUtilitiesIcon,
  [VENDOR_CATEGORIES.COMMUNICATION]: telecomIcon,
};

export const VENDOR_CATEGORY_LABELS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: "אחר",
  [VENDOR_CATEGORIES.SOFTWARE]: "תוכנה",
  [VENDOR_CATEGORIES.INSURANCE]: "ביטוח",
  [VENDOR_CATEGORIES.UTILITIES]: "דיור",
  [VENDOR_CATEGORIES.FITNESS]: "בריאות",
  [VENDOR_CATEGORIES.COMMUNICATION]: "תקשורת",
  [VENDOR_CATEGORIES.STREAMING]: "סטרימינג",
};
