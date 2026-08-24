import { theme } from "../../../constants/theme.constants";
import groceriesIcon from "../../../assets/icons/groceries.png";
import telecomIcon from "../../../assets/icons/telecom_media.png";
import transportIcon from "../../../assets/icons/transportation.png";
import subscriptionsIcon from "../../../assets/icons/subscriptions.png";
import diningTakeoutIcon from "../../../assets/icons/dining_takeout.png";
import healthFitnessIcon from "../../../assets/icons/health_fitness.png";
import type { IGuideStep } from "../../../components/GuideSteps/GuideSteps";
import housingUtilitiesIcon from "../../../assets/icons/housing_utilities.png";

export interface IExpenseSegment {
  value: number;
  color: string;
  label: string;
}

export const EXPENSE_SEGMENTS: IExpenseSegment[] = [
  { value: 8100, color: theme.colors.green, label: "הוצאות קבועות" },
  { value: 250, color: theme.colors.orange, label: "Space Gym" },
  { value: 69, color: theme.colors.gold, label: "Netflix" },
  { value: 20, color: theme.colors.goldTint, label: "Spotify" },
];

export interface ISubscription {
  name: string;
  icon: string;
  price: string;
}

export interface ICategoryExpense {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export interface ITransaction {
  icon: string;
  name: string;
  time: string;
  amount: string;
}

export const CSV_GUIDE_STEPS: IGuideStep[] = [
  { label: "כניסה לאתר האשראי והזדהות" },
  { label: "נווט לפירוט עסקאות" },
  { label: "בחירת התקופה הרצויה" },
  { label: "איתור כפתור הייצוא" },
  { label: "בחירת פורמט", sublabel: "CSV — לא PDF" },
  { label: "הורדת הנתונים", sublabel: "האוצר שלכם — מוכן להעלאה" },
];

export const SUBSCRIPTIONS: ISubscription[] = [
  { name: "Netflix", icon: subscriptionsIcon, price: "69 ₪ / חודש" },
  { name: "Spotify", icon: telecomIcon, price: "20 ₪ / חודש" },
  { name: "Space Gym", icon: healthFitnessIcon, price: "250 ₪ / חודש" },
];

export const CATEGORY_EXPENSES: ICategoryExpense[] = [
  {
    icon: housingUtilitiesIcon,
    label: "דיור",
    value: 5200,
    color: theme.colors.green,
  },
  { icon: groceriesIcon, label: "מזון", value: 1900, color: theme.colors.gold },
  {
    icon: transportIcon,
    label: "תחבורה",
    value: 900,
    color: theme.colors.orange,
  },
  {
    icon: healthFitnessIcon,
    label: "בריאות",
    value: 439,
    color: theme.colors.goldTint,
  },
];

export const TRANSACTIONS: ITransaction[] = [
  {
    icon: diningTakeoutIcon,
    name: "מסעדת האחים",
    time: "היום, 14:30",
    amount: "320- ₪",
  },
  {
    icon: groceriesIcon,
    name: "שופרסל",
    time: "אתמול, 09:15",
    amount: "850- ₪",
  },
  {
    icon: transportIcon,
    name: "דלק פז",
    time: "אתמול, 08:02",
    amount: "240- ₪",
  },
];
