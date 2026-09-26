import type { FC } from "react";
import { Box } from "@mui/material";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";

interface IBankValidatingProps {
  isSlow: boolean;
  companyName: string;
  elapsedLabel: string;
}

const BankValidating: FC<IBankValidatingProps> = ({
  isSlow,
  companyName,
  elapsedLabel,
}) => {
  const styles = useStyles();

  return (
    <Card sx={styles.centeredCard}>
      <Box role="progressbar" aria-label="מאמתים" sx={styles.spinner} />
      <span style={styles.validatingTitle}>מאמתים מול {companyName}…</span>
      <span style={styles.description}>
        החיבור בתור ויאומת תוך כדקה. אפשר להמשיך להשתמש באפליקציה בינתיים.
      </span>
      <span style={styles.elapsedPill}>{elapsedLabel}</span>

      {isSlow && (
        <span style={styles.slowNote}>
          לוקח קצת יותר מהרגיל — נעדכן אותך כשזה מוכן
        </span>
      )}
    </Card>
  );
};

export default BankValidating;
