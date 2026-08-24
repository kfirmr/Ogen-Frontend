import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

const MODAL_WIDTH = 380;

export const useStyles = () =>
  createStyles({
    root: {
      "& .MuiDialog-paper": {
        margin: "18px",
        width: "100%",
        maxWidth: MODAL_WIDTH,
        boxSizing: "border-box",
        padding: "24px 22px",
        borderRadius: theme.radius.card,
        backgroundColor: theme.background.card,
        border: `2px solid ${theme.border.subtle}`,
        boxShadow: `0 8px 0 ${theme.border.natural}, 0 24px 50px rgba(29,43,79,.3)`,
      },
    },
    header: {
      gap: 12,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    text: {
      gap: 6,
      display: "flex",
      flexDirection: "column" as const,
    },
    title: {
      fontSize: 24,
      lineHeight: 1.25,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 1.5,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    closeButton: {
      width: 38,
      height: 38,
      flex: "0 0 auto",
      color: theme.colors.ink,
      backgroundColor: theme.background.fill,
      "&:hover": {
        backgroundColor: theme.background.fillHover,
      },
    },
    closeGlyph: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1,
    },
    body: {
      margin: "22px 0 2px",
    },
    actions: {
      gap: 10,
      display: "flex",
      marginTop: 22,
    },
    primaryButton: {
      flex: 1,
    },
  });
