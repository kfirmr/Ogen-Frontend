import Check from "../../icons/Check";
import { useStyles } from "./CheckBox.style";
import { theme } from "../../constants/theme.constants";
import { type FC, useEffect, type JSX, useState } from "react";

interface ICheckBoxProps {
  value: boolean;
  disabled?: boolean;
  textColor?: string;
  text: string | JSX.Element;
  onChange: (value: boolean) => void;
}

const CheckBox: FC<ICheckBoxProps> = ({
  text,
  onChange,
  value = false,
  disabled = false,
  textColor = theme.colors.black,
}) => {
  const styles = useStyles();
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    if (value !== checked) {
      onChange(checked);
    }
  }, [value, checked]);

  const handleChange = () => {
    if (disabled) return;

    const nextChecked = !checked;

    setChecked(nextChecked);
    onChange(nextChecked);
  };

  return (
    <div
      onClick={handleChange}
      style={styles.container({ disabled, textColor })}
    >
      <div style={styles.checkBox({ checked })}>{checked && <Check />}</div>
      {text}
    </div>
  );
};

export default CheckBox;
