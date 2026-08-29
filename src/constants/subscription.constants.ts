import { theme } from "./theme.constants";
import { TIME_UNITS } from "./date.constants";

const MONTHS_PER_YEAR = 12;
const MONTHS_PER_QUARTER = 3;
const WEEKS_PER_MONTH = TIME_UNITS.MONTHS / TIME_UNITS.WEEKS;

export const SUBSCRIPTIONS_QUERY_KEY = ["subscription", "active"] as const;

export const SUBSCRIPTION_STATUSES = {
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  CANCELLATION_REQUESTED: "CANCELLATION_REQUESTED",
} as const;

export type TSubscriptionStatusType =
  (typeof SUBSCRIPTION_STATUSES)[keyof typeof SUBSCRIPTION_STATUSES];

export const BILLING_CYCLES = {
  WEEKLY: "WEEKLY",
  YEARLY: "YEARLY",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
} as const;

export type TBillingCycleType =
  (typeof BILLING_CYCLES)[keyof typeof BILLING_CYCLES];

export const BILLING_CYCLE_LABELS: Record<TBillingCycleType, string> = {
  [BILLING_CYCLES.WEEKLY]: "שבוע",
  [BILLING_CYCLES.YEARLY]: "שנה",
  [BILLING_CYCLES.MONTHLY]: "חודש",
  [BILLING_CYCLES.QUARTERLY]: "רבעון",
};

export const MONTHLY_AMOUNT_FACTORS: Record<TBillingCycleType, number> = {
  [BILLING_CYCLES.MONTHLY]: 1,
  [BILLING_CYCLES.WEEKLY]: WEEKS_PER_MONTH,
  [BILLING_CYCLES.YEARLY]: 1 / MONTHS_PER_YEAR,
  [BILLING_CYCLES.QUARTERLY]: 1 / MONTHS_PER_QUARTER,
};

export const SUBSCRIPTION_SEGMENT_COLORS: string[] = [
  theme.colors.green,
  theme.colors.orange,
  theme.colors.gold,
  theme.colors.goldTint,
];

export const SUBSCRIPTION_LABELS = {
  UNKNOWN_VENDOR: "מנוי",
  UNKNOWN_PRICE: "לא ידוע",
  SAVINGS_BADGE_PREFIX: "מצאנו",
  SAVINGS_BADGE_SUFFIX: "לחיסכון",
} as const;

export const ACTIVE_SUBSCRIPTIONS_REQUEST = {
  batchSize: 20,
  status: SUBSCRIPTION_STATUSES.ACTIVE,
} as const;
