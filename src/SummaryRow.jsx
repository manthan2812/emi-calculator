import { Box } from "@mui/material";

const SummaryRow = ({ label, value }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: "60%",
          mr: 1,
          textAlign: "right",
          color: "text.secondary",
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
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export default SummaryRow;
