import { createStyles } from "../../../create-styles";
import { theme, TONE_STYLES } from "../../../constants/theme.constants";
import type { TInsightTone } from "../../../interfaces/insight.interface";

export const useStyles = () =>
  createStyles({
    card: ({ tone }: { tone: TInsightTone }) => ({
      gap: 10,
      display: "flex",
      padding: "16px 16px 14px",
      boxSizing: "border-box" as const,
      borderRadius: 26,
      flexDirection: "column" as const,
      backgroundColor: TONE_STYLES[tone].background,
      border: `2px solid ${TONE_STYLES[tone].border}`,
      boxShadow: TONE_STYLES[tone].shadow,
    }),
    header: {
      gap: 12,
      display: "flex",
      alignItems: "center",
    },
    icon: ({ icon }: { icon: string }) => ({
      width: 40,
      height: 40,
      flex: "0 0 auto",
      backgroundImage: `url(${icon})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }),
    title: {
      flex: 1,
      minWidth: 0,
      fontSize: 18,
      lineHeight: 1.3,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    body: {
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.55,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    footer: {
      gap: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    xp: {
      flex: "0 0 auto",
      fontSize: 12,
      fontWeight: 800,
      whiteSpace: "nowrap" as const,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
  });
