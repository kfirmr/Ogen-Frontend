import type { FC } from "react";
import { useStyles } from "./InsightCard.style";
import Button from "../../../components/Button/Button";
import type { IInsight } from "../../../interfaces/insight.interface";

interface IInsightCardProps {
  insight: IInsight;
  dismissText: string;
  reviewText?: string;
  onReview?: (() => void) | null;
  onDismiss: (id: string) => void;
}

const InsightCard: FC<IInsightCardProps> = ({
  insight,
  onReview,
  reviewText,
  dismissText,
  onDismiss,
}) => {
  const styles = useStyles();

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.icon}>{insight.icon}</div>
        <span style={styles.title}>{insight.title}</span>
      </div>

      <p style={styles.body}>{insight.body}</p>

      {insight.savingsLabel != null && (
        <span style={styles.savings}>{insight.savingsLabel}</span>
      )}

      <div style={styles.footer}>
        <div style={styles.actions}>
          {onReview != null && reviewText != null && (
            <Button size="small" text={reviewText} onClick={onReview} />
          )}
          <Button
            size="small"
            text={dismissText}
            variant="secondary"
            onClick={() => onDismiss(insight.id)}
          />
        </div>
        <span style={styles.xp}>{insight.xpLabel}</span>
      </div>
    </div>
  );
};

export default InsightCard;
