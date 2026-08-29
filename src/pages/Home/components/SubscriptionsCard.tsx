import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./SubscriptionsCard.style";
import Button from "../../../components/Button/Button";
import type { ISubscriptionView } from "../../../interfaces/subscription.interface";

interface ISubscriptionsCardProps {
  title: string;
  subtitle: string;
  subscriptions: ISubscriptionView[];
}

const SubscriptionsCard: FC<ISubscriptionsCardProps> = ({
  title,
  subtitle,
  subscriptions,
}) => {
  const styles = useStyles();

  return (
    <div>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.subtitle}>{subtitle}</span>
      </div>

      <div style={styles.list}>
        {subscriptions.map((subscription) => (
          <Card
            key={subscription.id}
            sx={{
              gap: 12,
              display: "flex",
              alignItems: "center",
              padding: "14px 16px",
            }}
          >
            <img alt="" style={styles.icon} src={subscription.icon} />
            <div style={styles.text}>
              <span style={styles.name}>{subscription.name}</span>
              <span style={styles.price}>{subscription.price}</span>
            </div>
            <Button
              text="ביטול"
              size="small"
              variant="warning"
              onClick={() => {}}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsCard;
