import {
  getLevelCaption,
  getLevelXpLabel,
  getLevelHeadline,
  getLevelProgressPercent,
} from "../../utilities/level.utility";

import {
  toCategoryExpenses,
  toTransactionViews,
  toRecentTransactionViews,
} from "../../utilities/transaction.utility";

import {
  toSubscriptionViews,
  getSubscriptionsTotal,
  toSubscriptionSegments,
  getSubscriptionsSubtitle,
  getSubscriptionsSavingsBadge,
} from "../../utilities/subscription.utility";

import { useStyles } from "./HomePage.style";
import { useState, type ReactNode } from "react";
import UploadCard from "./components/UploadCard";
import TabBar from "../../components/TabBar/TabBar";
import { useCurrentUser } from "../../store/auth.store";
import CategoriesCard from "./components/CategoriesCard";
import FoundMoneyCard from "./components/FoundMoneyCard";
import SaverLevelCard from "./components/SaverLevelCard";
import AppShell from "../../components/AppShell/AppShell";
import BottomNav from "../../components/BottomNav/BottomNav";
import TransactionsCard from "./components/TransactionsCard";
import TransactionsPopup from "./components/TransactionsPopup";
import { getRecentMonths } from "../../utilities/date.utility";
import SubscriptionsCard from "./components/SubscriptionsCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import GuideSteps from "../../components/GuideSteps/GuideSteps";
import GuideModal from "../../components/GuideModal/GuideModal";
import { useTransactions } from "../../hooks/transactions.hook";
import { MONTHS_TO_SHOW } from "../../constants/date.constants";
import { useUserProgress } from "../../hooks/user-progress.hook";
import { useSubscriptions } from "../../hooks/subscriptions.hook";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import { HOME_TABS, CSV_GUIDE_STEPS } from "./constants/home.constants";

const HomePage = () => {
  const months = getRecentMonths({ count: MONTHS_TO_SHOW });
  const styles = useStyles();
  const user = useCurrentUser();
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(HOME_TABS[0].key);
  const [isTransactionsPopupOpen, setIsTransactionsPopupOpen] = useState(false);
  const [selectedMonthKey, setSelectedMonthKey] = useState(
    months[months.length - 1].key,
  );
  const userProgress = useUserProgress();
  const subscriptions = useSubscriptions();
  const transactions = useTransactions(selectedMonthKey);

  const name = user?.fullName ?? "";
  const categoryExpenses = toCategoryExpenses(transactions);
  const subscriptionViews = toSubscriptionViews(subscriptions);
  const transactionViews = toRecentTransactionViews(transactions);
  const allTransactionViews = toTransactionViews(transactions);
  const subscriptionSegments = toSubscriptionSegments(subscriptions);

  const tabPanels: Record<string, ReactNode> = {
    overview: (
      <FoundMoneyCard
        totalLabel="סה״כ הוצאות"
        segments={subscriptionSegments}
        totalAmount={getSubscriptionsTotal(subscriptions)}
        badgeText={getSubscriptionsSavingsBadge(subscriptions)}
      />
    ),
    subs: (
      <SubscriptionsCard
        title="ניהול מנויים"
        subscriptions={subscriptionViews}
        subtitle={getSubscriptionsSubtitle(subscriptionViews.length)}
      />
    ),
    cats: (
      <CategoriesCard
        title="הוצאות לפי קטגוריה"
        categories={categoryExpenses}
      />
    ),
    tx: (
      <TransactionsCard
        allText="הכל"
        title="תנועות אחרונות"
        transactions={transactionViews}
        onShowAll={() => setIsTransactionsPopupOpen(true)}
      />
    ),
  };

  const handleGuideConfirm = async () => {};

  return (
    <AppShell sx={styles.shell}>
      <PageHeader
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

        <TabBar tabs={HOME_TABS} value={activeTab} onChange={setActiveTab} />

        {tabPanels[activeTab]}
      </div>

      <BottomNav activeTab="home" />

      <TransactionsPopup
        open={isTransactionsPopupOpen}
        transactions={allTransactionViews}
        onClose={() => setIsTransactionsPopupOpen(false)}
      />

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
