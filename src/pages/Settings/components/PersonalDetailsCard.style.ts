import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    title: {
      fontSize: 21,
      marginBottom: 16,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    field: {
      marginBottom: 18,
    },
    icon: {
      width: 34,
      height: 34,
      display: "block",
    },
    saveButton: {
      width: "100%",
    },
  });
