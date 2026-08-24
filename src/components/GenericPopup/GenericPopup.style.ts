import { createStyles } from "../../create-styles";
import type { TAlignContent } from "./GenericPopup";
import { theme } from "../../constants/theme.constants";

interface IStyleParams {
  align: TAlignContent;
}

export const useStyles = ({ align }: IStyleParams) =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        borderRadius: `${theme.radius.cardLarge} !important`,
        boxShadow: theme.shadow.card,
        border: `2px solid ${theme.border.subtle}`,
        backgroundColor: theme.background.card,
      },
    },
    headerContainer: {
      py: 2,
      px: 3,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    title: {
      margin: 0,
      padding: 0,
      fontSize: 24,
      fontWeight: 400,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    closeButton: {
      width: 40,
      height: 40,
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
    divider: {
      borderColor: theme.border.subtle,
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      px: 3,
      py: 2,
      gap: 2,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      textAlign: align,
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
    signature: {
      border: "1px solid #ccc",
      borderRadius: 2,
      height: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
    },
    guidelines: {
      textAlign: align,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: 1.55,
    },
    actions: {
      px: 3,
      py: 2,
      gap: "12px",
      display: "flex",
      flexDirection: "row",
    },
    button: {
      flex: 1,
    },
  });
