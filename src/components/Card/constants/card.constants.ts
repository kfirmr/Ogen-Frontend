import type { CSSProperties } from "react";
import { theme } from "../../../constants/theme.constants";

export type TCardTone = "default" | "tint";

export const CARD_TONE_STYLES: Record<TCardTone, CSSProperties> = {
  default: {
    backgroundColor: theme.background.card,
    border: `2px solid ${theme.border.subtle}`,
    boxShadow: theme.shadow.card,
  },
  tint: {
    backgroundColor: theme.background.tint,
    border: `2px solid ${theme.colors.greenTintBorder}`,
    boxShadow: theme.shadow.cardTint,
  },
};
