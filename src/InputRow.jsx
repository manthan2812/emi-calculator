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
  handleChange,
  children,
}) => {
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
              <InputAdornment position="end">{children}</InputAdornment>
            ),
          },
        }}
        size="small"
        onChange={(e) => handleChange(roundToStep(e.target.value))}
        sx={{
          width: "100%",
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
          <Remove fontSize="small" />
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
        />

        {/* Increase button */}
        <IconButton
          fontSize="small"
          onClick={() => {
            handleChange(roundToStep(value + stepValue));
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InputRow;
