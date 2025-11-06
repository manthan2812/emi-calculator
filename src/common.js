const formatNumber = (num) => {
  if (!isFinite(num)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(num));
};

const PRI_COLOR = "#FF7C64";
const INT_COLOR = "#F6AE65";

const MIN_PRINCIPAL = 0;
const MAX_PRINCIPAL = 10000000;
const STEP_PRINCIPAL = 1000;

const MIN_INTEREST = 0;
const MAX_INTEREST = 100;
const STEP_INTEREST = 0.1;

const MIN_TERM = 1;
const MAX_TERM = 30;
const STEP_TERM = 1;

export {
  formatNumber,
  PRI_COLOR,
  INT_COLOR,
  MIN_PRINCIPAL,
  MAX_PRINCIPAL,
  STEP_PRINCIPAL,
  MIN_INTEREST,
  MAX_INTEREST,
  STEP_INTEREST,
  MIN_TERM,
  MAX_TERM,
  STEP_TERM,
};
