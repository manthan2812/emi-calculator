import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        fontSize: "0.8rem",
        textAlign: "center",
        color: "text.secondary",
        p: 0.5,
        display: "flex",
        flexDirection: "column",
        gap: 0.6,
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontStyle: "italic" }}>
        Note: The calculations are approximate and may vary based on actual bank
        policies.
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        © {new Date().getFullYear()} EMI Calculator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
