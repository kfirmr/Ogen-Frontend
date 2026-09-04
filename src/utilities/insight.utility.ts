import {
  INSIGHT_TYPE_TONES,
  INSIGHT_TYPE_TITLES,
} from "../constants/insight.constants";

import { isDateInMonth } from "./date.utility";
import { renderInsightIcon } from "./insight-icon.utility";
import type { IInsight, IInsightRecord } from "../interfaces/insight.interface";

export const getVisibleInsights = (
  insights: IInsight[],
  dismissedIds: string[],
): IInsight[] =>
  insights.filter((insight) => !dismissedIds.includes(insight.id));

export const getInsightCountLabel = (count: number): string =>
  `${count} פתוחות`;

export const getInsightsForMonth = (
  records: IInsightRecord[],
  monthKey: string,
): IInsightRecord[] =>
  records.filter((record) => isDateInMonth(record.createdAt, monthKey));

export const toInsightViews = (records: IInsightRecord[]): IInsight[] =>
  records.map((record) => ({
    id: record.id,
    body: record.body,
    xpLabel: "+15 XP",
    icon: renderInsightIcon(record),
    tone: INSIGHT_TYPE_TONES[record.type],
    title: INSIGHT_TYPE_TITLES[record.type],
  }));
