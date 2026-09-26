import type { FC } from "react";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import { BANK_CONNECTED_XP_LABEL } from "../../../../constants/bank-connection.constants";

interface IBankConnectedProps {
  companyName: string;
  onConnectAnother: () => void;
}

const BankConnected: FC<IBankConnectedProps> = ({
  companyName,
  onConnectAnother,
}) => {
  const styles = useStyles();

  return (
    <Card sx={styles.connectedCard}>
      <span style={styles.connectedBadge}>✓</span>
      <span style={styles.resultTitle}>{companyName} מחובר!</span>
      <span style={styles.description}>
        העסקאות יתעדכנו כל יום אוטומטית — בלי קבצים.
      </span>
      <span style={styles.xpNote}>
        קיבלת <bdi>{BANK_CONNECTED_XP_LABEL}</bdi> על החיבור
      </span>
      <Button
        size="small"
        variant="secondary"
        text="חבר חשבון נוסף"
        onClick={onConnectAnother}
        sx={styles.connectAnotherButton}
      />
    </Card>
  );
};

export default BankConnected;
