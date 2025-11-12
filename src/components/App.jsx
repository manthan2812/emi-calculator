import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import debounce from "lodash.debounce";
import { calculateEmi, calculateAmortization } from "../utils/calculations";
import "../styles/App.css";

// Lazy load components for better initial load time
const Header = lazy(() => import("./common/Header"));
const Footer = lazy(() => import("./common/Footer"));
const TopPanel = lazy(() => import("./loan/TopPanel"));
const AmortizationTab = lazy(() => import("./loan/AmortizationTab"));
const LoadingSpinner = lazy(() => import("./common/LoadingSpinner"));

const App = () => {
  const [principal, setPrincipal] = useState(4000000);
  const [interestRate, setInterestRate] = useState(7.7);
  const [loanTerm, setLoanTerm] = useState(20); // in years
  const [emi, setEmi] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [yearlyAmortizationSchedule, setYearlyAmortizationSchedule] = useState(
    []
  );
  const [monthlyAmortizationSchedule, setMonthlyAmortizationSchedule] =
    useState([]);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      // default to user's system preference when no saved choice
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return "light";
    } catch (e) {
      return "light";
    }
  });

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

  const changeTab = useCallback((newTab) => {
    setActiveTab(newTab);
  }, []);

  const calculateEmiValue = useCallback(async () => {
    return await calculateEmi(principal, interestRate, loanTerm);
  }, [principal, interestRate, loanTerm]);

  useEffect(() => {
    const calculateValues = async () => {
      try {
        const emiValue = await calculateEmiValue();
        const [monthlyAmortizationValue, yearlyAmortizationValue] =
          await calculateAmortization(
            principal,
            interestRate,
            loanTerm,
            emiValue
          );

        setEmi(emiValue);
        setMonthlyAmortizationSchedule(monthlyAmortizationValue);
        setYearlyAmortizationSchedule(yearlyAmortizationValue);
      } catch (error) {
        console.error("Error calculating loan values:", error);
        // Set default values in case of error
        setEmi(0);
        setMonthlyAmortizationSchedule([]);
        setYearlyAmortizationSchedule([]);
      }
    };

    calculateValues();
  }, [principal, interestRate, loanTerm, calculateEmiValue]);

  // Memoize derived calculations
  const derivedValues = useMemo(
    () => ({
      totalInterest: emi * loanTerm * 12 - principal,
      totalAmount: emi * loanTerm * 12,
    }),
    [emi, loanTerm, principal]
  );

  // Apply theme class to document and persist choice
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark-theme");
      else root.classList.remove("dark-theme");
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Header
        title="EMI Calculator"
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <TopPanel
        principal={principal}
        interest={interestRate}
        term={loanTerm}
        emi={emi}
        theme={theme}
        totalInterest={derivedValues.totalInterest}
        totalAmount={derivedValues.totalAmount}
        onPrincipalChange={handlePrincipalChange}
        onInterestChange={handleInterestRateChange}
        onTermChange={handleLoanTermChange}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <AmortizationTab
          tab={activeTab}
          changeTab={changeTab}
          emi={emi}
          theme={theme}
          yearlyAmortizationSchedule={yearlyAmortizationSchedule}
          monthlyAmortizationSchedule={monthlyAmortizationSchedule}
        />
      </Suspense>
      <Footer />
    </Suspense>
  );
};

export default App;
