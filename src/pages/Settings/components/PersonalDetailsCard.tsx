import type { FC } from "react";
import Card from "../../../components/Card/Card";
import userIcon from "../../../assets/icons/user.png";
import Button from "../../../components/Button/Button";
import { useStyles } from "./PersonalDetailsCard.style";
import TextField from "../../../components/TextField/TextField";

interface IPersonalDetailsCardProps {
  name: string;
  onSave: () => void;
  onNameChange: (name: string) => void;
}

const PersonalDetailsCard: FC<IPersonalDetailsCardProps> = ({
  name,
  onSave,
  onNameChange,
}) => {
  const styles = useStyles();

  return (
    <Card>
      <div style={styles.title}>פרטים אישיים</div>

      <div style={styles.field}>
        <TextField
          type="name"
          value={name}
          title="שם מלא"
          onChange={onNameChange}
          placeholder="ישראל ישראלי"
          endAdornment={<img src={userIcon} alt="" style={styles.icon} />}
        />
      </div>

      <Button onClick={onSave} text="שמור שינויים" sx={styles.saveButton} />
    </Card>
  );
};

export default PersonalDetailsCard;
