import { formatNumber } from "../../utils/common";
import SummaryRow from "./SummaryRow";

const LoanSummary = ({ emi, principal, interest, total, noOfEmis, theme }) => {
  return (
    <>
      <SummaryRow
        label="Monthly EMI :"
        value={formatNumber(emi)}
        theme={theme}
      />
      <SummaryRow
        label="Principal Amount :"
        value={formatNumber(principal)}
        theme={theme}
      />
      <SummaryRow
        label="Interest Amount :"
        value={formatNumber(interest)}
        theme={theme}
      />
      <SummaryRow
        label="Total Amount Payable :"
        value={formatNumber(total)}
        theme={theme}
      />
      <SummaryRow label="Number of EMIs :" value={noOfEmis} theme={theme} />
    </>
  );
};

export default LoanSummary;
