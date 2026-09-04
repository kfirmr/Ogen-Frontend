import miscIcon from "../assets/icons/misc.png";
import groceriesIcon from "../assets/icons/groceries.png";
import electronicsIcon from "../assets/icons/electronics.png";
import diningTakeoutIcon from "../assets/icons/dining_takeout.png";
import leisureSportsIcon from "../assets/icons/leisure_sports.png";
import transportationIcon from "../assets/icons/transportation.png";
import electricityGasIcon from "../assets/icons/electricity_gas.png";

export const VENDOR_CATEGORIES = {
  OTHER: "OTHER",
  DINING: "DINING",
  FITNESS: "FITNESS",
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
  [VENDOR_CATEGORIES.OTHER]: miscIcon,
  [VENDOR_CATEGORIES.DINING]: diningTakeoutIcon,
  [VENDOR_CATEGORIES.FITNESS]: leisureSportsIcon,
  [VENDOR_CATEGORIES.STREAMING]: electronicsIcon,
  [VENDOR_CATEGORIES.UTILITIES]: electricityGasIcon,
  [VENDOR_CATEGORIES.GROCERIES]: groceriesIcon,
  [VENDOR_CATEGORIES.COMMUNICATION]: electronicsIcon,
  [VENDOR_CATEGORIES.TRANSPORTATION]: transportationIcon,
};

export const VENDOR_CATEGORY_LABELS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: "אחר",
  [VENDOR_CATEGORIES.DINING]: "מסעדות",
  [VENDOR_CATEGORIES.FITNESS]: "פנאי",
  [VENDOR_CATEGORIES.STREAMING]: "סטרימינג",
  [VENDOR_CATEGORIES.UTILITIES]: "דיור",
  [VENDOR_CATEGORIES.GROCERIES]: "סופרמרקט",
  [VENDOR_CATEGORIES.COMMUNICATION]: "תקשורת",
  [VENDOR_CATEGORIES.TRANSPORTATION]: "תחבורה",
};
