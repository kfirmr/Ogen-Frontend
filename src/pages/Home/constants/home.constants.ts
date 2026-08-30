import type { ITabOption } from "../../../components/TabBar/TabBar";
import type { IGuideStep } from "../../../components/GuideSteps/GuideSteps";

export const HOME_TABS: ITabOption[] = [
  { key: "overview", label: "סקירה" },
  { key: "subs", label: "מנויים" },
  { key: "cats", label: "קטגוריות" },
  { key: "tx", label: "תנועות" },
];

export const CSV_GUIDE_STEPS: IGuideStep[] = [
  { label: "כניסה לאתר האשראי והזדהות" },
  { label: "נווט לפירוט עסקאות" },
  { label: "בחירת התקופה הרצויה" },
  { label: "איתור כפתור הייצוא" },
  { label: "בחירת פורמט", sublabel: "CSV — לא PDF" },
  { label: "הורדת הנתונים", sublabel: "האוצר שלכם — מוכן להעלאה" },
];
