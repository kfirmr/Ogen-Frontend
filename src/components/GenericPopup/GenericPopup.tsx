import {
  Box,
  Dialog,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Button from "../Button/Button";
import { useStyles } from "./GenericPopup.style";
import UltraSignature from "../UltraSignature/UltraSignature";
import type { TPopUpIcons } from "./constants/icons.constants";
import { renderPopupIcon } from "./utilities/renderIcon.utility";
import { type FC, type MouseEvent, type ReactNode, useState } from "react";

export type TAlignContent = "left" | "center" | "right";

export interface IPopupButton {
  text: string;
  isDisabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export interface IGenericPopupProps {
  open: boolean;
  title: string;
  guidelines?: string;
  signature?: boolean;
  content?: ReactNode;
  onClose?: () => void;
  align?: TAlignContent;
  icon?: TPopUpIcons | ReactNode;
  buttons: {
    primary: IPopupButton;
    secondary?: Partial<IPopupButton>;
  };
}

const GenericPopup: FC<IGenericPopupProps> = ({
  open,
  icon,
  title,
  onClose,
  buttons,
  content,
  signature,
  guidelines,
  align = "left",
}) => {
  const styles = useStyles({ align });

  const [isSigned, setIsSigned] = useState(false);
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false);
  const [secondaryButtonLoading, setSecondaryButtonLoading] = useState(false);

  const needToSign = Boolean(signature) && !isSigned;

  const handlePrimaryButtonClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      setPrimaryButtonLoading(true);
      await buttons.primary.onClick(event);
    } finally {
      setPrimaryButtonLoading(false);
      onClose?.();
    }
  };

  const handleSecondaryButtonClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      setSecondaryButtonLoading(true);
      await buttons?.secondary?.onClick?.(event);
    } finally {
      setSecondaryButtonLoading(false);
      onClose?.();
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      sx={styles.root}
      onClose={onClose}
    >
      <Box sx={styles.headerContainer}>
        <DialogTitle sx={styles.title}>{title ?? ""}</DialogTitle>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <Box component="span" sx={styles.closeGlyph}>
            ×
          </Box>
        </IconButton>
      </Box>
      <Divider sx={styles.divider} />
      <DialogContent sx={styles.contentContainer}>
        {icon && (
          <Box sx={styles.iconContainer}>{renderPopupIcon(icon) ?? null}</Box>
        )}

        {content && <Box sx={styles.content}>{content}</Box>}

        {signature && (
          <UltraSignature isSigned={isSigned} setIsSigned={setIsSigned} />
        )}

        {guidelines && (
          <Typography sx={styles.guidelines}>{guidelines}</Typography>
        )}
      </DialogContent>
      <DialogActions sx={styles.actions}>
        {buttons.secondary && (
          <Button
            sx={styles.button}
            variant="secondary"
            isLoading={secondaryButtonLoading}
            onClick={handleSecondaryButtonClick}
            disabled={buttons.secondary?.isDisabled}
            text={buttons.secondary?.text ?? "ביטול"}
          />
        )}
        <Button
          variant="primary"
          sx={styles.button}
          text={buttons.primary.text}
          isLoading={primaryButtonLoading}
          onClick={handlePrimaryButtonClick}
          disabled={buttons.primary.isDisabled || needToSign}
        />
      </DialogActions>
    </Dialog>
  );
};

export default GenericPopup;
