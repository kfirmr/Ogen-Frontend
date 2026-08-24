import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./SaverLevelCard.style";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

interface ISaverLevelCardProps {
  title: string;
  xpLabel: string;
  caption: string;
  progress: number;
}

const SaverLevelCard: FC<ISaverLevelCardProps> = ({
  title,
  xpLabel,
  caption,
  progress,
}) => {
  const styles = useStyles();

  return (
    <Card>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        <span style={styles.xp}>{xpLabel}</span>
      </div>
      <ProgressBar value={progress} />
      <p style={styles.caption}>{caption}</p>
    </Card>
  );
};

export default SaverLevelCard;
