import {
  type TButtonSize,
  type TButtonVariant,
  MUI_VARIANT_BY_BUTTON_VARIANT,
} from "./constants/button.constants";

import { useStyles } from "./Button.style";
import { Button as MuiButton } from "@mui/material";
import { type CSSProperties, type FC, type MouseEvent } from "react";

interface IButtonProps {
  text: string;
  sx?: CSSProperties;
  disabled?: boolean;
  size?: TButtonSize;
  isLoading?: boolean;
  variant?: TButtonVariant;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

const Button: FC<IButtonProps> = ({
  sx,
  text,
  onClick,
  disabled,
  size = "medium",
  isLoading = false,
  variant = "primary",
}) => {
  const styles = useStyles();

  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={MUI_VARIANT_BY_BUTTON_VARIANT[variant]}
      sx={{ ...styles.button({ size, variant }), ...sx }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
