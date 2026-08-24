import type { FC } from "react";
import { useStyles } from "./BarChart.style";

export interface IBarChartBar {
  value: number;
  color: string;
}

interface IBarChartProps {
  height?: number;
  bars: IBarChartBar[];
}

const DEFAULT_HEIGHT = 186;
const GRIDLINE_ROWS = 4;

const BarChart: FC<IBarChartProps> = ({ bars, height = DEFAULT_HEIGHT }) => {
  const styles = useStyles();
  const maxValue = Math.max(...bars.map(({ value }) => value), 0);

  return (
    <div style={styles.container({ height })}>
      <div style={styles.gridlines}>
        {Array.from({ length: GRIDLINE_ROWS }, (_, index) => (
          <div key={index} style={styles.gridline} />
        ))}
      </div>

      <div style={styles.bars}>
        {bars.map(({ value, color }, index) => (
          <div key={index} style={styles.barColumn}>
            <div
              style={styles.bar({
                color,
                ratio: maxValue > 0 ? value / maxValue : 0,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
