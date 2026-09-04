import {
  toInsightViews,
  getVisibleInsights,
  getInsightsForMonth,
  getInsightCountLabel,
} from "../../utilities/insight.utility";

import { useState } from "react";
import Card from "../../components/Card/Card";
import { useStyles } from "./InsightsPage.style";
import InsightCard from "./components/InsightCard";
import { useQueryClient } from "@tanstack/react-query";
import anchorIcon from "../../assets/icons/anchor.png";
import { useCurrentUser } from "../../store/auth.store";
import { useInsights } from "../../hooks/insights.hook";
import AppShell from "../../components/AppShell/AppShell";
import BottomNav from "../../components/BottomNav/BottomNav";
import { getRecentMonths } from "../../utilities/date.utility";
import PageHeader from "../../components/PageHeader/PageHeader";
import { MONTHS_TO_SHOW } from "../../constants/date.constants";
import { getLevelHeadline } from "../../utilities/level.utility";
import { useUserProgress } from "../../hooks/user-progress.hook";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import { dismissInsightAction } from "../../actions/insight.actions";
import { INSIGHTS_QUERY_KEY } from "../../constants/insight.constants";
import { USER_PROGRESS_QUERY_KEY } from "../../constants/level.constants";

const InsightsPage = () => {
  const months = getRecentMonths({ count: MONTHS_TO_SHOW });
  const styles = useStyles();
  const queryClient = useQueryClient();
  const user = useCurrentUser();
  const userProgress = useUserProgress();
  const insightRecords = useInsights();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [selectedMonthKey, setSelectedMonthKey] = useState(
    months[months.length - 1].key,
  );

  const name = user?.fullName ?? "";
  const monthlyInsights = getInsightsForMonth(insightRecords, selectedMonthKey);
  const visibleInsights = getVisibleInsights(
    toInsightViews(monthlyInsights),
    dismissedIds,
  );

  const handleDismiss = async (id: string) => {
    setDismissedIds((current) => current.concat(id));

    try {
      await dismissInsightAction(id);
      queryClient.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USER_PROGRESS_QUERY_KEY });
    } catch (error) {
      console.error("Failed to dismiss insight", error);
      setDismissedIds((current) =>
        current.filter((dismissedId) => dismissedId !== id),
      );
    }
  };

  return (
    <AppShell sx={styles.shell}>
      <PageHeader
        name={name}
        avatarInitial={name.charAt(0)}
        level={getLevelHeadline(userProgress)}
      />

      <div style={styles.monthlyBand}>
        <MonthPicker
          months={months}
          value={selectedMonthKey}
          onChange={setSelectedMonthKey}
        />

        <div style={styles.listHeader}>
          <h3 style={styles.listTitle}>תובנות החודש</h3>
          <span style={styles.listCount}>
            {getInsightCountLabel(visibleInsights.length)}
          </span>
        </div>

        <div style={styles.list}>
          {visibleInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              dismissText="הבנתי"
              onDismiss={handleDismiss}
            />
          ))}

          {visibleInsights.length === 0 && (
            <Card tone="tint" sx={styles.emptyState}>
              <img alt="" src={anchorIcon} style={styles.emptyIcon} />
              <div style={styles.emptyTitle}>סיימת את כל התובנות</div>
              <p style={styles.emptyBody}>
                כל הכבוד — נחזור עם תובנות חדשות בחודש הבא.
              </p>
            </Card>
          )}
        </div>
      </div>

      <BottomNav activeTab="insights" />
    </AppShell>
  );
};

export default InsightsPage;
