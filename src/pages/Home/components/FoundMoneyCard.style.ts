import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    header: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    month: {
      fontSize: 13,
      fontWeight: 700,
      color: theme.colors.greenDark,
      fontFamily: theme.fonts.body,
    },
    total: {
      fontSize: 40,
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: "-1px",
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    totalLabel: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "1px",
      color: theme.colors.greenDark,
      fontFamily: theme.fonts.body,
    },
    legend: {
      gap: 9,
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
    },
    legendRow: {
      gap: 10,
      display: "flex",
      fontSize: 14,
      alignItems: "center",
      fontFamily: theme.fonts.body,
    },
    legendDot: ({ color }: { color: string }) => ({
      width: 14,
      height: 14,
      flex: "0 0 auto",
      backgroundColor: color,
      borderRadius: theme.radius.pill,
    }),
    legendLabel: {
      flex: 1,
      fontWeight: 700,
      color: theme.colors.ink,
    },
    legendValue: {
      fontWeight: 800,
      color: theme.colors.ink,
    },
  });
