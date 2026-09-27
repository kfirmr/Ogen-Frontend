import {
  BANK_CONNECTED_XP_LABEL,
  CONNECTED_ACCOUNT_LABELS,
} from "../../../../constants/bank-connection.constants";

import { useState, type FC } from "react";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import type { IConnectedAccountView } from "../../../../interfaces/bank-connection.interface";

interface IBankConnectedProps {
  isJustConnected: boolean;
  isDisconnecting: boolean;
  account: IConnectedAccountView;
  disconnectError: string | null;
  onDisconnect: () => Promise<void>;
  onClearDisconnectError: () => void;
}

const BankConnected: FC<IBankConnectedProps> = ({
  account,
  onDisconnect,
  isJustConnected,
  isDisconnecting,
  disconnectError,
  onClearDisconnectError,
}) => {
  const styles = useStyles();
  const [isConfirmingDisconnect, setIsConfirmingDisconnect] = useState(false);

  const confirmLabel = isDisconnecting
    ? CONNECTED_ACCOUNT_LABELS.DISCONNECTING
    : CONNECTED_ACCOUNT_LABELS.CONFIRM_DISCONNECT;
  const showsJustConnectedNote = isJustConnected && !isConfirmingDisconnect;

  const cancelDisconnect = () => {
    onClearDisconnectError();
    setIsConfirmingDisconnect(false);
  };

  return (
    <Card sx={styles.accountCard}>
      <div style={styles.accountHeader}>
        <span style={styles.accountMark}>{account.mark}</span>
        <div style={styles.accountTitle}>
          <span style={styles.accountName}>{account.name}</span>
          <span style={styles.accountKind}>{account.kindLabel}</span>
        </div>
        <div style={styles.connectedPill}>
          <span style={styles.connectedDot} />
          {CONNECTED_ACCOUNT_LABELS.CONNECTED}
        </div>
      </div>

      {showsJustConnectedNote && (
        <div style={styles.justConnectedNote}>
          {CONNECTED_ACCOUNT_LABELS.JUST_CONNECTED}{" "}
          <bdi>{BANK_CONNECTED_XP_LABEL}</bdi>
        </div>
      )}

      <div style={styles.accountRows}>
        {account.rows.map((row, index) => (
          <div key={row.label} style={styles.accountRow({ isFirst: !index })}>
            <span style={styles.accountRowLabel}>{row.label}</span>
            <span style={styles.accountRowValue}>{row.value}</span>
          </div>
        ))}
      </div>

      {!isConfirmingDisconnect && (
        <Button
          size="small"
          variant="warningOutline"
          sx={styles.disconnectButton}
          text={CONNECTED_ACCOUNT_LABELS.DISCONNECT}
          onClick={() => setIsConfirmingDisconnect(true)}
        />
      )}

      {isConfirmingDisconnect && (
        <div style={styles.disconnectConfirm}>
          <div style={styles.disconnectCopy}>
            <span style={styles.disconnectTitle}>
              {CONNECTED_ACCOUNT_LABELS.DISCONNECT_TITLE(account.name)}
            </span>
            <span style={styles.disconnectBody}>
              {CONNECTED_ACCOUNT_LABELS.DISCONNECT_BODY}
            </span>
          </div>

          {disconnectError !== null && (
            <span style={styles.disconnectError}>{disconnectError}</span>
          )}

          <div style={styles.disconnectActions}>
            <Button
              size="small"
              variant="warning"
              text={confirmLabel}
              onClick={onDisconnect}
              disabled={isDisconnecting}
              sx={styles.confirmDisconnectAction}
            />
            <Button
              size="small"
              variant="warningOutline"
              onClick={cancelDisconnect}
              sx={styles.keepConnectedAction}
              text={CONNECTED_ACCOUNT_LABELS.KEEP_CONNECTED}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default BankConnected;
