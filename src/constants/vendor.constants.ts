import fuelIcon from "../assets/icons/fuel.png";
import miscIcon from "../assets/icons/misc.png";
import petsIcon from "../assets/icons/pets.png";
import apparelIcon from "../assets/icons/apparel.png";
import cosmeticsIcon from "../assets/icons/cosmetics.png";
import groceriesIcon from "../assets/icons/groceries.png";
import insuranceIcon from "../assets/icons/insurance.png";
import governmentIcon from "../assets/icons/government.png";
import booksPrintIcon from "../assets/icons/books_print.png";
import homeDesignIcon from "../assets/icons/home_design.png";
import electronicsIcon from "../assets/icons/electronics.png";
import diningTakeoutIcon from "../assets/icons/dining_takeout.png";
import leisureSportsIcon from "../assets/icons/leisure_sports.png";
import moneyTransferIcon from "../assets/icons/money_transfer.png";
import transportationIcon from "../assets/icons/transportation.png";
import electricityGasIcon from "../assets/icons/electricity_gas.png";

export const VENDOR_CATEGORIES = {
  PETS: "PETS",
  OTHER: "OTHER",
  DINING: "DINING",
  FITNESS: "FITNESS",
  SOFTWARE: "SOFTWARE",
  COSMETICS: "COSMETICS",
  INSURANCE: "INSURANCE",
  STREAMING: "STREAMING",
  UTILITIES: "UTILITIES",
  GROCERIES: "GROCERIES",
  GOVERNMENT: "GOVERNMENT",
  ELECTRONICS: "ELECTRONICS",
  HOME_DESIGN: "HOME_DESIGN",
  BOOKS_PRINT: "BOOKS_PRINT",
  FUEL_ENERGY: "FUEL_ENERGY",
  COMMUNICATION: "COMMUNICATION",
  MONEY_TRANSFER: "MONEY_TRANSFER",
  DEBT_REPAYMENT: "DEBT_REPAYMENT",
  KIDS_EDUCATION: "KIDS_EDUCATION",
  LEISURE_SPORTS: "LEISURE_SPORTS",
  TRANSPORTATION: "TRANSPORTATION",
  FINANCIAL_FEES: "FINANCIAL_FEES",
  SHOPPING_APPAREL: "SHOPPING_APPAREL",
  TRAVEL_VACATIONS: "TRAVEL_VACATIONS",
} as const;

export type TVendorCategoryType =
  (typeof VENDOR_CATEGORIES)[keyof typeof VENDOR_CATEGORIES];

export const FALLBACK_VENDOR_CATEGORY = VENDOR_CATEGORIES.OTHER;

export const VENDOR_CATEGORY_ICONS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.PETS]: petsIcon,
  [VENDOR_CATEGORIES.OTHER]: miscIcon,
  [VENDOR_CATEGORIES.DINING]: diningTakeoutIcon,
  [VENDOR_CATEGORIES.FITNESS]: leisureSportsIcon,
  [VENDOR_CATEGORIES.SOFTWARE]: electronicsIcon,
  [VENDOR_CATEGORIES.COSMETICS]: cosmeticsIcon,
  [VENDOR_CATEGORIES.INSURANCE]: insuranceIcon,
  [VENDOR_CATEGORIES.STREAMING]: electronicsIcon,
  [VENDOR_CATEGORIES.UTILITIES]: electricityGasIcon,
  [VENDOR_CATEGORIES.GROCERIES]: groceriesIcon,
  [VENDOR_CATEGORIES.GOVERNMENT]: governmentIcon,
  [VENDOR_CATEGORIES.ELECTRONICS]: electronicsIcon,
  [VENDOR_CATEGORIES.HOME_DESIGN]: homeDesignIcon,
  [VENDOR_CATEGORIES.BOOKS_PRINT]: booksPrintIcon,
  [VENDOR_CATEGORIES.FUEL_ENERGY]: fuelIcon,
  [VENDOR_CATEGORIES.COMMUNICATION]: electronicsIcon,
  [VENDOR_CATEGORIES.MONEY_TRANSFER]: moneyTransferIcon,
  [VENDOR_CATEGORIES.DEBT_REPAYMENT]: moneyTransferIcon,
  [VENDOR_CATEGORIES.KIDS_EDUCATION]: miscIcon,
  [VENDOR_CATEGORIES.LEISURE_SPORTS]: leisureSportsIcon,
  [VENDOR_CATEGORIES.TRANSPORTATION]: transportationIcon,
  [VENDOR_CATEGORIES.FINANCIAL_FEES]: moneyTransferIcon,
  [VENDOR_CATEGORIES.SHOPPING_APPAREL]: apparelIcon,
  [VENDOR_CATEGORIES.TRAVEL_VACATIONS]: transportationIcon,
};

export const VENDOR_CATEGORY_LABELS: Record<TVendorCategoryType, string> = {
  [VENDOR_CATEGORIES.PETS]: "חיות מחמד",
  [VENDOR_CATEGORIES.OTHER]: "אחר",
  [VENDOR_CATEGORIES.DINING]: "מסעדות",
  [VENDOR_CATEGORIES.FITNESS]: "כושר",
  [VENDOR_CATEGORIES.SOFTWARE]: "תוכנה",
  [VENDOR_CATEGORIES.COSMETICS]: "טיפוח וקוסמטיקה",
  [VENDOR_CATEGORIES.INSURANCE]: "ביטוח",
  [VENDOR_CATEGORIES.STREAMING]: "סטרימינג",
  [VENDOR_CATEGORIES.UTILITIES]: "דיור",
  [VENDOR_CATEGORIES.GROCERIES]: "סופרמרקט",
  [VENDOR_CATEGORIES.GOVERNMENT]: "ממשלה ומיסים",
  [VENDOR_CATEGORIES.ELECTRONICS]: "אלקטרוניקה",
  [VENDOR_CATEGORIES.HOME_DESIGN]: "עיצוב הבית",
  [VENDOR_CATEGORIES.BOOKS_PRINT]: "ספרים ודפוס",
  [VENDOR_CATEGORIES.FUEL_ENERGY]: "דלק ואנרגיה",
  [VENDOR_CATEGORIES.COMMUNICATION]: "תקשורת",
  [VENDOR_CATEGORIES.MONEY_TRANSFER]: "העברות כספים",
  [VENDOR_CATEGORIES.DEBT_REPAYMENT]: "החזרי חובות",
  [VENDOR_CATEGORIES.KIDS_EDUCATION]: "ילדים וחינוך",
  [VENDOR_CATEGORIES.LEISURE_SPORTS]: "פנאי וספורט",
  [VENDOR_CATEGORIES.TRANSPORTATION]: "תחבורה",
  [VENDOR_CATEGORIES.FINANCIAL_FEES]: "עמלות בנקאיות",
  [VENDOR_CATEGORIES.SHOPPING_APPAREL]: "ביגוד והנעלה",
  [VENDOR_CATEGORIES.TRAVEL_VACATIONS]: "טיולים ונופש",
};
