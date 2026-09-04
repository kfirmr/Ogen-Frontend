import groceriesIcon from "../assets/icons/groceries.png";
import telecomIcon from "../assets/icons/telecom_media.png";
import subscriptionsIcon from "../assets/icons/subscriptions.png";
import diningTakeoutIcon from "../assets/icons/dining_takeout.png";
import healthFitnessIcon from "../assets/icons/health_fitness.png";
import transportationIcon from "../assets/icons/transportation.png";
import housingUtilitiesIcon from "../assets/icons/housing_utilities.png";

export const VENDOR_CATEGORIES = {
  OTHER: "OTHER",
  DINING: "DINING",
  FITNESS: "FITNESS",
  SOFTWARE: "SOFTWARE",
  INSURANCE: "INSURANCE",
  STREAMING: "STREAMING",
  UTILITIES: "UTILITIES",
  GROCERIES: "GROCERIES",
  COMMUNICATION: "COMMUNICATION",
  TRANSPORTATION: "TRANSPORTATION",
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
  [VENDOR_CATEGORIES.GROCERIES]: groceriesIcon,
  [VENDOR_CATEGORIES.DINING]: diningTakeoutIcon,
  [VENDOR_CATEGORIES.COMMUNICATION]: telecomIcon,
  [VENDOR_CATEGORIES.TRANSPORTATION]: transportationIcon,
};

export const VENDOR_CATEGORY_LABELS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: "אחר",
  [VENDOR_CATEGORIES.SOFTWARE]: "תוכנה",
  [VENDOR_CATEGORIES.INSURANCE]: "ביטוח",
  [VENDOR_CATEGORIES.UTILITIES]: "דיור",
  [VENDOR_CATEGORIES.FITNESS]: "בריאות",
  [VENDOR_CATEGORIES.GROCERIES]: "סופרמרקט",
  [VENDOR_CATEGORIES.DINING]: "מסעדות",
  [VENDOR_CATEGORIES.COMMUNICATION]: "תקשורת",
  [VENDOR_CATEGORIES.STREAMING]: "סטרימינג",
  [VENDOR_CATEGORIES.TRANSPORTATION]: "תחבורה",
};
