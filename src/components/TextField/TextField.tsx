import {
  Typography,
  type TextFieldProps,
  TextField as MuiTextField,
} from "@mui/material";

import {
  type TFieldType,
  KEYBOARD_TYPE_MAP,
} from "./constants/textfield.constants";

import { useStyles } from "./TextField.style";
import CharCounterAdornment from "./CharCounter";
import { safeAssign } from "../../utilities/object.utility";
import { getHelperText } from "../../utilities/textfield.utility";
import { validateInput } from "../../utilities/validation.utility";
import { type ChangeEvent, type FC, useState, useEffect } from "react";
import { type IValidationResult } from "../../interfaces/validation-result.interface";

export type TTextfieldProps = Omit<TextFieldProps, "onChange"> & {
  value: string;
  title?: string;
  type: TFieldType;
  infoText?: string;
  readonly?: boolean;
  maxLength?: number;
  warningText?: string;
  showCharCounter?: boolean;
  endAdornment?: React.ReactNode;
  setIsValid?: (isValid: boolean) => void;
  validator?: (value: string) => IValidationResult;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
};

const TextField: FC<TTextfieldProps> = ({
  type,
  value,
  style,
  title,
  infoText,
  readonly,
  onChange,
  maxLength,
  validator,
  setIsValid,
  warningText,
  endAdornment,
  placeholder = "",
  disabled = false,
  showCharCounter = false,
  ...rest
}) => {
  const ALLOWED_FIELD_TYPES: readonly TFieldType[] = [
    "phone",
    "number",
    "tz",
    "name",
    "text",
    "email",
    "password",
  ] as const;

  if (!ALLOWED_FIELD_TYPES.includes(type)) {
    throw new Error(`Invalid field type: ${type}`);
  }
  const inputType = KEYBOARD_TYPE_MAP[type];
  const [internalValue, setInternalValue] = useState(value);
  const { isValid, errorText } = validateInput(value, type, validator);
  const helperText = getHelperText({ errorText, warningText, infoText });

  const styles = useStyles({ disabled, helperTextColor: helperText.color });

  const props = safeAssign(rest, {
    slotProps: {
      htmlInput: {
        maxLength,
      },
      input: {
        endAdornment: showCharCounter ? (
          <CharCounterAdornment input={internalValue} maxLength={maxLength} />
        ) : (
          endAdornment
        ),
      },
    },
  });

  useEffect(() => {
    setIsValid?.(isValid);
  }, [isValid]);

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (readonly || disabled) {
      return;
    }
    setInternalValue(e.target.value);

    if (onChange) {
      onChange(e.target.value, e);
    }
  };

  return (
    <div style={styles.fieldContainer}>
      {title && <Typography sx={styles.title}>{title}</Typography>}

      <MuiTextField
        {...props}
        fullWidth
        style={style}
        type={inputType}
        variant="outlined"
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        value={internalValue ?? ""}
        helperText={helperText.text}
        sx={{
          ...rest.sx,
          ...styles.textField,
        }}
      />
    </div>
  );
};

export default TextField;
