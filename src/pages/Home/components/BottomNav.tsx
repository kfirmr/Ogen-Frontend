import type { FC } from "react";
import { useStyles } from "./BottomNav.style";
import Button from "../../../components/Button/Button";

const BottomNav: FC = () => {
  const styles = useStyles();

  return (
    <div style={styles.nav}>
      <Button text="הגדרות" variant="text" sx={styles.tab} onClick={() => {}} />
      <Button text="בית" size="small" onClick={() => {}} />
    </div>
  );
};

export default BottomNav;
