import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import type { FC, ReactNode } from "react";
import { useStyles } from "./GuideModal.style";
import { Dialog, IconButton } from "@mui/material";

interface IGuideModalAction {
  text: string;
  onClick: () => void | Promise<void>;
}

interface IGuideModalProps {
  open: boolean;
  title: string;
  eyebrow: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
  primaryButton: IGuideModalAction;
  secondaryButton?: IGuideModalAction;
}

const GuideModal: FC<IGuideModalProps> = ({
  open,
  title,
  eyebrow,
  onClose,
  subtitle,
  children,
  primaryButton,
  secondaryButton,
}) => {
  const styles = useStyles();

  return (
    <Dialog open={open} sx={styles.root} onClose={onClose}>
      <div style={styles.header}>
        <div style={styles.text}>
          <Badge text={eyebrow} />
          <span style={styles.title}>{title}</span>
          <span style={styles.subtitle}>{subtitle}</span>
        </div>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <span style={styles.closeGlyph}>×</span>
        </IconButton>
      </div>

      <div style={styles.body}>{children}</div>

      <div style={styles.actions}>
        <Button
          text={primaryButton.text}
          sx={styles.primaryButton}
          onClick={primaryButton.onClick}
        />
        {secondaryButton && (
          <Button
            size="small"
            variant="secondary"
            text={secondaryButton.text}
            onClick={secondaryButton.onClick}
          />
        )}
      </div>
    </Dialog>
  );
};

export default GuideModal;
