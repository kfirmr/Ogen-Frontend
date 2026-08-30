import type { IInsight } from "../interfaces/insight.interface";

export const getVisibleInsights = (
  insights: IInsight[],
  dismissedIds: string[],
): IInsight[] =>
  insights.filter((insight) => !dismissedIds.includes(insight.id));

export const getInsightCountLabel = (count: number): string =>
  `${count} פתוחות`;
