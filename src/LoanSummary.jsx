import { formatNumber } from "./Common";
import SummaryRow from "./SummaryRow";

const LoanSummary = ({ emi, principal, interest, total, noOfEmis }) => {
  return (
    <>
      <SummaryRow label="Monthly EMI :" value={formatNumber(emi)} />
      <SummaryRow label="Principal Amount :" value={formatNumber(principal)} />
      <SummaryRow label="Interest Amount :" value={formatNumber(interest)} />
      <SummaryRow label="Total Amount Payable :" value={formatNumber(total)} />
      <SummaryRow label="Number of EMIs :" value={noOfEmis} />
    </>
  );
};

export default LoanSummary;
