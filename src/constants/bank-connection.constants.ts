import type {
  IBankCompany,
  IBankConnectOutcome,
  IBankCredentialFieldDefinition,
} from "../interfaces/bank-connection.interface";

import { TIME_UNITS } from "./date.constants";
import userIcon from "../assets/icons/user.png";
import lockIcon from "../assets/icons/lock.png";

export const BANK_CONNECTION_QUERY_KEY = ["bank-connection"] as const;

export const BANK_CONNECTION_STATUSES = {
  ACTIVE: "ACTIVE",
  FAILED: "FAILED",
  SYNCING: "SYNCING",
  AWAITING_OTP: "AWAITING_OTP",
  PENDING_VALIDATION: "PENDING_VALIDATION",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
} as const;

export type TBankConnectionStatusType =
  (typeof BANK_CONNECTION_STATUSES)[keyof typeof BANK_CONNECTION_STATUSES];

export const BANK_CONNECT_STEPS = {
  PICK: "PICK",
  LOGIN: "LOGIN",
  ACTIVE: "ACTIVE",
  INVALID: "INVALID",
  VALIDATING: "VALIDATING",
} as const;

export type TBankConnectStepType =
  (typeof BANK_CONNECT_STEPS)[keyof typeof BANK_CONNECT_STEPS];

export const BANK_COMPANY_IDS = {
  MAX: "max",
  AMEX: "amex",
  LEUMI: "leumi",
  VISA_CAL: "visaCal",
  ISRACARD: "isracard",
  HAPOALIM: "hapoalim",
} as const;

export type TBankCompanyIdType =
  (typeof BANK_COMPANY_IDS)[keyof typeof BANK_COMPANY_IDS];

export const BANK_CREDENTIAL_FIELDS = {
  ID: "id",
  USERNAME: "username",
  PASSWORD: "password",
  USER_CODE: "userCode",
  CARD_6_DIGITS: "card6Digits",
} as const;

export type TBankCredentialFieldType =
  (typeof BANK_CREDENTIAL_FIELDS)[keyof typeof BANK_CREDENTIAL_FIELDS];

const ANY_VALUE = /.+/;

const FREE_TEXT_MAX_LENGTH = 40;

export const BANK_CREDENTIAL_FIELD_DEFINITIONS: Record<
  TBankCredentialFieldType,
  IBankCredentialFieldDefinition
> = {
  [BANK_CREDENTIAL_FIELDS.ID]: {
    type: "text",
    maxLength: 9,
    icon: userIcon,
    isNumeric: true,
    label: "תעודת זהות",
    pattern: /^\d{9}$/,
    placeholder: "9 ספרות",
  },
  [BANK_CREDENTIAL_FIELDS.CARD_6_DIGITS]: {
    type: "text",
    maxLength: 6,
    icon: lockIcon,
    isNumeric: true,
    pattern: /^\d{6}$/,
    placeholder: "6 ספרות",
    label: "6 ספרות אחרונות של הכרטיס",
  },
  [BANK_CREDENTIAL_FIELDS.USERNAME]: {
    type: "text",
    icon: userIcon,
    placeholder: "",
    isNumeric: false,
    label: "שם משתמש",
    pattern: ANY_VALUE,
    maxLength: FREE_TEXT_MAX_LENGTH,
  },
  [BANK_CREDENTIAL_FIELDS.USER_CODE]: {
    type: "text",
    icon: userIcon,
    placeholder: "",
    isNumeric: false,
    label: "קוד משתמש",
    pattern: ANY_VALUE,
    maxLength: FREE_TEXT_MAX_LENGTH,
  },
  [BANK_CREDENTIAL_FIELDS.PASSWORD]: {
    label: "סיסמה",
    icon: lockIcon,
    type: "password",
    placeholder: "",
    isNumeric: false,
    pattern: ANY_VALUE,
    maxLength: FREE_TEXT_MAX_LENGTH,
  },
};

const ID_LOGIN = [
  BANK_CREDENTIAL_FIELDS.ID,
  BANK_CREDENTIAL_FIELDS.CARD_6_DIGITS,
  BANK_CREDENTIAL_FIELDS.PASSWORD,
];

const USERNAME_LOGIN = [
  BANK_CREDENTIAL_FIELDS.USERNAME,
  BANK_CREDENTIAL_FIELDS.PASSWORD,
];

const ID_LOGIN_CHECK = "תעודת הזהות, 6 הספרות והסיסמה";

const USERNAME_LOGIN_CHECK = "שם המשתמש והסיסמה";

export const BANK_COMPANIES: IBankCompany[] = [
  {
    mark: "י",
    name: "ישראכרט",
    fields: ID_LOGIN,
    checkPhrase: ID_LOGIN_CHECK,
    id: BANK_COMPANY_IDS.ISRACARD,
  },
  {
    mark: "מ",
    name: "מקס",
    id: BANK_COMPANY_IDS.MAX,
    fields: USERNAME_LOGIN,
    checkPhrase: USERNAME_LOGIN_CHECK,
  },
  {
    mark: "כ",
    name: "כאל",
    fields: USERNAME_LOGIN,
    id: BANK_COMPANY_IDS.VISA_CAL,
    checkPhrase: USERNAME_LOGIN_CHECK,
  },
  {
    mark: "א",
    fields: ID_LOGIN,
    name: "אמריקן אקספרס",
    id: BANK_COMPANY_IDS.AMEX,
    checkPhrase: ID_LOGIN_CHECK,
  },
  {
    mark: "פ",
    name: "בנק הפועלים",
    id: BANK_COMPANY_IDS.HAPOALIM,
    checkPhrase: "קוד המשתמש והסיסמה",
    fields: [BANK_CREDENTIAL_FIELDS.USER_CODE, BANK_CREDENTIAL_FIELDS.PASSWORD],
  },
  {
    mark: "ל",
    name: "בנק לאומי",
    fields: USERNAME_LOGIN,
    id: BANK_COMPANY_IDS.LEUMI,
    checkPhrase: USERNAME_LOGIN_CHECK,
  },
];

// The worker checks new logins once a minute, so a validation past this point is running late.
export const BANK_CONNECTION_POLLING = {
  INTERVAL_MS: 4 * TIME_UNITS.SECONDS,
  ELAPSED_TICK_MS: TIME_UNITS.SECONDS,
  SLOW_AFTER_MS: 75 * TIME_UNITS.SECONDS,
} as const;

export const BANK_CONNECTED_XP_LABEL = "50 XP";

export const BANK_CONNECT_MESSAGES = {
  SEND_FAILED: "לא הצלחנו לשלוח את הפרטים. בדוק את החיבור לאינטרנט ונסה שוב.",
  TEMPORARY_FAILURE: (companyName: string) =>
    `לא הצלחנו להתחבר ל${companyName} כרגע. נסה שוב בעוד כמה דקות.`,
  INVALID_CREDENTIALS: (company: IBankCompany) =>
    `${company.name} לא אישרה את ההתחברות. כדאי לבדוק את ${company.checkPhrase} ולנסות שוב.`,
} as const;

const STILL_VALIDATING: IBankConnectOutcome = {
  errorMessage: null,
  step: BANK_CONNECT_STEPS.VALIDATING,
};

// AWAITING_OTP keeps the spinner: none of these companies' scrapers can pause for an SMS code yet.
export const BANK_CONNECT_OUTCOME_BY_STATUS: Record<
  TBankConnectionStatusType,
  (company: IBankCompany) => IBankConnectOutcome
> = {
  [BANK_CONNECTION_STATUSES.SYNCING]: () => STILL_VALIDATING,
  [BANK_CONNECTION_STATUSES.AWAITING_OTP]: () => STILL_VALIDATING,
  [BANK_CONNECTION_STATUSES.PENDING_VALIDATION]: () => STILL_VALIDATING,
  [BANK_CONNECTION_STATUSES.ACTIVE]: () => ({
    errorMessage: null,
    step: BANK_CONNECT_STEPS.ACTIVE,
  }),
  [BANK_CONNECTION_STATUSES.INVALID_CREDENTIALS]: () => ({
    errorMessage: null,
    step: BANK_CONNECT_STEPS.INVALID,
  }),
  [BANK_CONNECTION_STATUSES.FAILED]: (company) => ({
    step: BANK_CONNECT_STEPS.LOGIN,
    errorMessage: BANK_CONNECT_MESSAGES.TEMPORARY_FAILURE(company.name),
  }),
};
