import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./TransactionsCard.style";
import Button from "../../../components/Button/Button";
import type { ITransactionView } from "../../../interfaces/transaction.interface";

interface ITransactionsCardProps {
  title: string;
  allText: string;
  transactions: ITransactionView[];
}

const TransactionsCard: FC<ITransactionsCardProps> = ({
  title,
  allText,
  transactions,
}) => {
  const styles = useStyles();

  return (
    <Card sx={{ padding: "24px 22px 14px" }}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <Button size="small" text={allText} variant="text" onClick={() => {}} />
      </div>

      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          style={styles.row({ isLast: index === transactions.length - 1 })}
        >
          <img alt="" style={styles.icon} src={transaction.icon} />
          <div style={styles.text}>
            <span style={styles.name}>{transaction.name}</span>
            <span style={styles.time}>{transaction.time}</span>
          </div>
          <span style={styles.amount}>{transaction.amount}</span>
        </div>
      ))}
    </Card>
  );
};

export default TransactionsCard;
