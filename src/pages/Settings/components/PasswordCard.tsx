import type { FC } from "react";
import Card from "../../../components/Card/Card";
import { useStyles } from "./PasswordCard.style";
import lockIcon from "../../../assets/icons/lock.png";
import Button from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import { getPasswordMatchState } from "../../../utilities/password.utility";

interface IPasswordCardProps {
  confirm: string;
  password: string;
  onUpdate: () => void;
  onConfirmChange: (confirm: string) => void;
  onPasswordChange: (password: string) => void;
}

const PasswordCard: FC<IPasswordCardProps> = ({
  password,
  confirm,
  onUpdate,
  onPasswordChange,
  onConfirmChange,
}) => {
  const styles = useStyles();
  const matchState = getPasswordMatchState({ password, confirm });
  const canUpdate = matchState.tone === "success";

  return (
    <Card>
      <div style={styles.title}>שינוי סיסמה</div>

      <div style={styles.field}>
        <TextField
          type="password"
          value={password}
          title="סיסמה חדשה"
          onChange={onPasswordChange}
          endAdornment={<img src={lockIcon} alt="" style={styles.icon} />}
        />
      </div>

      <div style={styles.field}>
        <TextField
          type="password"
          value={confirm}
          title="אימות סיסמה"
          onChange={onConfirmChange}
          endAdornment={<img src={lockIcon} alt="" style={styles.icon} />}
        />
      </div>

      <p style={styles.matchNote({ tone: matchState.tone })}>
        {matchState.text}
      </p>

      <Button
        text="עדכן סיסמה"
        onClick={onUpdate}
        variant="secondary"
        disabled={!canUpdate}
      />
    </Card>
  );
};

export default PasswordCard;
