import type { CSSProperties } from "react";
import { theme } from "../../../constants/theme.constants";

export type TBadgeTone = "gold" | "green" | "neutral";

export const BADGE_TONE_STYLES: Record<TBadgeTone, CSSProperties> = {
  gold: { color: theme.colors.ink, backgroundColor: theme.colors.gold },
  green: { color: theme.colors.white, backgroundColor: theme.colors.green },
  neutral: { color: theme.colors.ink, backgroundColor: theme.background.fill },
};
