import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    container: ({
      disabled,
      textColor,
    }: {
      disabled: boolean;
      textColor: string;
    }) => ({
      gap: 12,
      display: "flex",
      color: textColor,
      fontSize: 16,
      fontWeight: 500,
      alignItems: "center",
      fontFamily: theme.fonts.body,
      width: "fit-content",
      opacity: disabled ? 0.5 : 1,
      flexDirection: "row" as const,
      WebkitTapHighlightColor: "transparent",
      cursor: disabled ? "default" : "pointer",
    }),
    checkBox: ({ checked }: { checked: boolean }) => ({
      width: 28,
      height: 28,
      minWidth: 28,
      minHeight: 28,
      display: "flex",
      borderRadius: 9,
      alignItems: "center",
      boxSizing: "border-box" as const,
      justifyContent: "center",
      transition: "background .12s ease, border-color .12s ease",
      border: `3px solid ${checked ? theme.colors.green : theme.border.natural}`,
      backgroundColor: checked ? theme.colors.green : theme.colors.white,
    }),
  });
