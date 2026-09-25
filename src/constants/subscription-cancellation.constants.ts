export const CANCELLATION_METHODS = {
  WEB: "WEB",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  IN_APP: "IN_APP",
} as const;

export type TCancellationMethodType =
  (typeof CANCELLATION_METHODS)[keyof typeof CANCELLATION_METHODS];

export const CANCELLATION_CHANNELS = {
  LINK: "LINK",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
} as const;

export type TCancellationChannelType =
  (typeof CANCELLATION_CHANNELS)[keyof typeof CANCELLATION_CHANNELS];

export const CANCELLATION_LABELS = {
  CLOSE: "ביטול",
  RECIPIENT: "נשלח אל",
  CLOSE_ARIA: "סגור",
  TITLE_PREFIX: "ביטול",
  BODY: "תוכן המייל",
  LINK: "דף הביטול",
  PHONE: "קו הביטול",
  SUBJECT_PREFIX: "בקשה לביטול מנוי",
} as const;

export const CANCELLATION_CHANNEL_COPY: Record<
  TCancellationChannelType,
  { action: string; subtitle: string }
> = {
  [CANCELLATION_CHANNELS.EMAIL]: {
    action: "שליחה",
    subtitle: "נשלח את המייל הזה בשמך. אפשר לערוך לפני השליחה.",
  },
  [CANCELLATION_CHANNELS.LINK]: {
    action: "למעבר לדף הביטול",
    subtitle: "הביטול אצלם נעשה באתר. נפתח לך את דף הביטול הרשמי.",
  },
  [CANCELLATION_CHANNELS.PHONE]: {
    action: "התקשרות לביטול",
    subtitle: "הביטול אצלם נעשה בטלפון. נחייג בשבילך לקו הביטול.",
  },
};

export const CANCELLATION_BODY_ROWS = 7;
