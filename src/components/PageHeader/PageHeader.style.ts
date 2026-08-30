import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      width: 46,
      height: 46,
      display: "block",
    },
    greeting: {
      gap: 10,
      display: "flex",
      alignItems: "center",
    },
    text: {
      textAlign: "left" as const,
    },
    name: {
      fontSize: 15,
      lineHeight: 1.2,
      fontWeight: 700,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    level: {
      fontSize: 13,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
  });
