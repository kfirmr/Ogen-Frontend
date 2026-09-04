import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    card: {
      gap: 10,
      display: "flex",
      padding: "16px 16px 14px",
      boxSizing: "border-box" as const,
      borderRadius: 26,
      flexDirection: "column" as const,
      backgroundColor: theme.background.card,
      border: `2px solid ${theme.border.subtle}`,
      boxShadow: theme.shadow.card,
    },
    header: {
      gap: 12,
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: 40,
      height: 40,
      display: "flex",
      flex: "0 0 auto",
      alignItems: "center",
      justifyContent: "center",
    },
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
      alignItems: "flex-end",
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
