import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    header: {
      display: "flex",
      marginBottom: 14,
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 19,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    xp: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.colors.goldDark,
      fontFamily: theme.fonts.body,
    },
    caption: {
      margin: "12px 0 0",
      fontSize: 14,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
  });
