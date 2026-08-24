import { theme } from "../../../constants/theme.constants";

export type TButtonVariant =
  "primary" | "secondary" | "warning" | "gold" | "ghost" | "text";
export type TButtonSize = "medium" | "small";
export type TMuiVariant = "text" | "outlined" | "contained";

export interface IButtonVariantTokens {
  color: string;
  border?: string;
  padding?: string;
  background: string;
  shadowColor: string;
  hoverColor?: string;
  hoverBorder?: string;
  disabledColor: string;
  disabledBorder?: string;
  hoverBackground?: string;
  disabledBackground: string;
  disabledShadowColor: string;
}

export interface IButtonSizeTokens {
  padding: string;
  fontSize: number;
  shadowOffset: number;
}

export const MUI_VARIANT_BY_BUTTON_VARIANT: Record<
  TButtonVariant,
  TMuiVariant
> = {
  ghost: "text",
  text: "text",
  gold: "contained",
  primary: "contained",
  warning: "contained",
  secondary: "outlined",
};

export const FLAT_BUTTON_VARIANTS: readonly TButtonVariant[] = [
  "ghost",
  "text",
];

export const BUTTON_VARIANT_TOKENS: Record<
  TButtonVariant,
  IButtonVariantTokens
> = {
  primary: {
    color: theme.colors.white,
    background: theme.colors.green,
    shadowColor: theme.colors.greenDark,
    hoverBackground: theme.colors.greenLight,
    disabledColor: theme.colors.white,
    disabledBackground: theme.colors.greenDisabled,
    disabledShadowColor: theme.colors.greenDisabledShadow,
  },
  secondary: {
    color: theme.colors.ink,
    background: theme.colors.white,
    border: `3px solid ${theme.border.natural}`,
    shadowColor: theme.border.natural,
    hoverColor: theme.colors.greenDark,
    hoverBorder: `3px solid ${theme.colors.green}`,
    hoverBackground: theme.colors.white,
    disabledColor: theme.colors.mutedLight,
    disabledBorder: `3px solid ${theme.border.subtle}`,
    disabledBackground: theme.colors.white,
    disabledShadowColor: theme.border.subtle,
  },
  warning: {
    color: theme.colors.white,
    background: theme.colors.orange,
    shadowColor: theme.colors.orangeDark,
    hoverBackground: theme.colors.orangeLight,
    disabledColor: theme.colors.white,
    disabledBackground: theme.colors.orange,
    disabledShadowColor: theme.colors.orangeDark,
  },
  gold: {
    color: theme.colors.ink,
    background: theme.colors.gold,
    shadowColor: theme.colors.goldDark,
    disabledColor: theme.colors.ink,
    disabledBackground: theme.colors.gold,
    disabledShadowColor: theme.colors.goldDark,
  },
  ghost: {
    color: theme.colors.ink,
    background: theme.background.fill,
    shadowColor: "transparent",
    hoverBackground: theme.background.fillHover,
    disabledColor: theme.colors.mutedLight,
    disabledBackground: theme.background.fill,
    disabledShadowColor: "transparent",
  },
  text: {
    color: theme.colors.greenDark,
    background: "transparent",
    shadowColor: "transparent",
    padding: "6px 2px",
    hoverColor: theme.colors.greenDarker,
    hoverBackground: "transparent",
    disabledColor: theme.colors.mutedLight,
    disabledBackground: "transparent",
    disabledShadowColor: "transparent",
  },
};

export const BUTTON_SIZE_TOKENS: Record<TButtonSize, IButtonSizeTokens> = {
  medium: { fontSize: 18, shadowOffset: 6, padding: "17px 44px" },
  small: { fontSize: 15, shadowOffset: 4, padding: "12px 28px" },
};
