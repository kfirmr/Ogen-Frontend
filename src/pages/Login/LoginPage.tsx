import { useState } from "react";
import { useStyles } from "./LoginPage.style";
import mailIcon from "../../assets/icons/mail.png";
import lockIcon from "../../assets/icons/lock.png";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import anchorIcon from "../../assets/icons/anchor.png";
import { loginAction } from "../../actions/auth.actions";
import AppShell from "../../components/AppShell/AppShell";
import CheckBox from "../../components/CheckBox/CheckBox";
import TextField from "../../components/TextField/TextField";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import { getLoginFormError } from "../../utilities/auth-form.utility";

const LoginPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    const formError = getLoginFormError({ email, password });

    if (formError !== null) {
      setErrorMessage(formError);

      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    const result = await loginAction({ email: email.trim(), password });

    setIsLoading(false);

    if (result.errorMessage !== null) {
      setErrorMessage(result.errorMessage);

      return;
    }

    navigate(AUTH_ROUTES.HOME);
  };

  return (
    <AppShell>
      <div style={styles.logo}>
        <img alt="Ogen" src={anchorIcon} style={styles.logoIcon} />
        <span style={styles.logoText}>Ogen</span>
      </div>

      <h2 style={styles.heading}>ברוכים הבאים לעוגן</h2>
      <p style={styles.subtitle}>התחבר כדי להמשיך לחשבון שלך</p>

      <div style={styles.field}>
        <TextField
          type="email"
          value={email}
          title="כתובת דוא״ל"
          onChange={setEmail}
          placeholder="name@example.com"
          endAdornment={<img src={mailIcon} alt="" style={styles.inputIcon} />}
        />
      </div>

      <div style={styles.field}>
        <TextField
          title="סיסמה"
          type="password"
          value={password}
          onChange={setPassword}
          endAdornment={<img src={lockIcon} alt="" style={styles.inputIcon} />}
        />
      </div>

      <div style={styles.row}>
        <CheckBox
          text="זכור אותי"
          value={rememberMe}
          onChange={setRememberMe}
        />
        <Button variant="text" text="שכחת סיסמה?" onClick={() => {}} />
      </div>

      {errorMessage !== null && <p style={styles.error}>{errorMessage}</p>}

      <Button text="התחבר" isLoading={isLoading} onClick={handleLogin} />

      <p style={styles.footer}>
        עדיין אין לך חשבון?{" "}
        <Link to="/signup" style={styles.footerLink}>
          הירשם עכשיו
        </Link>
      </p>
    </AppShell>
  );
};

export default LoginPage;
