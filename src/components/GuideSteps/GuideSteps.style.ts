import {
  type TGuideStepTone,
  GUIDE_STEP_TONE_STYLES,
} from "./constants/guide-steps.constants";

import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column" as const,
    },
    row: {
      gap: 16,
      display: "flex",
      alignItems: "center",
    },
    circle: ({ tone, isLast }: { tone: TGuideStepTone; isLast: boolean }) => ({
      flex: "0 0 auto",
      display: "flex",
      fontWeight: 900,
      lineHeight: 1,
      width: isLast ? 52 : 44,
      height: isLast ? 52 : 44,
      alignItems: "center",
      fontSize: isLast ? 21 : 19,
      justifyContent: "center",
      fontFamily: theme.fonts.body,
      borderRadius: theme.radius.pill,
      ...GUIDE_STEP_TONE_STYLES[tone],
    }),
    text: {
      gap: 2,
      display: "flex",
      flexDirection: "column" as const,
    },
    label: ({ isLast }: { isLast: boolean }) => ({
      lineHeight: 1.4,
      color: theme.colors.ink,
      fontSize: isLast ? 19 : 17,
      fontWeight: isLast ? 700 : 500,
      fontFamily: theme.fonts.body,
    }),
    sublabel: {
      fontSize: 14,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    connector: {
      width: 44,
      height: 26,
      display: "flex",
      justifyContent: "center",
    },
    connectorLine: ({ flipped }: { flipped: boolean }) => ({
      width: 0,
      height: "100%",
      transform: `rotate(${flipped ? -14 : 14}deg)`,
      borderRight: `3px dashed ${theme.colors.gold}`,
    }),
  });
