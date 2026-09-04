import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    title: {
      margin: "0 0 20px",
      fontSize: 21,
      fontWeight: 400,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    chart: {
      marginBottom: 14,
    },
    legend: {
      gap: 14,
      display: "grid",
      padding: "0 6px",
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    legendItem: {
      gap: 4,
      display: "flex",
      alignItems: "center",
      flexDirection: "column" as const,
    },
    icon: {
      width: 30,
      height: 30,
      display: "block",
    },
    value: {
      fontSize: 14,
      fontWeight: 800,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    label: {
      fontSize: 12,
      fontWeight: 700,
      color: theme.colors.mutedLight,
      fontFamily: theme.fonts.body,
    },
  });
