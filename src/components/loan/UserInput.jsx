import InputRow from "./InputRow";
import { Percent, CurrencyRupee } from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  MIN_PRINCIPAL,
  MAX_PRINCIPAL,
  STEP_PRINCIPAL,
  MIN_INTEREST,
  MAX_INTEREST,
  STEP_INTEREST,
  MIN_TERM,
  MAX_TERM,
  STEP_TERM,
} from "../../utils/common";

const UserInput = ({
  principal,
  interest,
  term,
  theme,
  onPrincipalChange,
  onInterestChange,
  onTermChange,
}) => {
  return (
    <>
      <InputRow
        text="Loan Amount"
        minValue={MIN_PRINCIPAL}
        maxValue={MAX_PRINCIPAL}
        stepValue={STEP_PRINCIPAL}
        value={principal}
        theme={theme}
        handleChange={onPrincipalChange}
      >
        <CurrencyRupee />
      </InputRow>
      <InputRow
        text="Interest Rate (% P.A.)"
        minValue={MIN_INTEREST}
        maxValue={MAX_INTEREST}
        stepValue={STEP_INTEREST}
        value={interest}
        theme={theme}
        handleChange={onInterestChange}
      >
        <Percent />
      </InputRow>
      <InputRow
        text="Loan Term (Years)"
        minValue={MIN_TERM}
        maxValue={MAX_TERM}
        stepValue={STEP_TERM}
        value={term}
        theme={theme}
        handleChange={onTermChange}
      >
        <Typography sx={{ fontWeight: "bold" }}>Years</Typography>
      </InputRow>
    </>
  );
};

export default UserInput;
