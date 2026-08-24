import type { FC } from "react";
import { useStyles } from "./Badge.style";
import type { TBadgeTone } from "./constants/badge.constants";

interface IBadgeProps {
  text: string;
  tone?: TBadgeTone;
}

const Badge: FC<IBadgeProps> = ({ text, tone = "gold" }) => {
  const styles = useStyles();

  return <span style={styles.badge({ tone })}>{text}</span>;
};

export default Badge;
