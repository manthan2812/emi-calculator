import { Box } from "@mui/material";
import { formatNumber } from "../../utils/common";

const ComponentChart = ({ principal, interest }) => {
  const total = principal + interest;
  const principalPercent = total === 0 ? 0 : (principal / total) * 100;
  const interestPercent = total === 0 ? 0 : (interest / total) * 100;
  const totalWidth = 100;
  const minWidth = 5;
  let principalWidth = Math.max(
    Math.round((principalPercent / 100) * totalWidth),
    minWidth
  );
  let interestWidth = Math.max(
    Math.round((interestPercent / 100) * totalWidth),
    minWidth
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 20,
        width: totalWidth + 10,
        gap: 0.3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FF7C64",
          width: principalWidth,
          borderRadius: 0.5,
          cursor: "pointer",
          height: 18,
          ":hover": {
            backgroundColor: "#ffaea0ff",
            transition: "0.3s",
            height: 20,
          },
        }}
        title={
          formatNumber(principal) + " (" + principalPercent.toFixed(2) + "%)"
        }
      />
      <Box
        sx={{
          backgroundColor: "#F6AE65",
          width: interestWidth,
          borderRadius: 0.5,
          cursor: "pointer",
          height: 18,
          ":hover": {
            backgroundColor: "#fdd2a7ff",
            transition: "0.3s",
            height: 20,
          },
        }}
        title={
          formatNumber(interest) + " (" + interestPercent.toFixed(2) + "%)"
        }
      />
    </Box>
  );
};

export default ComponentChart;
