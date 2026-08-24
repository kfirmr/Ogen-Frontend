import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";
import { type TCardTone, CARD_TONE_STYLES } from "./constants/card.constants";

export const useStyles = () =>
  createStyles({
    card: ({ tone }: { tone: TCardTone }) => ({
      padding: 28,
      boxSizing: "border-box" as const,
      borderRadius: theme.radius.card,
      fontFamily: theme.fonts.body,
      ...CARD_TONE_STYLES[tone],
    }),
  });
