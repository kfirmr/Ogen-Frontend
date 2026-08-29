import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./FoundMoneyCard.style";
import Badge from "../../../components/Badge/Badge";
import DonutChart from "../../../components/DonutChart/DonutChart";
import type { IExpenseSegment } from "../../../interfaces/expense.interface";

interface IFoundMoneyCardProps {
  badgeText: string;
  totalLabel: string;
  totalAmount: string;
  segments: IExpenseSegment[];
}

const FoundMoneyCard: FC<IFoundMoneyCardProps> = ({
  segments,
  badgeText,
  totalLabel,
  totalAmount,
}) => {
  const styles = useStyles();

  return (
    <Card tone="tint" sx={styles.card}>
      <div style={styles.header}>
        <Badge text={badgeText} />
      </div>

      <DonutChart size={246} segments={segments}>
        <span style={styles.total}>{totalAmount}</span>
        <span style={styles.totalLabel}>{totalLabel}</span>
      </DonutChart>

      <div style={styles.legend}>
        {segments.map((segment) => (
          <div key={segment.label} style={styles.legendRow}>
            <span style={styles.legendDot({ color: segment.color })} />
            <span style={styles.legendLabel}>{segment.label}</span>
            <span style={styles.legendValue}>
              {segment.value.toLocaleString()} ₪
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FoundMoneyCard;
