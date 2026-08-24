import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    header: {
      display: "flex",
      marginBottom: 6,
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    title: {
      margin: 0,
      fontSize: 21,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    row: ({ isLast }: { isLast: boolean }) => ({
      gap: 12,
      display: "flex",
      padding: "14px 0",
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
  });
