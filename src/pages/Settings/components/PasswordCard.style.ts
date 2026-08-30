import { createStyles } from "../../../create-styles";
import { theme } from "../../../constants/theme.constants";
import { PASSWORD_MATCH_NOTE_COLORS } from "../constants/settings.constants";
import type { TPasswordMatchTone } from "../../../utilities/password.utility";

export const useStyles = () =>
  createStyles({
    title: {
      fontSize: 21,
      marginBottom: 16,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    field: {
      marginBottom: 18,
    },
    icon: {
      width: 34,
      height: 34,
      display: "block",
    },
    matchNote: ({ tone }: { tone: TPasswordMatchTone }) => ({
      margin: "0 0 16px",
      fontSize: 13.5,
      fontWeight: 700,
      color: PASSWORD_MATCH_NOTE_COLORS[tone],
      fontFamily: theme.fonts.body,
    }),
  });
