import Card from "../Card/Card";
import type { FC, ReactNode } from "react";
import { useStyles } from "./IconListItem.style";
import type { TCardTone } from "../Card/constants/card.constants";

interface IIconListItemProps {
  icon: string;
  title: string;
  subtitle: string;
  tone?: TCardTone;
  trailing?: ReactNode;
}

const IconListItem: FC<IIconListItemProps> = ({
  icon,
  tone,
  title,
  subtitle,
  trailing,
}) => {
  const styles = useStyles();

  return (
    <Card tone={tone} sx={styles.card}>
      <img alt="" src={icon} style={styles.icon} />
      <div style={styles.text}>
        <span style={styles.title}>{title}</span>
        <span style={styles.subtitle}>{subtitle}</span>
      </div>
      {trailing}
    </Card>
  );
};

export default IconListItem;
