import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    header: {
      display: "flex",
      padding: "6px 6px 0",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    title: {
      margin: 0,
      fontSize: 22,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    subtitle: {
      fontSize: 13,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
    list: {
      gap: 12,
      display: "flex",
      flexDirection: "column" as const,
    },
    icon: {
      width: 44,
      height: 44,
      display: "block",
    },
    text: {
      flex: 1,
      gap: 2,
      display: "flex",
      flexDirection: "column" as const,
    },
    name: {
      fontSize: 17,
      fontWeight: 700,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    price: {
      fontSize: 14,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
  });
