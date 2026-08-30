import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    track: {
      gap: 4,
      display: "flex",
      alignItems: "stretch",
      padding: 4,
      marginTop: -4,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.tabBar.track,
    },
    tab: ({ isActive }: { isActive: boolean }) => ({
      flex: "1 1 0",
      minWidth: 0,
      border: "none",
      lineHeight: 1,
      fontSize: 14,
      fontWeight: 800,
      cursor: "pointer",
      boxSizing: "border-box" as const,
      padding: "11px 6px",
      whiteSpace: "nowrap" as const,
      borderRadius: theme.radius.pill,
      fontFamily: theme.fonts.body,
      transition: "all .14s ease",
      color: isActive ? theme.colors.ink : theme.tabBar.inactiveText,
      backgroundColor: isActive ? theme.colors.white : "transparent",
      boxShadow: isActive ? `0 3px 0 ${theme.border.natural}` : "none",
    }),
  });
