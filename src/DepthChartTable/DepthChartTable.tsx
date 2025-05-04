import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DepthChartTableProps } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useConfirmModal } from "../hooks";
import { useRef } from "react";
import { Player } from "../types";
import { NFLPositions, SoccerPositions } from "../hooks/types";

export const DepthChartTable = ({
  spotLabels,
  rows,
  handleRemovePlayer,
}: DepthChartTableProps) => {
  const { showDeleteConfirmation, handleClose, handleOpenConfirmModal } =
    useConfirmModal();

  const activePlayer = useRef<{
    player: Player;
    position: NFLPositions | SoccerPositions;
    indexToRemove: number;
  }>(null);

  const maxPlayerCount = spotLabels.length;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {spotLabels.map((label, index) => (
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
                      {player ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {player.name}
                          <IconButton
                            onClick={() => {
                              const activeItem = {
                                player,
                                position: row.position as
                                  | NFLPositions
                                  | SoccerPositions,
                                indexToRemove: index,
                              };
                              activePlayer.current = activeItem;
                              handleOpenConfirmModal();
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showDeleteConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Do you want to remove this player: ${activePlayer.current?.player.name} from position: ${activePlayer.current?.position}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              if (activePlayer.current) {
                handleRemovePlayer(
                  activePlayer.current?.indexToRemove,
                  activePlayer.current?.position
                );
              }
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
