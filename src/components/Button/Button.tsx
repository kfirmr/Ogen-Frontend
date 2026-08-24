import {
  type TButtonSize,
  type TButtonVariant,
  MUI_VARIANT_BY_BUTTON_VARIANT,
} from "./constants/button.constants";

import { Lottie } from "lottie-react";
import { useStyles } from "./Button.style";
import { Button as MuiButton } from "@mui/material";
import loadingAnimation from "../../lottie/Smartbase-Loading.json";
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
  const showOverlay = disabled || isLoading;

  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled || isLoading}
      variant={MUI_VARIANT_BY_BUTTON_VARIANT[variant]}
      sx={{
        ...styles.button({ size, isLoading, showOverlay, variant }),
        ...sx,
      }}
    >
      {isLoading ? (
        <>
          <span style={styles.text}>{text}</span>
          <div style={styles.loadingAnimation}>
            <Lottie loop autoplay src={loadingAnimation} />
          </div>
        </>
      ) : (
        text
      )}
    </MuiButton>
  );
};

export default Button;
