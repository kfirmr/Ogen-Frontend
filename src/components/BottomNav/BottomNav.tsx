import {
  type TNavTab,
  NAV_TAB_OPTIONS,
} from "./constants/bottom-nav.constants";

import type { FC } from "react";
import Button from "../Button/Button";
import { useStyles } from "./BottomNav.style";
import { useNavigate } from "react-router-dom";

interface IBottomNavProps {
  activeTab: TNavTab;
}

const BottomNav: FC<IBottomNavProps> = ({ activeTab }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      {NAV_TAB_OPTIONS.map((option) => {
        const isActive = option.tab === activeTab;

        if (isActive) {
          return (
            <Button
              size="small"
              key={option.tab}
              text={option.text}
              onClick={() => navigate(option.route)}
            />
          );
        }

        return (
          <Button
            variant="text"
            sx={styles.tab}
            key={option.tab}
            text={option.text}
            onClick={() => navigate(option.route)}
          />
        );
      })}
    </div>
  );
};

export default BottomNav;
