import type { IGuideStep } from "../../../components/GuideSteps/GuideSteps";

export const MONTHS_TO_SHOW = 5;

export const CSV_GUIDE_STEPS: IGuideStep[] = [
  { label: "כניסה לאתר האשראי והזדהות" },
  { label: "נווט לפירוט עסקאות" },
  { label: "בחירת התקופה הרצויה" },
  { label: "איתור כפתור הייצוא" },
  { label: "בחירת פורמט", sublabel: "CSV — לא PDF" },
  { label: "הורדת הנתונים", sublabel: "האוצר שלכם — מוכן להעלאה" },
];
