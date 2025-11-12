import { Box } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";

const Header = ({ title, theme, onToggleTheme }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 2,
        p: 1,
      }}
    >
      <Box /> {/* Left spacer */}
      <Box sx={{ fontWeight: 700, fontSize: "2rem", textAlign: "center" }}>
        {title}
      </Box>
      <Box sx={{ justifySelf: "end" }}>
        <ThemeSwitch checked={theme === "dark"} onChange={onToggleTheme} />
      </Box>
    </Box>
  );
};

export default Header;
