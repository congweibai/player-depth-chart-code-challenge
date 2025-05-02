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

function App() {
  const [gameType, setGameType] = useState<GameType>(GameType.NFL);
  const { gameData, spotLabels } = useGetGameData(gameType);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setGameType(event.target.value as GameType);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
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
      <DepthChartTable spotLabels={spotLabels} rows={gameData} />
    </>
  );
}

export default App;
