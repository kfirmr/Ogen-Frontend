import fuelIcon from "../assets/icons/fuel.png";
import miscIcon from "../assets/icons/misc.png";
import petsIcon from "../assets/icons/pets.png";
import apparelIcon from "../assets/icons/apparel.png";
import cosmeticsIcon from "../assets/icons/cosmetics.png";
import groceriesIcon from "../assets/icons/groceries.png";
import insuranceIcon from "../assets/icons/insurance.png";
import governmentIcon from "../assets/icons/government.png";
import booksPrintIcon from "../assets/icons/books_print.png";
import coffeeBarsIcon from "../assets/icons/coffee_bars.png";
import homeDesignIcon from "../assets/icons/home_design.png";
import electronicsIcon from "../assets/icons/electronics.png";
import diningTakeoutIcon from "../assets/icons/dining_takeout.png";
import leisureSportsIcon from "../assets/icons/leisure_sports.png";
import moneyTransferIcon from "../assets/icons/money_transfer.png";
import transportationIcon from "../assets/icons/transportation.png";
import electricityGasIcon from "../assets/icons/electricity_gas.png";

export const VENDOR_CATEGORIES = {
  OTHER: "OTHER",
  DINING: "DINING",
  FITNESS: "FITNESS",
  APPAREL: "APPAREL",
  COSMETICS: "COSMETICS",
  STREAMING: "STREAMING",
  UTILITIES: "UTILITIES",
  GROCERIES: "GROCERIES",
  INSURANCE: "INSURANCE",
  GOVERNMENT: "GOVERNMENT",
  BOOKS_PRINT: "BOOKS_PRINT",
  COFFEE_BARS: "COFFEE_BARS",
  HOME_DESIGN: "HOME_DESIGN",
  FUEL: "FUEL",
  PETS: "PETS",
  COMMUNICATION: "COMMUNICATION",
  MONEY_TRANSFER: "MONEY_TRANSFER",
  TRANSPORTATION: "TRANSPORTATION",
} as const;

export type TVendorCategoryType =
  (typeof VENDOR_CATEGORIES)[keyof typeof VENDOR_CATEGORIES];

export const FALLBACK_VENDOR_CATEGORY = VENDOR_CATEGORIES.OTHER;

export const VENDOR_CATEGORY_ICONS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: miscIcon,
  [VENDOR_CATEGORIES.DINING]: diningTakeoutIcon,
  [VENDOR_CATEGORIES.FITNESS]: leisureSportsIcon,
  [VENDOR_CATEGORIES.APPAREL]: apparelIcon,
  [VENDOR_CATEGORIES.COSMETICS]: cosmeticsIcon,
  [VENDOR_CATEGORIES.STREAMING]: electronicsIcon,
  [VENDOR_CATEGORIES.UTILITIES]: electricityGasIcon,
  [VENDOR_CATEGORIES.GROCERIES]: groceriesIcon,
  [VENDOR_CATEGORIES.INSURANCE]: insuranceIcon,
  [VENDOR_CATEGORIES.GOVERNMENT]: governmentIcon,
  [VENDOR_CATEGORIES.BOOKS_PRINT]: booksPrintIcon,
  [VENDOR_CATEGORIES.COFFEE_BARS]: coffeeBarsIcon,
  [VENDOR_CATEGORIES.HOME_DESIGN]: homeDesignIcon,
  [VENDOR_CATEGORIES.FUEL]: fuelIcon,
  [VENDOR_CATEGORIES.PETS]: petsIcon,
  [VENDOR_CATEGORIES.COMMUNICATION]: electronicsIcon,
  [VENDOR_CATEGORIES.MONEY_TRANSFER]: moneyTransferIcon,
  [VENDOR_CATEGORIES.TRANSPORTATION]: transportationIcon,
};

export const VENDOR_CATEGORY_LABELS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.OTHER]: "אחר",
  [VENDOR_CATEGORIES.DINING]: "מסעדות",
  [VENDOR_CATEGORIES.FITNESS]: "פנאי",
  [VENDOR_CATEGORIES.APPAREL]: "ביגוד והנעלה",
  [VENDOR_CATEGORIES.COSMETICS]: "טיפוח וקוסמטיקה",
  [VENDOR_CATEGORIES.STREAMING]: "סטרימינג",
  [VENDOR_CATEGORIES.UTILITIES]: "דיור",
  [VENDOR_CATEGORIES.GROCERIES]: "סופרמרקט",
  [VENDOR_CATEGORIES.INSURANCE]: "ביטוח",
  [VENDOR_CATEGORIES.GOVERNMENT]: "ממשלה ומיסים",
  [VENDOR_CATEGORIES.BOOKS_PRINT]: "ספרים ודפוס",
  [VENDOR_CATEGORIES.COFFEE_BARS]: "בתי קפה",
  [VENDOR_CATEGORIES.HOME_DESIGN]: "עיצוב הבית",
  [VENDOR_CATEGORIES.FUEL]: "דלק",
  [VENDOR_CATEGORIES.PETS]: "חיות מחמד",
  [VENDOR_CATEGORIES.COMMUNICATION]: "תקשורת",
  [VENDOR_CATEGORIES.MONEY_TRANSFER]: "העברות כספים",
  [VENDOR_CATEGORIES.TRANSPORTATION]: "תחבורה",
};
