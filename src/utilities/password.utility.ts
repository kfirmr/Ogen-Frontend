import { MIN_PASSWORD_LENGTH } from "../constants/auth.constants";

export type TPasswordMatchTone = "neutral" | "success" | "error";

export interface IPasswordMatchState {
  text: string;
  tone: TPasswordMatchTone;
}

export const getPasswordMatchState = ({
  password,
  confirm,
}: {
  password: string;
  confirm: string;
}): IPasswordMatchState => {
  const isTouched = confirm.length > 0;
  const isMismatched = isTouched && password !== confirm;
  const isMatching = isTouched && password === confirm;

  if (isMismatched) {
    return { tone: "error", text: "הסיסמאות לא תואמות" };
  }

  if (isMatching) {
    return { tone: "success", text: "הסיסמאות תואמות" };
  }

  return { tone: "neutral", text: `לפחות ${MIN_PASSWORD_LENGTH} תווים` };
};
