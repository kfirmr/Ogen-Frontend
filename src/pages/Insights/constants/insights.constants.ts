import groceriesIcon from "../../../assets/icons/groceries.png";
import type { IInsight } from "../../../interfaces/insight.interface";
import diningTakeoutIcon from "../../../assets/icons/dining_takeout.png";

export const MOCK_INSIGHTS: IInsight[] = [
  {
    id: "dining",
    tone: "alert",
    icon: diningTakeoutIcon,
    title: "האוכל בחוץ עלה ב־38%",
    body: "הוצאת 1,240 ₪ על מסעדות וטייק־אוויי החודש — 340 ₪ יותר מיולי. קיצוץ של שתי הזמנות בשבוע יחזיר לך 260 ₪.",
    xpLabel: "+30 XP",
  },
  {
    id: "groceries",
    tone: "alert",
    icon: groceriesIcon,
    title: "סופר בתקציב — 3 חודשים ברצף",
    body: "הקטגוריה קניות סגרה על 1,980 ₪, מתחת ליעד של 2,100 ₪. אתה שומר על הקו.",
    xpLabel: "+15 XP",
  },
];
