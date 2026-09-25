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
      fontWeight: 400,
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
  });
