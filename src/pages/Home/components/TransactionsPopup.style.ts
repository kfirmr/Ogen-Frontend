import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    card: {
      padding: "20px 0 6px",
    },
    list: {
      gap: 0,
      display: "flex",
      overflowY: "auto" as const,
      maxHeight: "50vh",
      flexDirection: "column" as const,
    },
    row: ({ isLast }: { isLast: boolean }) => ({
      gap: 12,
      display: "flex",
      padding: "14px 20px",
      alignItems: "center",
      borderBottom: isLast ? "none" : `2px solid ${theme.background.fill}`,
    }),
    icon: {
      width: 40,
      height: 40,
      display: "block",
    },
    text: {
      flex: 1,
      gap: 1,
      display: "flex",
      flexDirection: "column" as const,
    },
    name: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    time: {
      fontSize: 13,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
    amount: {
      fontSize: 16,
      fontWeight: 800,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    emptyText: {
      fontSize: 15,
      padding: "14px 20px",
      textAlign: "center" as const,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
  });
