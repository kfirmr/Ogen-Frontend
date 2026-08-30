import type { FC } from "react";
import { useStyles } from "./TabBar.style";

export interface ITabOption {
  key: string;
  label: string;
}

interface ITabBarProps {
  value: string;
  tabs: ITabOption[];
  onChange: (key: string) => void;
}

const TabBar: FC<ITabBarProps> = ({ tabs, value, onChange }) => {
  const styles = useStyles();

  return (
    <div style={styles.track}>
      {tabs.map((tab) => {
        const isActive = tab.key === value;

        return (
          <button
            type="button"
            key={tab.key}
            style={styles.tab({ isActive })}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
