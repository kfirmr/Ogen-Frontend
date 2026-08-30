import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./SettingsPage.style";
import lockIcon from "../../assets/icons/lock.png";
import Button from "../../components/Button/Button";
import PasswordCard from "./components/PasswordCard";
import { useCurrentUser } from "../../store/auth.store";
import { logoutAction } from "../../actions/auth.actions";
import AppShell from "../../components/AppShell/AppShell";
import BottomNav from "../../components/BottomNav/BottomNav";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import PageHeader from "../../components/PageHeader/PageHeader";
import { getLevelHeadline } from "../../utilities/level.utility";
import { useUserProgress } from "../../hooks/user-progress.hook";
import PersonalDetailsCard from "./components/PersonalDetailsCard";

const SettingsPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const userProgress = useUserProgress();
  const fullName = user?.fullName ?? "";
  const [name, setName] = useState(fullName);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleLogout = () => {
    logoutAction();
    navigate(AUTH_ROUTES.LOGIN);
  };

  return (
    <AppShell sx={styles.shell}>
      <PageHeader
        name={fullName}
        avatarInitial={fullName.charAt(0)}
        level={getLevelHeadline(userProgress)}
      />

      <PersonalDetailsCard
        name={name}
        onSave={() => {}}
        onNameChange={setName}
      />

      <PasswordCard
        confirm={confirm}
        password={password}
        onUpdate={() => {}}
        onConfirmChange={setConfirm}
        onPasswordChange={setPassword}
      />

      <Button
        text="התנתקות מהחשבון"
        onClick={handleLogout}
        variant="warningOutline"
        sx={styles.logoutButton}
      />

      <div style={styles.privacyNote}>
        <img alt="" src={lockIcon} style={styles.lockIcon} />
        הנתונים נשארים במכשיר שלך
      </div>

      <BottomNav activeTab="settings" />
    </AppShell>
  );
};

export default SettingsPage;
