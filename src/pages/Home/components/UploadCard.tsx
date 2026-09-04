import { IconButton } from "@mui/material";
import { useStyles } from "./UploadCard.style";
import Card from "../../../components/Card/Card";
import lockIcon from "../../../assets/icons/lock.png";
import Button from "../../../components/Button/Button";
import { useQueryClient } from "@tanstack/react-query";
import uploadIcon from "../../../assets/icons/upload.png";
import fileCsvIcon from "../../../assets/icons/file_csv.png";
import { formatFileSize } from "../../../utilities/file.utility";
import { useRef, useState, type FC, type ChangeEvent } from "react";
import { USER_PROGRESS_QUERY_KEY } from "../../../constants/level.constants";
import { uploadStatementAction } from "../../../actions/statement-import.actions";
import { TRANSACTIONS_QUERY_KEY } from "../../../constants/transaction.constants";
import { SUBSCRIPTIONS_QUERY_KEY } from "../../../constants/subscription.constants";

interface IUploadCardProps {
  onOpenGuide: () => void;
  onImportedMonth?: (monthKey: string) => void;
}

const UploadCard: FC<IUploadCardProps> = ({ onOpenGuide, onImportedMonth }) => {
  const styles = useStyles();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
    setUploadError(null);
    setImportedCount(null);
  };

  const handleClearFile = () => {
    setFile(null);
    setUploadError(null);
    setImportedCount(null);
  };

  const handleUpload = async () => {
    if (file === null) {
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const result = await uploadStatementAction(file);

    setIsUploading(false);

    if (result.errorMessage != null) {
      setUploadError(result.errorMessage);
      return;
    }

    setImportedCount(result.statementImport?.transactionCount ?? 0);
    queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: SUBSCRIPTIONS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: USER_PROGRESS_QUERY_KEY });

    if (result.latestTransactionMonthKey != null) {
      onImportedMonth?.(result.latestTransactionMonthKey);
    }
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

        {importedCount != null ? (
          <span style={styles.successMessage}>
            הקובץ נסרק בהצלחה, יובאו {importedCount} תנועות חדשות
          </span>
        ) : (
          <Button
            onClick={handleUpload}
            isLoading={isUploading}
            sx={styles.uploadButton}
            text="העלה וסרוק את הקובץ"
          />
        )}

        {uploadError != null && (
          <span style={styles.errorMessage}>{uploadError}</span>
        )}

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
      <span style={styles.description}>
        גרור לכאן קובץ Excel (xlsx) או לחץ לבחירה
      </span>

      <div style={styles.button}>
        <Button
          size="small"
          variant="secondary"
          text="בחר קובץ .xlsx"
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
        accept=".xlsx"
        ref={fileInputRef}
        style={styles.hiddenInput}
        onChange={handleFileSelected}
      />
    </Card>
  );
};

export default UploadCard;
