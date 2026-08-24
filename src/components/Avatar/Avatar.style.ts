import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    avatar: ({ size }: { size: number }) => ({
      width: size,
      height: size,
      display: "flex",
      flex: "0 0 auto",
      fontWeight: 900,
      color: theme.colors.ink,
      alignItems: "center",
      fontSize: size * 0.39,
      justifyContent: "center",
      fontFamily: theme.fonts.body,
      backgroundColor: theme.colors.gold,
      borderRadius: theme.radius.pill,
      boxShadow: `0 4px 0 ${theme.colors.goldDark}`,
    }),
  });
