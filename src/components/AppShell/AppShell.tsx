import { useStyles } from "./AppShell.style";
import type { CSSProperties, FC, ReactNode } from "react";

interface IAppShellProps {
  sx?: CSSProperties;
  children: ReactNode;
}

const AppShell: FC<IAppShellProps> = ({ sx, children }) => {
  const styles = useStyles();

  return (
    <div style={styles.page}>
      <div style={{ ...styles.shell, ...sx }}>{children}</div>
    </div>
  );
};

export default AppShell;
