import { formatNumber } from "../../utils/common";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AmortizationTable = ({ emi, amortizationSchedule, type, theme }) => {
  const isDark = theme === "dark";

  return (
    <Box sx={{ m: 4, textAlign: "center" }}>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: isDark ? "#2a2a2a" : "#fff",
          boxShadow: isDark
            ? "0 4px 12px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Table size="small" aria-label="loan payment table">
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? "#1e1e1e" : "#f5f5f5" }}>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                {type === "monthly" ? "Month" : "Year"}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                Opening Balance
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                {type === "monthly" ? "EMI" : "EMI * 12"}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                Principal Paid
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                Interest Paid
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                Closing Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  bgcolor: isDark ? "#2a2a2a" : "#fff",
                  "&:hover": { bgcolor: isDark ? "#3a3a3a" : "#f9f9f9" },
                  borderColor: isDark ? "#404040" : "#e0e0e0",
                }}
              >
                <TableCell
                  sx={{
                    color: isDark ? "#e0e0e0" : "#212121",
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    color: isDark ? "#e0e0e0" : "#212121",
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {formatNumber(row.openingBalance)}
                </TableCell>
                <TableCell
                  sx={{
                    color: isDark ? "#e0e0e0" : "#212121",
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {formatNumber(emi)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FF7C64",
                    fontWeight: 500,
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {formatNumber(row.principalPaid)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#F6AE65",
                    fontWeight: 500,
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {formatNumber(row.interestPaid)}
                </TableCell>
                <TableCell
                  sx={{
                    color: isDark ? "#e0e0e0" : "#212121",
                    borderColor: isDark ? "#404040" : "#e0e0e0",
                  }}
                >
                  {formatNumber(row.closingBalance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AmortizationTable;
