import { theme } from "./theme.constants";

export const TRANSACTIONS_QUERY_KEY = ["transaction", "recent"] as const;

export const RECENT_TRANSACTIONS_REQUEST = { batchSize: 50 } as const;

export const IMPORTED_TRANSACTIONS_BATCH_SIZE = 100;

export const RECENT_TRANSACTIONS_COUNT = 3;

export const TOP_EXPENSE_CATEGORIES_COUNT = 4;

export const TRANSACTION_LABELS = {
  TODAY: "היום",
  YESTERDAY: "אתמול",
  UNKNOWN_AMOUNT: "לא ידוע",
  NON_SUBSCRIPTION_EXPENSES: "שאר ההוצאות",
} as const;

export const NON_SUBSCRIPTION_SEGMENT_COLOR: string = theme.colors.mutedLight;

export const CATEGORY_EXPENSE_COLORS: string[] = [
  theme.colors.green,
  theme.colors.gold,
  theme.colors.orange,
  theme.colors.goldTint,
];
