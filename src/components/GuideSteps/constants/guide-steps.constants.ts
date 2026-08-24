import type { CSSProperties } from "react";
import { theme } from "../../../constants/theme.constants";

export type TGuideStepTone = "green" | "gold";

export const GUIDE_STEP_TONE_STYLES: Record<TGuideStepTone, CSSProperties> = {
  green: {
    color: theme.colors.white,
    backgroundColor: theme.colors.green,
    boxShadow: `0 4px 0 ${theme.colors.greenDark}`,
  },
  gold: {
    color: theme.colors.ink,
    backgroundColor: theme.colors.gold,
    boxShadow: `0 4px 0 ${theme.colors.goldDark}`,
  },
};
