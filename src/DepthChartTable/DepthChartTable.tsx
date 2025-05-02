import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DepthChartTableProps } from "./types";

export const DepthChartTable = ({
  positionLabels,
  rows,
}: DepthChartTableProps) => {
  const maxPlayerCount = positionLabels.length;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {positionLabels.map((label, index) => (
              <TableCell key={index} align="center">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.position}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.position}
              </TableCell>
              {Array.from({ length: maxPlayerCount }).map((_, index) => {
                const player = row.playerArray[index];
                return (
                  <TableCell key={index} align="center">
                    {player ? player.name : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
