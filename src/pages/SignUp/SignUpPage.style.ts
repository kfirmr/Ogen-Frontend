import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    logo: {
      gap: 4,
      display: "flex",
      alignItems: "center",
      margin: "10px 0 22px",
      flexDirection: "column" as const,
    },
    logoIcon: {
      width: 60,
      height: 60,
      display: "block",
    },
    logoText: {
      fontSize: 17,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    heading: {
      margin: "0 0 8px",
      fontSize: 31,
      textAlign: "center" as const,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    subtitle: {
      margin: "0 0 26px",
      fontSize: 16,
      textAlign: "center" as const,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    field: {
      marginBottom: 18,
    },
    inputIcon: {
      width: 34,
      height: 34,
      display: "block",
    },
    terms: {
      gap: 12,
      display: "flex",
      marginBottom: 26,
      alignItems: "flex-start",
    },
    termsText: {
      fontSize: 15,
      lineHeight: 1.5,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    termsLink: {
      fontWeight: 700,
      color: theme.colors.greenDark,
    },
    divider: {
      height: 2,
      margin: "26px 0 20px",
      backgroundColor: theme.border.faint,
    },
    footer: {
      fontSize: 15,
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
