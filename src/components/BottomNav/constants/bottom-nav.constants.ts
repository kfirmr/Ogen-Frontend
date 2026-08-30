import { AUTH_ROUTES } from "../../../constants/auth.constants";

export type TNavTab = "settings" | "insights" | "home";

export interface INavTabOption {
  tab: TNavTab;
  text: string;
  route: string;
}

export const NAV_TAB_OPTIONS: INavTabOption[] = [
  { tab: "settings", text: "הגדרות", route: AUTH_ROUTES.SETTINGS },
  { tab: "insights", text: "תובנות", route: AUTH_ROUTES.INSIGHTS },
  { tab: "home", text: "בית", route: AUTH_ROUTES.HOME },
];
