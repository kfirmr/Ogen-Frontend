import type { FC } from "react";
import { useStyles } from "./SubscriptionsCard.style";
import Button from "../../../components/Button/Button";
import IconListItem from "../../../components/IconListItem/IconListItem";
import type { ISubscriptionView } from "../../../interfaces/subscription.interface";

interface ISubscriptionsCardProps {
  title: string;
  subtitle: string;
  loadingId: string | null;
  onCancel: (id: string) => void;
  subscriptions: ISubscriptionView[];
}

const SubscriptionsCard: FC<ISubscriptionsCardProps> = ({
  title,
  subtitle,
  onCancel,
  loadingId,
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
          <IconListItem
            key={subscription.id}
            icon={subscription.icon}
            title={subscription.name}
            subtitle={subscription.price}
            trailing={
              <Button
                text="ביטול"
                size="small"
                variant="warning"
                isLoading={subscription.id === loadingId}
                onClick={() => onCancel(subscription.id)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsCard;
