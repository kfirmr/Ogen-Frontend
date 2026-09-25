import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    card: {
      gap: 12,
      display: "flex",
      alignItems: "center",
      padding: "14px 16px",
    },
    icon: {
      width: 44,
      height: 44,
      flex: "0 0 auto",
      display: "block",
    },
    text: {
      gap: 2,
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column" as const,
    },
    title: {
      fontSize: 17,
      fontWeight: 700,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
  });
