import {
  type TBankCredentialFieldType,
  BANK_CREDENTIAL_FIELD_DEFINITIONS,
} from "../../../../constants/bank-connection.constants";

import type {
  IBankCompany,
  TBankCredentials,
} from "../../../../interfaces/bank-connection.interface";

import type { FC } from "react";
import { IconButton } from "@mui/material";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";
import lockIcon from "../../../../assets/icons/lock.png";
import Button from "../../../../components/Button/Button";
import TextField from "../../../../components/TextField/TextField";

interface IBankLoginFormProps {
  onBack: () => void;
  canConnect: boolean;
  company: IBankCompany;
  isSubmitting: boolean;
  errorMessage: string | null;
  credentials: TBankCredentials;
  onConnect: () => Promise<void>;
  onChange: (field: TBankCredentialFieldType, value: string) => void;
}

// Each company's login format is checked by the connect button's pattern gate, so the field's own
// built-in validators (Hebrew-only text and so on) must not flag a valid English username.
const ACCEPT_ANY_INPUT = () => ({ isValid: true, errorText: "" });

const BankLoginForm: FC<IBankLoginFormProps> = ({
  onBack,
  company,
  onChange,
  onConnect,
  canConnect,
  credentials,
  isSubmitting,
  errorMessage,
}) => {
  const styles = useStyles();

  return (
    <Card sx={styles.card}>
      <div style={styles.loginHeader}>
        <IconButton onClick={onBack} aria-label="חזרה" sx={styles.backButton}>
          <span style={styles.backGlyph}>→</span>
        </IconButton>
        <span style={styles.loginHeaderMark}>{company.mark}</span>
        <span style={styles.loginTitle}>התחברות ל{company.name}</span>
      </div>

      {company.fields.map((field) => {
        const definition = BANK_CREDENTIAL_FIELD_DEFINITIONS[field];

        return (
          <TextField
            key={field}
            autoComplete="off"
            type={definition.type}
            title={definition.label}
            validator={ACCEPT_ANY_INPUT}
            value={credentials[field] ?? ""}
            maxLength={definition.maxLength}
            placeholder={definition.placeholder}
            onChange={(value) => onChange(field, value)}
            endAdornment={
              <img alt="" src={definition.icon} style={styles.fieldIcon} />
            }
            slotProps={{
              htmlInput: {
                inputMode: definition.isNumeric ? "numeric" : "text",
              },
            }}
          />
        );
      })}

      {errorMessage !== null && (
        <span style={styles.errorBox}>{errorMessage}</span>
      )}

      <Button
        text="חבר חשבון"
        onClick={onConnect}
        disabled={!canConnect}
        isLoading={isSubmitting}
        sx={styles.connectButton}
        variant={canConnect ? "primary" : "muted"}
      />

      <div style={styles.privacyNote}>
        <img alt="" src={lockIcon} style={styles.lockIcon} />
        הפרטים מוצפנים ומשמשים רק למשיכת העסקאות
      </div>
    </Card>
  );
};

export default BankLoginForm;
