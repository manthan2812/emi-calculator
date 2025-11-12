import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { formatNumber, PRI_COLOR, INT_COLOR } from "../../utils/common";

const LoanChart = ({ principal, interest, total, theme }) => {
  const isDark = theme === "dark";

  const pieData = [
    {
      id: 0,
      value: principal,
      label: "Principal",
      color: PRI_COLOR,
      percentage: (principal / total) * 100,
    },
    {
      id: 1,
      value: interest,
      label: "Interest",
      color: INT_COLOR,
      percentage: (interest / total) * 100,
    },
  ];

  return (
    <PieChart
      series={[
        {
          data: pieData,
          arcLabel: ({ label, percentage }) =>
            `${label}[${percentage.toFixed(0)}%]`,
          valueFormatter: ({ value }) => `${formatNumber(value)}`,
          highlightScope: { fade: "global", highlight: "item" },
          highlighted: { additionalRadius: 3 },
          faded: { additionalRadius: -8, color: isDark ? "#444" : "#e0e0e0" },
          cornerRadius: 3,
          outerRadius: 105,
        },
      ]}
      height={240}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontSize: "11px",
          fill: isDark ? "#e0e0e0" : "#000",
          fontWeight: 600,
        },
      }}
      hideLegend
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 12,
            fill: isDark ? "#e0e0e0" : "#000",
          },
        },
      }}
    />
  );
};

export default LoanChart;
