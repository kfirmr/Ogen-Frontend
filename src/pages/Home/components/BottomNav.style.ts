import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    nav: {
      gap: 4,
      display: "flex",
      margin: "0 auto",
      alignItems: "center",
      padding: "8px",
      width: "fit-content",
      backgroundColor: theme.background.card,
      border: `2px solid ${theme.border.subtle}`,
      boxShadow: `0 4px 0 ${theme.shadow.default}`,
      borderRadius: theme.radius.pill,
    },
    tab: {
      padding: "10px 16px",
      color: theme.colors.mutedLight,
      "&:hover": {
        color: theme.colors.ink,
        background: "transparent",
      },
    },
  });
