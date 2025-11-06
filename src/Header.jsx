import { Box } from "@mui/material";
import { Calculate } from "@mui/icons-material";

const Header = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        p: 1,
      }}
    >
      <Calculate fontSize="large" />
      <Box sx={{ m: "0", fontWeight: 700, fontSize: "2rem" }}>{title}</Box>
    </Box>
  );
};

export default Header;
