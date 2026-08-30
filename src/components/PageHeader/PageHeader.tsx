import type { FC } from "react";
import Avatar from "../Avatar/Avatar";
import { useStyles } from "./PageHeader.style";
import anchorIcon from "../../assets/icons/anchor.png";

interface IPageHeaderProps {
  name: string;
  level: string;
  avatarInitial: string;
}

const PageHeader: FC<IPageHeaderProps> = ({ name, level, avatarInitial }) => {
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

export default PageHeader;
