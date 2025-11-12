import { CircularProgress, Box } from "@mui/material";

// Loading component with centered spinner
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 9999,
    }}
  >
    <CircularProgress
      size={60}
      thickness={4}
      sx={{
        color: "#FF7C64", // Using your primary color
      }}
    />
  </Box>
);

export default LoadingSpinner;
