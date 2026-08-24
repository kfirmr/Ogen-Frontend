import { theme } from "../../../constants/theme.constants";

export type TProgressBarTone = "gold" | "green";

export const PROGRESS_BAR_TONE_FILL: Record<TProgressBarTone, string> = {
  gold: theme.colors.gold,
  green: theme.colors.green,
};
