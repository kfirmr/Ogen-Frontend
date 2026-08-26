import {
  type TBadgeTone,
  BADGE_TONE_STYLES,
} from "./constants/badge.constants";

import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    badge: ({ tone }: { tone: TBadgeTone }) => ({
      fontSize: 12,
      fontWeight: 800,
      width: "fit-content",
      display: "inline-block",
      padding: "6px 14px",
      letterSpacing: "0.5px",
      fontFamily: theme.fonts.body,
      borderRadius: theme.radius.pill,
      ...BADGE_TONE_STYLES[tone],
    }),
  });
