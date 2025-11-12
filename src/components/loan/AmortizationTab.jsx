import { Tabs, Tab, Box } from "@mui/material";
import { lazy, Suspense } from "react";

// Lazy load the AmortizationTable component
const AmortizationTable = lazy(() => import("./AmortizationTable"));

const AmortizationTab = ({
  tab,
  changeTab,
  emi,
  theme,
  yearlyAmortizationSchedule,
  monthlyAmortizationSchedule,
}) => {
  const isDark = theme === "dark";

  return (
    <Box sx={{ width: "100%", mt: 2, bgcolor: isDark ? "#1a1a1a" : "#fff" }}>
      <Tabs
        value={tab}
        onChange={(_, v) => changeTab(v)}
        centered
        sx={{
          bgcolor: isDark ? "#2a2a2a" : "#f5f5f5",
          borderBottom: `2px solid ${isDark ? "#404040" : "#e0e0e0"}`,
          "& .MuiTab-root": {
            color: isDark ? "#b0b0b0" : "#666",
          },
          "& .MuiTab-root.Mui-selected": {
            color: isDark ? "#e0e0e0" : "#404040",
            fontWeight: "700",
          },
        }}
      >
        <Tab label="Yearly Amortization Schedule" />
        <Tab label="Monthly Amortization Schedule" />
      </Tabs>
      <Suspense fallback={<div>Loading tables...</div>}>
        {tab === 0 && (
          <AmortizationTable
            emi={emi * 12}
            amortizationSchedule={yearlyAmortizationSchedule}
            type="yearly"
            theme={theme}
          />
        )}
        {tab === 1 && (
          <AmortizationTable
            emi={emi}
            amortizationSchedule={monthlyAmortizationSchedule}
            type="monthly"
            theme={theme}
          />
        )}
      </Suspense>
    </Box>
  );
};

export default AmortizationTab;
