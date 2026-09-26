import type { FC } from "react";
import { ButtonBase } from "@mui/material";
import { useStyles } from "./BankConnect.style";
import Card from "../../../../components/Card/Card";
import type { IBankCompany } from "../../../../interfaces/bank-connection.interface";
import type { TBankCompanyIdType } from "../../../../constants/bank-connection.constants";

interface IBankCompanyPickerProps {
  companies: IBankCompany[];
  onPick: (companyId: TBankCompanyIdType) => void;
}

const BankCompanyPicker: FC<IBankCompanyPickerProps> = ({
  onPick,
  companies,
}) => {
  const styles = useStyles();

  return (
    <Card sx={styles.card}>
      <div style={styles.intro}>
        <span style={styles.title}>חיבור חשבון</span>
        <span style={styles.description}>
          בחר את חברת האשראי או הבנק — נמשוך את העסקאות אוטומטית.
        </span>
      </div>

      <div style={styles.companyGrid}>
        {companies.map((company) => (
          <ButtonBase
            key={company.id}
            sx={styles.companyTile}
            onClick={() => onPick(company.id)}
          >
            <span style={styles.companyTileMark}>{company.mark}</span>
            <span style={styles.companyTileName}>{company.name}</span>
          </ButtonBase>
        ))}
      </div>
    </Card>
  );
};

export default BankCompanyPicker;
