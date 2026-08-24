import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";
import {
  type TProgressBarTone,
  PROGRESS_BAR_TONE_FILL,
} from "./constants/progress-bar.constants";

const clampToPercent = (value: number) => Math.min(Math.max(value, 0), 100);

export const useStyles = () =>
  createStyles({
    track: {
      height: 20,
      overflow: "hidden",
      boxSizing: "border-box" as const,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.border.faint,
    },
    fill: ({ value, tone }: { value: number; tone: TProgressBarTone }) => ({
      height: "100%",
      transition: "width .3s ease",
      width: `${clampToPercent(value)}%`,
      borderRadius: theme.radius.pill,
      boxShadow: "inset 0 -4px 0 rgba(0,0,0,.08)",
      backgroundColor: PROGRESS_BAR_TONE_FILL[tone],
    }),
  });
