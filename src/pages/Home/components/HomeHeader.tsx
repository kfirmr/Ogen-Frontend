import type { FC } from "react";
import { useStyles } from "./HomeHeader.style";
import Avatar from "../../../components/Avatar/Avatar";
import anchorIcon from "../../../assets/icons/anchor.png";

interface IHomeHeaderProps {
  name: string;
  level: string;
  avatarInitial: string;
}

const HomeHeader: FC<IHomeHeaderProps> = ({ name, level, avatarInitial }) => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      <img alt="Ogen" src={anchorIcon} style={styles.logo} />
      <div style={styles.greeting}>
        <div style={styles.text}>
          <div style={styles.name}>שלום, {name}</div>
          <div style={styles.level}>{level}</div>
        </div>
        <Avatar initial={avatarInitial} />
      </div>
    </div>
  );
};

export default HomeHeader;
