import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    shell: {
      gap: 18,
      display: "flex",
      padding: "26px 20px 26px",
      flexDirection: "column" as const,
    },
    monthlyBand: {
      gap: 18,
      display: "flex",
      marginTop: 4,
      padding: "16px 14px 20px",
      boxSizing: "border-box" as const,
      flexDirection: "column" as const,
      borderRadius: theme.radius.section,
      backgroundColor: theme.background.fill,
      border: `2px solid ${theme.border.faint}`,
    },
  });
