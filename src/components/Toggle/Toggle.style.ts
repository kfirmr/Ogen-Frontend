import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

const TRACK_PADDING = 4;

export const useStyles = () =>
  createStyles({
    root: {
      width: "90%",
      height: "56px",
      display: "flex",
      padding: TRACK_PADDING,
      position: "relative",
      boxSizing: "border-box" as const,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.background.fill,
    },
    slider: (value: boolean = true) => ({
      top: TRACK_PADDING,
      bottom: TRACK_PADDING,
      width: `calc(50% - ${TRACK_PADDING}px)`,
      position: "absolute",
      left: value ? "50%" : `${TRACK_PADDING}px`,
      transition: "left 0.25s ease",
      backgroundColor: theme.colors.green,
      boxShadow: `0 3px 0 ${theme.colors.greenDark}`,
      borderRadius: theme.radius.pill,
    }),
    button: (value: boolean = false) => ({
      flex: 1,
      zIndex: 1,
      width: "50%",
      fontSize: 16,
      fontWeight: 700,
      whiteSpace: "normal",
      wordWrap: "break-word",
      fontFamily: theme.fonts.body,
      transition: "color 0.2s ease",
      color: value ? theme.colors.white : theme.colors.ink,
    }),
  });
