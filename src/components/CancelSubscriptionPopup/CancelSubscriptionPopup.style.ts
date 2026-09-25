import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    fields: {
      gap: 12,
      display: "flex",
      flexDirection: "column" as const,
    },
    yearlyCost: {
      fontSize: 13,
      fontWeight: 800,
      whiteSpace: "nowrap" as const,
      color: theme.colors.orangeDark,
      fontFamily: theme.fonts.body,
    },
    mailIcon: {
      width: 32,
      height: 32,
      display: "block",
    },
  });
