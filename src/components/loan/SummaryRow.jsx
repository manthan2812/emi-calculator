import { Box } from "@mui/material";

const SummaryRow = ({ label, value, theme }) => {
  const isDark = theme === "dark";

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: "60%",
          mr: 1,
          textAlign: "right",
          color: isDark ? "#b0b0b0" : "#666",
        }}
      >
        {label}
      </Box>
      <Box
        sx={{
          width: "40%",
          ml: 1,
          fontWeight: 700,
          textAlign: "left",
          fontSize: "1.4rem",
          color: isDark ? "#e0e0e0" : "#212121",
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export default SummaryRow;
