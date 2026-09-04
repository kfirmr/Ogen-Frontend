export const INSIGHTS_QUERY_KEY = ["insight", "unread"] as const;

export const ACTIVE_INSIGHTS_REQUEST = { status: "UNREAD" } as const;

export const INSIGHT_TYPES = {
  DUPLICATE: "DUPLICATE",
  OVERPAYING: "OVERPAYING",
  HIGH_SPENDING: "HIGH_SPENDING",
} as const;

export type TInsightType = (typeof INSIGHT_TYPES)[keyof typeof INSIGHT_TYPES];

export const INSIGHT_STATUSES = {
  READ: "READ",
  UNREAD: "UNREAD",
  ACTION_TAKEN: "ACTION_TAKEN",
} as const;

export type TInsightStatusType =
  (typeof INSIGHT_STATUSES)[keyof typeof INSIGHT_STATUSES];

export type TInsightTone = "win" | "streak" | "warning";

export const INSIGHT_TYPE_TITLES: Record<TInsightType, string> = {
  [INSIGHT_TYPES.DUPLICATE]: "מנוי כפול",
  [INSIGHT_TYPES.OVERPAYING]: "מחיר גבוה מהשוק",
  [INSIGHT_TYPES.HIGH_SPENDING]: "הוצאה גדולה מהרגיל",
};

export const INSIGHT_TYPE_TONES: Record<TInsightType, TInsightTone> = {
  [INSIGHT_TYPES.DUPLICATE]: "warning",
  [INSIGHT_TYPES.OVERPAYING]: "warning",
  [INSIGHT_TYPES.HIGH_SPENDING]: "warning",
};
