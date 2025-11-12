// Pre-calculate commonly used values
const MONTHS_IN_YEAR = 12;
const PERCENT_TO_DECIMAL = 100;

// Optimized power function for positive integer exponents
const fastPow = (base, exponent) => {
  if (exponent === 0) return 1;
  if (exponent === 1) return base;

  let result = 1;
  while (exponent > 0) {
    if (exponent & 1) result *= base;
    base *= base;
    exponent >>= 1;
  }
  return result;
};

const calculateEmi = (principal, interestRate, loanTerm) => {
  // Handle zero interest rate case
  if (interestRate === 0) {
    return principal / (loanTerm * MONTHS_IN_YEAR);
  }

  const monthlyInterestRate =
    interestRate / PERCENT_TO_DECIMAL / MONTHS_IN_YEAR;
  const numberOfPayments = loanTerm * MONTHS_IN_YEAR;

  // Optimize Math.pow calls by calculating once
  const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);

  return (principal * monthlyInterestRate * factor) / (factor - 1);
};

const calculateAmortization = (principal, interestRate, loanTerm, emiValue) => {
  const totalMonths = loanTerm * MONTHS_IN_YEAR;

  // Handle zero interest rate case
  if (interestRate === 0) {
    const monthlyPrincipal = principal / totalMonths;
    const monthlyAmortization = new Array(totalMonths);
    const yearlyAmortization = new Array(loanTerm);
    let remainingPrincipal = principal;

    // Calculate monthly schedule for zero interest
    for (let i = 0; i < totalMonths; i++) {
      monthlyAmortization[i] = {
        openingBalance: remainingPrincipal,
        principalPaid: monthlyPrincipal,
        interestPaid: 0,
        closingBalance: remainingPrincipal - monthlyPrincipal,
      };
      remainingPrincipal -= monthlyPrincipal;
    }

    // Calculate yearly schedule for zero interest
    for (let year = 0; year < loanTerm; year++) {
      const yearStartIndex = year * MONTHS_IN_YEAR;
      yearlyAmortization[year] = {
        openingBalance:
          year === 0
            ? principal
            : monthlyAmortization[yearStartIndex].openingBalance,
        principalPaid: monthlyPrincipal * MONTHS_IN_YEAR,
        interestPaid: 0,
        closingBalance:
          monthlyAmortization[
            Math.min((year + 1) * MONTHS_IN_YEAR - 1, totalMonths - 1)
          ].closingBalance,
      };
    }

    return [monthlyAmortization, yearlyAmortization];
  }

  const monthlyInterestRate =
    interestRate / PERCENT_TO_DECIMAL / MONTHS_IN_YEAR;

  // Pre-allocate arrays with correct size
  const monthlyAmortization = new Array(totalMonths);
  const yearlyAmortization = new Array(loanTerm);

  let currentPrincipal = principal;
  let yearlyPrincipalSum = 0;
  let yearlyInterestSum = 0;

  // Use TypedArrays for better performance with floating-point calculations
  const monthlyInterests = new Float64Array(MONTHS_IN_YEAR);
  const principalPaid = new Float64Array(MONTHS_IN_YEAR);

  for (let year = 0; year < loanTerm; year++) {
    const yearStartIndex = year * MONTHS_IN_YEAR;
    const yearOpeningBalance = currentPrincipal;

    // Calculate monthly values for the entire year
    for (let month = 0; month < MONTHS_IN_YEAR; month++) {
      const monthIndex = yearStartIndex + month;
      const monthlyInterest = currentPrincipal * monthlyInterestRate;
      const principal = emiValue - monthlyInterest;

      monthlyInterests[month] = monthlyInterest;
      principalPaid[month] = principal;

      monthlyAmortization[monthIndex] = {
        openingBalance: currentPrincipal,
        principalPaid: principal,
        interestPaid: monthlyInterest,
        closingBalance: currentPrincipal - principal,
      };

      currentPrincipal -= principal;
    }

    // Efficient sum using TypedArrays
    yearlyPrincipalSum = principalPaid.reduce((a, b) => a + b, 0);
    yearlyInterestSum = monthlyInterests.reduce((a, b) => a + b, 0);

    yearlyAmortization[year] = {
      openingBalance: yearOpeningBalance,
      principalPaid: yearlyPrincipalSum,
      interestPaid: yearlyInterestSum,
      closingBalance: currentPrincipal,
    };
  }

  return [monthlyAmortization, yearlyAmortization];
};

// Handle worker messages
self.onmessage = (e) => {
  const { type, data } = e.data;

  switch (type) {
    case "emi":
      const emi = calculateEmi(
        data.principal,
        data.interestRate,
        data.loanTerm
      );
      self.postMessage({ type: "emi", result: emi });
      break;

    case "amortization":
      const [monthly, yearly] = calculateAmortization(
        data.principal,
        data.interestRate,
        data.loanTerm,
        data.emiValue
      );
      self.postMessage({ type: "amortization", result: [monthly, yearly] });
      break;
  }
};
