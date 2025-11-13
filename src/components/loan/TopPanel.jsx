import { Box } from "@mui/material";
import UserInput from "./UserInput";
import LoanSummary from "./LoanSummary";
import LoanChart from "./LoanChart";

const TopPanel = ({
  principal,
  interest,
  term,
  emi,
  totalInterest,
  totalAmount,
  onPrincipalChange,
  onInterestChange,
  onTermChange,
  theme,
}) => {
  const isDark = theme === "dark";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        p: 1,
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
          py: 1,
          gap: 5,
        }}
      >
        <UserInput
          principal={principal}
          interest={interest}
          term={term}
          theme={theme}
          onPrincipalChange={onPrincipalChange}
          onInterestChange={onInterestChange}
          onTermChange={onTermChange}
        />
      </Box>
      <Box
        sx={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          lineHeight: "2rem",
          fontSize: "1.1rem",
        }}
      >
        <LoanSummary
          emi={emi}
          principal={principal}
          interest={totalInterest}
          total={totalAmount}
          noOfEmis={term * 12}
          theme={theme}
        />
      </Box>
      <Box sx={{ width: "25%" }}>
        <LoanChart
          principal={principal}
          interest={totalInterest}
          total={totalAmount}
          theme={theme}
        />
      </Box>
    </Box>
  );
};

export default TopPanel;
