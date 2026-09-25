export const DRAFT_ACTIONS_QUERY_KEY = ["draft-action", "drafted"] as const;

export const DRAFT_ACTION_STATUSES = {
  DRAFTED: "DRAFTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  EXECUTED: "EXECUTED",
} as const;

export type TDraftActionStatusType =
  (typeof DRAFT_ACTION_STATUSES)[keyof typeof DRAFT_ACTION_STATUSES];

export const PENDING_DRAFT_ACTIONS_REQUEST = {
  status: DRAFT_ACTION_STATUSES.DRAFTED,
} as const;

export const DRAFT_ACTION_LABELS = {
  REVIEW: "למייל הביטול",
} as const;
