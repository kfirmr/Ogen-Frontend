import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    logo: {
      gap: 6,
      display: "flex",
      alignItems: "center",
      margin: "14px 0 26px",
      flexDirection: "column" as const,
    },
    logoIcon: {
      width: 76,
      height: 76,
      display: "block",
    },
    logoText: {
      fontSize: 19,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    heading: {
      margin: "0 0 8px",
      fontSize: 31,
      lineHeight: 1.25,
      fontWeight: 400,
      textAlign: "center" as const,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    subtitle: {
      margin: "0 0 28px",
      fontSize: 16,
      textAlign: "center" as const,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    field: {
      marginBottom: 20,
    },
    inputIcon: {
      width: 34,
      height: 34,
      display: "block",
    },
    row: {
      display: "flex",
      alignItems: "center",
      marginBottom: 26,
      justifyContent: "space-between",
    },
    footer: {
      fontSize: 15,
      marginTop: 26,
      textAlign: "center" as const,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    error: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 16,
      textAlign: "center" as const,
      color: theme.colors.error,
      fontFamily: theme.fonts.body,
    },
    footerLink: {
      textDecoration: "none",
      color: theme.colors.greenDark,
      fontWeight: 700,
    },
  });
