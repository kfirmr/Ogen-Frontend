import {
  getLevelCaption,
  getLevelXpLabel,
  getLevelHeadline,
  getLevelProgressPercent,
} from "../../utilities/level.utility";

import {
  toCategoryExpenses,
  toRecentTransactionViews,
} from "../../utilities/transaction.utility";

import {
  toSubscriptionViews,
  getSubscriptionsTotal,
  toSubscriptionSegments,
  getSubscriptionsSubtitle,
  getSubscriptionsSavingsBadge,
} from "../../utilities/subscription.utility";

import { useState } from "react";
import { useStyles } from "./HomePage.style";
import BottomNav from "./components/BottomNav";
import HomeHeader from "./components/HomeHeader";
import UploadCard from "./components/UploadCard";
import { useCurrentUser } from "../../store/auth.store";
import CategoriesCard from "./components/CategoriesCard";
import FoundMoneyCard from "./components/FoundMoneyCard";
import SaverLevelCard from "./components/SaverLevelCard";
import AppShell from "../../components/AppShell/AppShell";
import TransactionsCard from "./components/TransactionsCard";
import { getRecentMonths } from "../../utilities/date.utility";
import SubscriptionsCard from "./components/SubscriptionsCard";
import GuideSteps from "../../components/GuideSteps/GuideSteps";
import GuideModal from "../../components/GuideModal/GuideModal";
import { useTransactions } from "../../hooks/transactions.hook";
import { useUserProgress } from "../../hooks/user-progress.hook";
import { useSubscriptions } from "../../hooks/subscriptions.hook";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import { MONTHS_TO_SHOW, CSV_GUIDE_STEPS } from "./constants/home.constants";

const HomePage = () => {
  const months = getRecentMonths({ count: MONTHS_TO_SHOW });
  const styles = useStyles();
  const user = useCurrentUser();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedMonthKey, setSelectedMonthKey] = useState(
    months[months.length - 1].key,
  );
  const userProgress = useUserProgress();
  const subscriptions = useSubscriptions();
  const transactions = useTransactions();

  const name = user?.fullName ?? "";
  const categoryExpenses = toCategoryExpenses(transactions);
  const subscriptionViews = toSubscriptionViews(subscriptions);
  const transactionViews = toRecentTransactionViews(transactions);
  const subscriptionSegments = toSubscriptionSegments(subscriptions);

  const handleGuideConfirm = async () => {};

  return (
    <AppShell sx={styles.shell}>
      <HomeHeader
        name={name}
        avatarInitial={name.charAt(0)}
        level={getLevelHeadline(userProgress)}
      />

      <SaverLevelCard
        title="דרגת חוסך"
        xpLabel={getLevelXpLabel(userProgress)}
        caption={getLevelCaption(userProgress)}
        progress={getLevelProgressPercent(userProgress)}
      />

      <UploadCard onOpenGuide={() => setIsGuideOpen(true)} />

      <div style={styles.monthlyBand}>
        <MonthPicker
          months={months}
          value={selectedMonthKey}
          onChange={setSelectedMonthKey}
        />

        <FoundMoneyCard
          totalLabel="סה״כ הוצאות"
          segments={subscriptionSegments}
          totalAmount={getSubscriptionsTotal(subscriptions)}
          badgeText={getSubscriptionsSavingsBadge(subscriptions)}
        />

        <SubscriptionsCard
          title="ניהול מנויים"
          subscriptions={subscriptionViews}
          subtitle={getSubscriptionsSubtitle(subscriptionViews.length)}
        />

        <CategoriesCard
          title="הוצאות לפי קטגוריה"
          categories={categoryExpenses}
        />

        <TransactionsCard
          allText="הכל"
          title="תנועות אחרונות"
          transactions={transactionViews}
        />
      </div>

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
