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
    logoutButton: {
      width: "100%",
    },
    privacyNote: {
      gap: 6,
      display: "flex",
      fontSize: 13,
      alignItems: "center",
      justifyContent: "center",
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
    lockIcon: {
      width: 16,
      height: 16,
      display: "block",
    },
  });
