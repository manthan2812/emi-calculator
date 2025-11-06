import { formatNumber } from "./Common";
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
  TablePagination,
} from "@mui/material";

const AmortizationTable = ({ title, amortizationSchedule, type }) => {
  return (
    <Box sx={{ m: 4, textAlign: "center" }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="loan payment table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>
                {type === "monthly" ? "Month" : "Year"}
              </TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Opening Balance</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>
                {type === "monthly" ? "EMI" : "EMI * 12"}
              </TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Principal Paid</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Interest Paid</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Closing Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule.map((row) => (
              <TableRow key={row.base}>
                <TableCell>{row.base}</TableCell>
                <TableCell>{formatNumber(row.openingBalance)}</TableCell>
                <TableCell>{formatNumber(row.emi)}</TableCell>
                <TableCell>{formatNumber(row.principalPaid)}</TableCell>
                <TableCell>{formatNumber(row.interestPaid)}</TableCell>
                <TableCell>{formatNumber(row.closingBalance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AmortizationTable;
