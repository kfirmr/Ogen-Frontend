import type { FC } from "react";
import { useStyles } from "./Avatar.style";

interface IAvatarProps {
  size?: number;
  initial: string;
}

const DEFAULT_SIZE = 44;

const Avatar: FC<IAvatarProps> = ({ initial, size = DEFAULT_SIZE }) => {
  const styles = useStyles();

  return <div style={styles.avatar({ size })}>{initial}</div>;
};

export default Avatar;
