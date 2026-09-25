import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

interface IStylesParams {
  disabled: boolean;
  multiline: boolean;
  helperTextColor: string;
}

const getFieldBackground = ({ disabled, multiline }: IStylesParams) => {
  if (disabled) {
    return theme.background.fill;
  }

  return multiline ? theme.background.inputFill : theme.colors.white;
};

export const useStyles = (params: IStylesParams) =>
  createStyles({
    textField: {
      "& .MuiOutlinedInput-root": {
        gap: "10px",
        paddingBlock: "4px",
        boxSizing: "border-box",
        paddingInlineEnd: "18px",
        paddingInlineStart: "8px",
        border: `3px solid ${theme.border.faint}`,
        backgroundColor: getFieldBackground(params),
        borderRadius: params.multiline
          ? theme.radius.multilineInput
          : theme.radius.pill,

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
          color: params.disabled
            ? theme.text.textfield.disabled
            : theme.text.textfield.default,
        },

        "& textarea": {
          fontSize: 14.5,
          lineHeight: 1.6,
          padding: "10px 8px",
          fontFamily: theme.fonts.body,
          color: theme.text.textfield.default,
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
        color: params.helperTextColor,
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
