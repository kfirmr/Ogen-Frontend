import {
  type TButtonSize,
  BUTTON_SIZE_TOKENS,
  type TButtonVariant,
  FLAT_BUTTON_VARIANTS,
  BUTTON_VARIANT_TOKENS,
} from "./constants/button.constants";

import type { SystemStyleObject } from "@mui/system";
import { theme } from "../../constants/theme.constants";

export const useStyles = () => ({
  button: ({
    size,
    variant,
  }: {
    size: TButtonSize;
    variant: TButtonVariant;
  }): SystemStyleObject => {
    const tokens = BUTTON_VARIANT_TOKENS[variant];
    const sizeTokens = BUTTON_SIZE_TOKENS[size];
    const isFlat = FLAT_BUTTON_VARIANTS.includes(variant);

    return {
      position: "relative",
      textTransform: "none",
      fontWeight: 700,
      borderRadius: theme.radius.pill,
      fontFamily: theme.fonts.body,
      color: tokens.color,
      fontSize: sizeTokens.fontSize,
      padding: tokens.padding ?? sizeTokens.padding,
      background: tokens.background,
      border: tokens.border ?? "none",
      boxShadow: isFlat
        ? "none"
        : `0 ${sizeTokens.shadowOffset}px 0 ${tokens.shadowColor}`,
      transition:
        "transform .08s ease, box-shadow .08s ease, background .12s ease, color .12s ease, border-color .12s ease",
      "&:hover": {
        color: tokens.hoverColor ?? tokens.color,
        background: tokens.hoverBackground ?? tokens.background,
        border: tokens.hoverBorder ?? tokens.border ?? "none",
      },
      "&:active": isFlat
        ? {}
        : {
            transform: `translateY(${sizeTokens.shadowOffset}px)`,
            boxShadow: `0 0 0 ${tokens.shadowColor}`,
          },
      "&.Mui-disabled": {
        cursor: "not-allowed",
        color: tokens.disabledColor,
        background: tokens.disabledBackground,
        border: tokens.disabledBorder ?? tokens.border ?? "none",
        boxShadow: isFlat
          ? "none"
          : `0 ${sizeTokens.shadowOffset}px 0 ${tokens.disabledShadowColor}`,
      },
    };
  },
});
