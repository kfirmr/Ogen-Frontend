import type { FC } from "react";
import { useStyles } from "./ProgressBar.style";
import type { TProgressBarTone } from "./constants/progress-bar.constants";

interface IProgressBarProps {
  value: number;
  tone?: TProgressBarTone;
}

const ProgressBar: FC<IProgressBarProps> = ({ value, tone = "gold" }) => {
  const styles = useStyles();

  return (
    <div style={styles.track}>
      <div style={styles.fill({ value, tone })} />
    </div>
  );
};

export default ProgressBar;
