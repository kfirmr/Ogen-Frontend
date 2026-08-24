import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    card: {
      gap: 8,
      display: "flex",
      textAlign: "center" as const,
      alignItems: "center",
      flexDirection: "column" as const,
      border: `2px dashed ${theme.border.natural}`,
    },
    icon: {
      width: 62,
      height: 62,
      display: "block",
    },
    title: {
      fontSize: 21,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    description: {
      fontSize: 15,
      lineHeight: 1.5,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    button: {
      marginTop: 10,
    },
  });
