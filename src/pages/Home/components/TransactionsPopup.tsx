import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./TransactionsPopup.style";
import GenericPopup from "../../../components/GenericPopup/GenericPopup";
import type { ITransactionView } from "../../../interfaces/transaction.interface";

interface ITransactionsPopupProps {
  open: boolean;
  onClose: () => void;
  transactions: ITransactionView[];
}

const TransactionsPopup: FC<ITransactionsPopupProps> = ({
  open,
  onClose,
  transactions,
}) => {
  const styles = useStyles();

  return (
    <GenericPopup
      open={open}
      onClose={onClose}
      title="כל התנועות של החודש"
      buttons={{ primary: { text: "הבנתי", onClick: () => {} } }}
      content={
        <Card sx={styles.card}>
          <div style={styles.list}>
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                style={styles.row({
                  isLast: index === transactions.length - 1,
                })}
              >
                <img alt="" style={styles.icon} src={transaction.icon} />
                <div style={styles.text}>
                  <span style={styles.name}>{transaction.name}</span>
                  <span style={styles.time}>{transaction.time}</span>
                </div>
                <span style={styles.amount}>{transaction.amount}</span>
              </div>
            ))}

            {transactions.length === 0 && (
              <span style={styles.emptyText}>אין תנועות בחודש זה</span>
            )}
          </div>
        </Card>
      }
    />
  );
};

export default TransactionsPopup;
