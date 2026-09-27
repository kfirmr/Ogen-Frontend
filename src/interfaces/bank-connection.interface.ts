import type {
  TBankCompanyIdType,
  TBankConnectStepType,
  TBankCredentialFieldType,
  TBankConnectionStatusType,
} from "../constants/bank-connection.constants";

import type { TFieldType } from "../components/TextField/constants/textfield.constants";

export interface IBankLoginHint {
  idLastDigits: string | null;
  cardLastDigits: string | null;
  usernamePrefix: string | null;
}

export interface IBankConnection {
  id: string;
  createdAt: string;
  lastError: string | null;
  company: TBankCompanyIdType;
  lastSyncedAt: string | null;
  otpRequestedAt: string | null;
  loginHint: IBankLoginHint | null;
  status: TBankConnectionStatusType;
}

export interface IBankCompany {
  name: string;
  mark: string;
  kindLabel: string;
  checkPhrase: string;
  id: TBankCompanyIdType;
  fields: TBankCredentialFieldType[];
}

// Aliased rather than inlined: a comma inside an interface member's generic confuses the
// pyramid-interface-keys formatter plugin.
type TBankCredentialInputType = Extract<TFieldType, "text" | "password">;

export interface IBankCredentialFieldDefinition {
  icon: string;
  label: string;
  pattern: RegExp;
  maxLength: number;
  isNumeric: boolean;
  placeholder: string;
  type: TBankCredentialInputType;
}

export type TBankCredentials = Partial<
  Record<TBankCredentialFieldType, string>
>;

export interface IConnectBankRequest {
  company: TBankCompanyIdType;
  credentials: TBankCredentials;
}

export interface IBankConnectOutcome {
  step: TBankConnectStepType;
  errorMessage: string | null;
}

export interface IConnectedAccountRow {
  label: string;
  value: string;
}

export interface IConnectedAccountView {
  name: string;
  mark: string;
  kindLabel: string;
  rows: IConnectedAccountRow[];
}
