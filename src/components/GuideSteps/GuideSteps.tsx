import { Fragment, type FC } from "react";
import { useStyles } from "./GuideSteps.style";
import type { TGuideStepTone } from "./constants/guide-steps.constants";

export interface IGuideStep {
  label: string;
  sublabel?: string;
}

interface IGuideStepsProps {
  steps: IGuideStep[];
}

const GuideSteps: FC<IGuideStepsProps> = ({ steps }) => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        const tone: TGuideStepTone = isFirst || isLast ? "green" : "gold";

        return (
          <Fragment key={step.label}>
            <div style={styles.row}>
              <div style={styles.circle({ tone, isLast })}>{index + 1}</div>
              <div style={styles.text}>
                <span style={styles.label({ isLast })}>{step.label}</span>
                {step.sublabel && (
                  <span style={styles.sublabel}>{step.sublabel}</span>
                )}
              </div>
            </div>

            {!isLast && (
              <div style={styles.connector}>
                <div
                  style={styles.connectorLine({ flipped: index % 2 === 1 })}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default GuideSteps;
