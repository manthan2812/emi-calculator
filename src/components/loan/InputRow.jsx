import {
  Box,
  TextField,
  InputAdornment,
  Slider,
  Stack,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const InputRow = ({
  text,
  minValue,
  maxValue,
  stepValue,
  value,
  theme,
  handleChange,
  children,
}) => {
  const isDark = theme === "dark";
  const marks = [
    {
      value: minValue,
      label: minValue,
    },
    {
      value: Math.floor((minValue + maxValue) / 2),
      label: Math.floor((minValue + maxValue) / 2),
    },
    {
      value: maxValue,
      label: maxValue,
    },
  ];

  // Round a value to the number of decimal places implied by stepValue
  const roundToStep = (value) => {
    // First convert to string and remove leading zeros
    let strValue = String(value).replace(/^0+(?=\d)/, "");

    // Convert cleaned string to number and handle null/undefined
    let num = Number(strValue) || 0;

    // Clamp to min/max
    if (num < minValue) return Number(minValue);
    if (num > maxValue) return Number(maxValue);

    // Get decimal places from step
    const stepStr = String(stepValue);
    const decimals = stepStr.includes(".") ? stepStr.split(".")[1].length : 0;
    return Number(Number(num).toFixed(decimals));
  };

  return (
    <Box>
      <TextField
        label={text}
        type="number"
        value={String(value).replace(/^0+(?=\d)/, "")}
        slotProps={{
          input: {
            inputProps: {
              step: stepValue,
              min: minValue,
              max: maxValue,
            },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ color: isDark ? "#fff" : "#000" }}
              >
                {children}
              </InputAdornment>
            ),
          },
        }}
        size="small"
        onChange={(e) => handleChange(roundToStep(e.target.value))}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            color: isDark ? "#e0e0e0" : "#000",
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            "& fieldset": {
              borderColor: isDark ? "#404040" : "#ccc",
            },
            "&:hover fieldset": {
              borderColor: isDark ? "#505050" : "#999",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF7C64",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: isDark ? "#999" : "#999",
            opacity: 1,
          },
          "& .MuiInputLabel-root": {
            color: isDark ? "#b0b0b0" : "#666",
            "&.Mui-focused": {
              color: "#FF7C64",
            },
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />

      <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        {/* Decrease button*/}
        <IconButton
          fontSize="small"
          onClick={() => {
            handleChange(roundToStep(value - stepValue));
          }}
        >
          <Remove fontSize="small" sx={{ color: isDark ? "#fff" : "#000" }} />
        </IconButton>

        <Slider
          size="small"
          min={minValue}
          max={maxValue}
          step={stepValue}
          value={value}
          marks={marks}
          onChange={(e) => handleChange(roundToStep(e.target.value))}
          valueLabelDisplay="auto"
          sx={{
            color: "#FF7C64",
            "& .MuiSlider-track": {
              backgroundColor: "#FF7C64",
            },
            "& .MuiSlider-rail": {
              backgroundColor: isDark ? "#404040" : "#ccc",
            },
            "& .MuiSlider-mark": {
              backgroundColor: isDark ? "#505050" : "#ccc",
            },
            "& .MuiSlider-markLabel": {
              color: isDark ? "#b0b0b0" : "#666",
              fontSize: "0.75rem",
            },
            "& .MuiSlider-valueLabelLabel": {
              color: isDark ? "#fff" : "#000",
            },
          }}
        />

        {/* Increase button */}
        <IconButton
          fontSize="small"
          onClick={() => {
            handleChange(roundToStep(value + stepValue));
          }}
        >
          <Add fontSize="small" sx={{ color: isDark ? "#fff" : "#000" }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InputRow;
