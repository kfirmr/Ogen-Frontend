import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

const GRIDLINE_COUNT = 4;

export const useStyles = () =>
  createStyles({
    container: ({ height }: { height: number }) => ({
      height,
      position: "relative" as const,
    }),
    gridlines: {
      inset: 0,
      display: "flex",
      position: "absolute" as const,
      flexDirection: "column" as const,
      justifyContent: "space-between",
    },
    gridline: {
      borderTop: `2px dashed ${theme.border.faint}`,
    },
    bars: {
      gap: 14,
      height: "100%",
      display: "grid",
      position: "relative" as const,
      alignItems: "end",
      gridTemplateColumns: `repeat(${GRIDLINE_COUNT}, 1fr)`,
    },
    barColumn: {
      height: "100%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    bar: ({ ratio, color }: { ratio: number; color: string }) => ({
      width: "100%",
      maxWidth: 46,
      height: `${ratio * 100}%`,
      backgroundColor: color,
      borderRadius: "26px 26px 8px 8px",
      boxShadow: "inset 0 -6px 0 rgba(0,0,0,.08)",
    }),
  });
