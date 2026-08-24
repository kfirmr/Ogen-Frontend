import {
  TRANSACTIONS,
  SUBSCRIPTIONS,
  CSV_GUIDE_STEPS,
  EXPENSE_SEGMENTS,
  CATEGORY_EXPENSES,
} from "./constants/home.constants";

import { useState } from "react";
import { useStyles } from "./HomePage.style";
import BottomNav from "./components/BottomNav";
import HomeHeader from "./components/HomeHeader";
import UploadCard from "./components/UploadCard";
import { userStore } from "../../store/user.store";
import CategoriesCard from "./components/CategoriesCard";
import FoundMoneyCard from "./components/FoundMoneyCard";
import SaverLevelCard from "./components/SaverLevelCard";
import AppShell from "../../components/AppShell/AppShell";
import TransactionsCard from "./components/TransactionsCard";
import SubscriptionsCard from "./components/SubscriptionsCard";
import GuideSteps from "../../components/GuideSteps/GuideSteps";
import GuideModal from "../../components/GuideModal/GuideModal";

const HomePage = () => {
  const styles = useStyles();
  const name = userStore((state) => state.name);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleGuideConfirm = async () => {};

  return (
    <AppShell sx={styles.shell}>
      <HomeHeader
        name={name}
        level="רמה 4 · חוסך זהיר"
        avatarInitial={name.charAt(0)}
      />

      <FoundMoneyCard
        month="אוגוסט"
        totalAmount="8,439 ₪"
        totalLabel="סה״כ הוצאות"
        segments={EXPENSE_SEGMENTS}
        badgeText="מצאנו 339 ₪ לחיסכון"
      />

      <SaverLevelCard
        progress={68}
        title="דרגת חוסך"
        xpLabel="רמה 4 · 680 XP"
        caption="עוד 50 ₪ החודש כדי להגיע לדרגת הזהב."
      />

      <UploadCard onOpenGuide={() => setIsGuideOpen(true)} />

      <SubscriptionsCard
        title="ניהול מנויים"
        subtitle="3 יעדים פתוחים"
        subscriptions={SUBSCRIPTIONS}
      />

      <CategoriesCard
        title="הוצאות לפי קטגוריה"
        categories={CATEGORY_EXPENSES}
      />

      <TransactionsCard
        allText="הכל"
        title="תנועות אחרונות"
        transactions={TRANSACTIONS}
      />

      <BottomNav />

      <GuideModal
        open={isGuideOpen}
        eyebrow="מפת האוצר"
        title="איך מורידים קובץ CSV?"
        onClose={() => setIsGuideOpen(false)}
        subtitle="שישה שלבים באתר האשראי — ואז מעלים לעוגן."
        primaryButton={{ text: "הבנתי, נתחיל", onClick: handleGuideConfirm }}
        secondaryButton={{
          text: "אחר כך",
          onClick: () => setIsGuideOpen(false),
        }}
      >
        <GuideSteps steps={CSV_GUIDE_STEPS} />
      </GuideModal>
    </AppShell>
  );
};

export default HomePage;
