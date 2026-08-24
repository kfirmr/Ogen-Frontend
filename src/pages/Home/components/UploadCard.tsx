import type { FC } from "react";
import { useStyles } from "./UploadCard.style";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import uploadIcon from "../../../assets/icons/upload.png";

interface IUploadCardProps {
  onOpenGuide: () => void;
}

const UploadCard: FC<IUploadCardProps> = ({ onOpenGuide }) => {
  const styles = useStyles();

  return (
    <Card sx={styles.card}>
      <img alt="" src={uploadIcon} style={styles.icon} />
      <span style={styles.title}>העלאת נתונים</span>
      <span style={styles.description}>גרור לכאן קובץ CSV או לחץ לבחירה</span>

      <div style={styles.button}>
        <Button
          size="small"
          onClick={() => {}}
          variant="secondary"
          text="בחר קובץ .csv"
        />
      </div>

      <Button
        size="small"
        variant="text"
        onClick={onOpenGuide}
        text="איך מורידים את הקובץ מאתר האשראי?"
      />
    </Card>
  );
};

export default UploadCard;
