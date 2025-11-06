import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { formatNumber, PRI_COLOR, INT_COLOR } from "./Common";

const LoanChart = ({ principal, interest, total }) => {
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
          faded: { additionalRadius: -8, color: "gray" },
          cornerRadius: 3,
          outerRadius: 105,
        },
      ]}
      height={240}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontSize: "11px",
        },
      }}
      hideLegend
    />
  );
};

export default LoanChart;
