import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    row: {
      gap: 10,
      display: "flex",
      overflowX: "auto" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "4px 2px 8px",
      flexDirection: "row-reverse" as const,
    },
    coin: ({ isActive }: { isActive: boolean }) => ({
      gap: 2,
      width: 46,
      height: 46,
      border: "none",
      flex: "0 0 auto",
      display: "flex",
      cursor: "pointer",
      lineHeight: 1,
      fontSize: 13,
      fontWeight: 900,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radius.pill,
      fontFamily: theme.fonts.body,
      flexDirection: "column" as const,
      transition: "all .14s ease",
      color: isActive ? theme.colors.ink : theme.colors.muted,
      background: isActive ? theme.colors.gold : theme.background.fill,
      boxShadow: `0 4px 0 ${isActive ? theme.colors.goldDark : theme.shadow.default}`,
    }),
    year: ({ isActive }: { isActive: boolean }) => ({
      fontSize: 9.5,
      lineHeight: 1,
      fontWeight: 800,
      letterSpacing: ".4px",
      color: isActive ? theme.colors.ink : theme.colors.mutedLight,
    }),
  });
