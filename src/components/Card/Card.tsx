import { useStyles } from "./Card.style";
import type { CSSProperties, FC, ReactNode } from "react";
import type { TCardTone } from "./constants/card.constants";

interface ICardProps {
  tone?: TCardTone;
  sx?: CSSProperties;
  children: ReactNode;
}

const Card: FC<ICardProps> = ({ sx, children, tone = "default" }) => {
  const styles = useStyles();

  return <div style={{ ...styles.card({ tone }), ...sx }}>{children}</div>;
};

export default Card;
