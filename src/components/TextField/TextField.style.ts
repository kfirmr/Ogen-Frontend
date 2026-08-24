import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

interface IStylesParams {
  disabled: boolean;
  helperTextColor: string;
}

export const useStyles = ({ disabled, helperTextColor }: IStylesParams) =>
  createStyles({
    textField: {
      "& .MuiOutlinedInput-root": {
        gap: "10px",
        paddingBlock: "4px",
        boxSizing: "border-box",
        paddingInlineEnd: "18px",
        paddingInlineStart: "8px",
        borderRadius: theme.radius.pill,
        border: `3px solid ${theme.border.faint}`,
        backgroundColor: disabled ? theme.background.fill : theme.colors.white,

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& input": {
          fontSize: 16,
          padding: "14px 12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          fontFamily: theme.fonts.body,
          color: disabled
            ? theme.text.textfield.disabled
            : theme.text.textfield.default,
        },

        "& input::placeholder": {
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          opacity: 1,
          color: theme.colors.mutedLight,
        },
      },
      "& .MuiFormHelperText-root": {
        color: helperTextColor,
        fontSize: 13,
        fontWeight: 600,
        fontStyle: "normal",
        lineHeight: "normal",
      },
    },
    fieldContainer: {
      width: "100%",
    },
    title: {
      fontSize: 15,
      fontWeight: 700,
      marginBottom: "8px",
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
    },
  });
