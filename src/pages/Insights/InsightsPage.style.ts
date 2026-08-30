import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    shell: {
      gap: 18,
      display: "flex",
      padding: "26px 20px 26px",
      flexDirection: "column" as const,
    },
    monthlyBand: {
      gap: 18,
      display: "flex",
      marginTop: 4,
      padding: "16px 14px 20px",
      boxSizing: "border-box" as const,
      flexDirection: "column" as const,
      borderRadius: theme.radius.section,
      backgroundColor: theme.background.fill,
      border: `2px solid ${theme.border.faint}`,
    },
    listHeader: {
      display: "flex",
      padding: "0 6px",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    listTitle: {
      margin: 0,
      fontSize: 22,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    listCount: {
      fontSize: 13,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
    list: {
      gap: 12,
      display: "flex",
      flexDirection: "column" as const,
    },
    emptyState: {
      gap: 8,
      display: "flex",
      padding: "30px 20px",
      textAlign: "center" as const,
      alignItems: "center",
      flexDirection: "column" as const,
    },
    emptyIcon: {
      width: 52,
      height: 52,
      display: "block",
    },
    emptyTitle: {
      fontSize: 19,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    emptyBody: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.5,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
  });
