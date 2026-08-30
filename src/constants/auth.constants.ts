export const AUTH_MESSAGES = {
  EMAIL_TAKEN: "כתובת הדוא״ל כבר רשומה במערכת",
  TERMS_REQUIRED: "צריך לאשר את תנאי השימוש",
  MISSING_DETAILS: "צריך למלא דוא״ל וסיסמה",
  PASSWORD_TOO_SHORT: "הסיסמה צריכה להכיל לפחות 10 תווים",
  INVALID_DETAILS: "הפרטים שהוזנו אינם תקינים",
  INVALID_CREDENTIALS: "דוא״ל או סיסמה שגויים",
  NAME_REQUIRED: "צריך למלא שם מלא",
  TOO_MANY_ATTEMPTS: "יותר מדי ניסיונות, נסו שוב בעוד כמה דקות",
  GENERIC_FAILURE: "משהו השתבש, נסו שוב",
} as const;

export const AUTH_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  INSIGHTS: "/insights",
  SETTINGS: "/settings",
} as const;

export const MIN_PASSWORD_LENGTH = 10;
