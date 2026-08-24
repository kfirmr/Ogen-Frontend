import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    page: {
      display: "flex",
      minHeight: "100vh",
      padding: "40px 16px",
      alignItems: "flex-start",
      justifyContent: "center",
      boxSizing: "border-box" as const,
      fontFamily: theme.fonts.body,
      backgroundColor: theme.border.subtle,
    },
    shell: {
      width: 390,
      maxWidth: "100%",
      display: "flex",
      padding: "30px 24px 34px",
      flexDirection: "column" as const,
      boxSizing: "border-box" as const,
      borderRadius: 44,
      backgroundColor: theme.background.page,
      boxShadow: `0 8px 0 ${theme.border.natural}, 0 26px 50px rgba(29,43,79,.1)`,
    },
  });
