import { createStyles } from "../../create-styles";

export const useStyles = () =>
  createStyles({
    shell: {
      gap: 18,
      display: "flex",
      padding: "26px 20px 26px",
      flexDirection: "column" as const,
    },
  });
