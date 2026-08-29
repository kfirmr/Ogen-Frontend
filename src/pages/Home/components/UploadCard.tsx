import { IconButton } from "@mui/material";
import { useStyles } from "./UploadCard.style";
import Card from "../../../components/Card/Card";
import lockIcon from "../../../assets/icons/lock.png";
import Button from "../../../components/Button/Button";
import uploadIcon from "../../../assets/icons/upload.png";
import fileCsvIcon from "../../../assets/icons/file_csv.png";
import { formatFileSize } from "../../../utilities/file.utility";
import { useRef, useState, type FC, type ChangeEvent } from "react";

interface IUploadCardProps {
  onOpenGuide: () => void;
}

const UploadCard: FC<IUploadCardProps> = ({ onOpenGuide }) => {
  const styles = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const handleClearFile = () => {
    setFile(null);
  };

  if (file) {
    return (
      <Card tone="success" sx={styles.uploadedCard}>
        <span style={styles.title}>העלאת נתונים</span>

        <div style={styles.filePreview}>
          <img alt="" src={fileCsvIcon} style={styles.fileIcon} />
          <div style={styles.fileText}>
            <span style={styles.fileName}>{file.name}</span>
            <span style={styles.fileMeta}>{formatFileSize(file.size)}</span>
          </div>
          <IconButton
            aria-label="הסר קובץ"
            sx={styles.removeButton}
            onClick={handleClearFile}
          >
            <span style={styles.removeGlyph}>✕</span>
          </IconButton>
        </div>

        <Button
          onClick={() => {}}
          sx={styles.uploadButton}
          text="העלה וסרוק את הקובץ"
        />

        <div style={styles.privacyNote}>
          <img alt="" src={lockIcon} style={styles.lockIcon} />
          הנתונים נשארים במכשיר שלך
        </div>
      </Card>
    );
  }

  return (
    <Card sx={styles.card}>
      <img alt="" src={uploadIcon} style={styles.icon} />
      <span style={styles.title}>העלאת נתונים</span>
      <span style={styles.description}>גרור לכאן קובץ CSV או לחץ לבחירה</span>

      <div style={styles.button}>
        <Button
          size="small"
          variant="secondary"
          text="בחר קובץ .csv"
          onClick={handleChooseFile}
        />
      </div>

      <Button
        size="small"
        variant="text"
        onClick={onOpenGuide}
        text="איך מורידים את הקובץ מאתר האשראי?"
      />

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={styles.hiddenInput}
        onChange={handleFileSelected}
      />
    </Card>
  );
};

export default UploadCard;
