import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DepthChartTable } from "./DepthChartTable/DepthChartTable";
import { GameType, gameTypeText } from "./types";
import { useGetGameData } from "./hooks";
import { useState } from "react";
import { AddPlayerToGameForm } from "./AddPlayerToGameForm/AddPlayerToGameForm";
import { NFLPositions, SoccerPositions } from "./hooks/types";

function App() {
  const [gameType, setGameType] = useState<GameType>(GameType.NFL);
  const { gameData, spotLabels, addPlayerToGame, removePlayerFromGame } =
    useGetGameData(gameType);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setGameType(event.target.value as GameType);
  };

  const onHandleRemovePlayer = (
    indexToRemove: number,
    position: NFLPositions | SoccerPositions
  ) => {
    removePlayerFromGame({
      playerIndexToRemove: indexToRemove,
      position,
      gameType,
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Box
          sx={{
            background: "white",
            width: "420px",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <AddPlayerToGameForm
            addPlayerToGame={addPlayerToGame}
            gameType={gameType}
            gameData={gameData}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          marginBottom={2}
        >
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 220, background: "white" }}
          >
            <InputLabel id="game-type-select-label">{gameTypeText}</InputLabel>
            <Select
              labelId="game-type-select-label"
              id="game-type-select"
              value={gameType}
              onChange={handleChange}
              label={gameTypeText}
            >
              <MenuItem value={GameType.NFL}> {GameType.NFL}</MenuItem>
              <MenuItem value={GameType.SOCCER}> {GameType.SOCCER}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <DepthChartTable
        spotLabels={spotLabels}
        rows={gameData}
        handleRemovePlayer={onHandleRemovePlayer}
      />
    </>
  );
}

export default App;
