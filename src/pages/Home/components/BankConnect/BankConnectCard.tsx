import {
  BANK_COMPANIES,
  BANK_CONNECT_STEPS,
  type TBankConnectStepType,
} from "../../../../constants/bank-connection.constants";

import type { ReactNode } from "react";
import BankConnected from "./BankConnected";
import BankLoginForm from "./BankLoginForm";
import BankValidating from "./BankValidating";
import BankCompanyPicker from "./BankCompanyPicker";
import BankInvalidCredentials from "./BankInvalidCredentials";
import { useBankConnect } from "../../../../hooks/bank-connect.hook";

const BankConnectCard = () => {
  const bankConnect = useBankConnect();

  const stepViews: Record<TBankConnectStepType, () => ReactNode> = {
    [BANK_CONNECT_STEPS.PICK]: () => (
      <BankCompanyPicker
        companies={BANK_COMPANIES}
        onPick={bankConnect.pickCompany}
      />
    ),
    [BANK_CONNECT_STEPS.LOGIN]: () => (
      <BankLoginForm
        company={bankConnect.company}
        onConnect={bankConnect.connect}
        onBack={bankConnect.pickAnother}
        canConnect={bankConnect.canConnect}
        credentials={bankConnect.credentials}
        onChange={bankConnect.changeCredential}
        isSubmitting={bankConnect.isSubmitting}
        errorMessage={bankConnect.errorMessage}
      />
    ),
    [BANK_CONNECT_STEPS.VALIDATING]: () => (
      <BankValidating
        isSlow={bankConnect.isSlow}
        companyName={bankConnect.company.name}
        elapsedLabel={bankConnect.elapsedLabel}
      />
    ),
    [BANK_CONNECT_STEPS.ACTIVE]: () => (
      <BankConnected
        companyName={bankConnect.company.name}
        onConnectAnother={bankConnect.pickAnother}
      />
    ),
    [BANK_CONNECT_STEPS.INVALID]: () => (
      <BankInvalidCredentials
        onRetry={bankConnect.retry}
        company={bankConnect.company}
        onPickAnother={bankConnect.pickAnother}
      />
    ),
  };

  return stepViews[bankConnect.step]();
};

export default BankConnectCard;
