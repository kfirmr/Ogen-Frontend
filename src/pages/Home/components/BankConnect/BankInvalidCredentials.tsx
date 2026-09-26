import type { FC } from "react";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import type { IBankCompany } from "../../../../interfaces/bank-connection.interface";
import { BANK_CONNECT_MESSAGES } from "../../../../constants/bank-connection.constants";

interface IBankInvalidCredentialsProps {
  onRetry: () => void;
  company: IBankCompany;
  onPickAnother: () => void;
}

const BankInvalidCredentials: FC<IBankInvalidCredentialsProps> = ({
  company,
  onRetry,
  onPickAnother,
}) => {
  const styles = useStyles();

  return (
    <Card tone="warning" sx={styles.invalidCard}>
      <span style={styles.invalidBadge}>!</span>
      <span style={styles.resultTitle}>הפרטים לא התאימו</span>
      <span style={styles.description}>
        {BANK_CONNECT_MESSAGES.INVALID_CREDENTIALS(company)}
      </span>
      <div style={styles.resultActions}>
        <Button
          size="small"
          text="נסה שוב"
          variant="warning"
          onClick={onRetry}
          sx={styles.retryAction}
        />
        <Button
          size="small"
          text="חברה אחרת"
          onClick={onPickAnother}
          variant="warningOutline"
          sx={styles.pickAnotherAction}
        />
      </div>
    </Card>
  );
};

export default BankInvalidCredentials;
