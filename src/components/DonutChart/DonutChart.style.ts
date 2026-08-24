import { createStyles } from "../../create-styles";

export const useStyles = () =>
  createStyles({
    container: ({ size }: { size: number }) => ({
      width: size,
      height: size,
      position: "relative" as const,
    }),
    svg: {
      width: "100%",
      height: "100%",
      display: "block",
      overflow: "visible" as const,
    },
    center: {
      inset: 0,
      gap: 3,
      display: "flex",
      alignItems: "center",
      position: "absolute" as const,
      justifyContent: "center",
      flexDirection: "column" as const,
    },
  });
