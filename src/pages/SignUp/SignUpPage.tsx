import { useState } from "react";
import { useStyles } from "./SignUpPage.style";
import userIcon from "../../assets/icons/user.png";
import mailIcon from "../../assets/icons/mail.png";
import lockIcon from "../../assets/icons/lock.png";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { setUserName } from "../../store/user.store";
import anchorIcon from "../../assets/icons/anchor.png";
import AppShell from "../../components/AppShell/AppShell";
import CheckBox from "../../components/CheckBox/CheckBox";
import TextField from "../../components/TextField/TextField";

const SignUpPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setUserName(trimmedName);
    navigate("/");
  };

  return (
    <AppShell>
      <div style={styles.logo}>
        <img alt="Ogen" src={anchorIcon} style={styles.logoIcon} />
        <span style={styles.logoText}>Ogen</span>
      </div>

      <h2 style={styles.heading}>הצטרפו לעוגן</h2>
      <p style={styles.subtitle}>הטייס האוטומטי לכסף שלכם</p>

      <div style={styles.field}>
        <TextField
          type="name"
          value={name}
          title="שם מלא"
          onChange={setName}
          placeholder="ישראל ישראלי"
          endAdornment={<img src={userIcon} alt="" style={styles.inputIcon} />}
        />
      </div>

      <div style={styles.field}>
        <TextField
          type="email"
          value={email}
          title="דוא״ל"
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

      <div style={styles.terms}>
        <CheckBox
          value={agreedToTerms}
          onChange={setAgreedToTerms}
          text={
            <span style={styles.termsText}>
              אני מסכים/ה ל<span style={styles.termsLink}>תנאי השימוש</span>{" "}
              ולמדיניות הפרטיות של עוגן.
            </span>
          }
        />
      </div>

      <Button text="יצירת חשבון" onClick={handleSignUp} />

      <div style={styles.divider} />
      <p style={styles.footer}>
        כבר יש לכם חשבון?{" "}
        <Link to="/login" style={styles.footerLink}>
          התחברו כאן
        </Link>
      </p>
    </AppShell>
  );
};

export default SignUpPage;
