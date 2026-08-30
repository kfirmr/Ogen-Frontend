export type TInsightTone = "alert" | "win" | "streak";

export interface IInsight {
  id: string;
  icon: string;
  body: string;
  title: string;
  xpLabel: string;
  tone: TInsightTone;
}
