export type TFieldType =
  "phone" | "number" | "tz" | "name" | "text" | "email" | "password";

export const KEYBOARD_TYPE_MAP: Record<
  TFieldType,
  React.HTMLInputTypeAttribute
> = {
  tz: "number",
  phone: "tel",
  number: "number",
  name: "text",
  text: "text",
  email: "email",
  password: "password",
};
