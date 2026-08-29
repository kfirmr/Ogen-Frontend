import type { FC } from "react";
import { useStyles } from "./MonthPicker.style";
import type { IMonthOption } from "../../interfaces/date.interface";

interface IMonthPickerProps {
  value: string;
  months: IMonthOption[];
  onChange: (key: string) => void;
}

const MonthPicker: FC<IMonthPickerProps> = ({ value, months, onChange }) => {
  const styles = useStyles();

  return (
    <div style={styles.row}>
      {months.map((month) => {
        const isActive = month.key === value;

        return (
          <button
            type="button"
            key={month.key}
            style={styles.coin({ isActive })}
            onClick={() => onChange(month.key)}
          >
            <span>{month.short}</span>
            <span style={styles.year({ isActive })}>{month.year}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MonthPicker;
