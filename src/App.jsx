import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import debounce from "lodash.debounce";
import Header from "./Header";
import Footer from "./Footer";
import TopPanel from "./TopPanel";
import "./App.css";

// Lazy load the AmortizationTable component
const AmortizationTable = lazy(() => import("./AmortizationTable"));

const App = () => {
  const [principal, setPrincipal] = useState(4000000);
  const [interestRate, setInterestRate] = useState(7.7);
  const [loanTerm, setLoanTerm] = useState(20); // in years
  const [emi, setEmi] = useState(0);
  const [yearlyAmortizationSchedule, setYearlyAmortizationSchedule] = useState(
    []
  );
  const [monthlyAmortizationSchedule, setMonthlyAmortizationSchedule] =
    useState([]);

  // Debounced handlers for better performance
  const handlePrincipalChange = useCallback(
    debounce((value) => {
      setPrincipal(value);
    }, 300),
    []
  );

  const handleInterestRateChange = useCallback(
    debounce((value) => {
      setInterestRate(value);
    }, 300),
    []
  );

  const handleLoanTermChange = useCallback(
    debounce((value) => {
      setLoanTerm(value);
    }, 300),
    []
  );

  const calculateEmi = useCallback(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return emi;
  }, [principal, interestRate, loanTerm]);

  const calculateAmortization = (
    principal,
    interestRate,
    loanTerm,
    emiValue
  ) => {
    let monthlyAmortization = [];
    let yearlyAmortization = [];

    // Pre-calculate monthly interest rate
    const monthlyInterestRate = interestRate / (100 * 12);

    // Variables for yearly accumulation
    let yearlyPrincipalSum = 0;
    let yearlyInterestSum = 0;
    let currentPrincipal = principal;

    for (let i = 0; i < loanTerm * 12; i++) {
      // Monthly calculations
      const monthlyInterest = currentPrincipal * monthlyInterestRate;
      const principalPaid = emiValue - monthlyInterest;
      const closingBalance = currentPrincipal - principalPaid;

      // Accumulate yearly totals
      yearlyPrincipalSum += principalPaid;
      yearlyInterestSum += monthlyInterest;

      monthlyAmortization.push({
        base: i + 1,
        openingBalance: currentPrincipal,
        emi: emiValue,
        principalPaid,
        interestPaid: monthlyInterest,
        closingBalance,
      });

      // Yearly calculations - now without expensive slice/reduce operations
      if ((i + 1) % 12 === 0) {
        const yearIndex = (i + 1) / 12 - 1;
        const yearOpeningBalance =
          yearIndex === 0
            ? principal
            : yearlyAmortization[yearIndex - 1].closingBalance;

        yearlyAmortization.push({
          base: yearIndex + 1,
          openingBalance: yearOpeningBalance,
          emi: emiValue * 12,
          principalPaid: yearlyPrincipalSum,
          interestPaid: yearlyInterestSum,
          closingBalance,
        });

        // Reset yearly accumulators
        yearlyPrincipalSum = 0;
        yearlyInterestSum = 0;
      }

      currentPrincipal = closingBalance;
    }
    return [monthlyAmortization, yearlyAmortization];
  };

  useEffect(() => {
    const emiValue = calculateEmi();
    const [monthlyAmortizationValue, yearlyAmortizationValue] =
      calculateAmortization(principal, interestRate, loanTerm, emiValue);

    setEmi(emiValue);
    setMonthlyAmortizationSchedule(monthlyAmortizationValue);
    setYearlyAmortizationSchedule(yearlyAmortizationValue);
  }, [principal, interestRate, loanTerm]);

  // Memoize derived calculations
  const derivedValues = useMemo(
    () => ({
      totalInterest: emi * loanTerm * 12 - principal,
      totalAmount: emi * loanTerm * 12,
    }),
    [emi, loanTerm, principal]
  );

  return (
    <>
      <Header title="EMI Calculator" />
      <TopPanel
        principal={principal}
        interest={interestRate}
        term={loanTerm}
        emi={emi}
        totalInterest={derivedValues.totalInterest}
        totalAmount={derivedValues.totalAmount}
        onPrincipalChange={handlePrincipalChange}
        onInterestChange={handleInterestRateChange}
        onTermChange={handleLoanTermChange}
      />

      <Suspense fallback={<div>Loading tables...</div>}>
        <AmortizationTable
          title="Yearly Amortization Schedule"
          amortizationSchedule={yearlyAmortizationSchedule}
          type="yearly"
        />
        <AmortizationTable
          title="Monthly Amortization Schedule"
          amortizationSchedule={monthlyAmortizationSchedule}
          type="monthly"
        />
      </Suspense>

      <Footer />
    </>
  );
};

export default App;
