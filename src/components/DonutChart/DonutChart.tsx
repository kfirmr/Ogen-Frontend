import type { FC, ReactNode } from "react";
import { useStyles } from "./DonutChart.style";
import { getDonutArcs, type IDonutSegment } from "./utilities/donut.utility";

interface IDonutChartProps {
  size?: number;
  children?: ReactNode;
  strokeWidth?: number;
  segments: IDonutSegment[];
}

const VIEWBOX_SIZE = 200;
const RADIUS = 86;
const DEFAULT_SIZE = 200;
const DEFAULT_STROKE_WIDTH = 13;

const DonutChart: FC<IDonutChartProps> = ({
  segments,
  children,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => {
  const styles = useStyles();
  const arcs = getDonutArcs(segments, RADIUS);
  const center = VIEWBOX_SIZE / 2;

  return (
    <div style={styles.container({ size })}>
      <svg style={styles.svg} viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}>
        <g
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        >
          {arcs.map((arc, index) => (
            <circle
              r={RADIUS}
              key={index}
              cx={center}
              cy={center}
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
            />
          ))}
        </g>
      </svg>
      <div style={styles.center}>{children}</div>
    </div>
  );
};

export default DonutChart;
