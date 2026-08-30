import { theme } from "../../../constants/theme.constants";
import type { TPasswordMatchTone } from "../../../utilities/password.utility";

export const PASSWORD_MATCH_NOTE_COLORS: Record<TPasswordMatchTone, string> = {
  neutral: theme.colors.mutedLight,
  success: theme.colors.greenDark,
  error: theme.colors.orangeDark,
};
