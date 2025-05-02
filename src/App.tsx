import { Box, Button, ButtonGroup } from "@mui/material";
import { DepthChartTable } from "./DepthChartTable/DepthChartTable";
import { PlayerPositionLabel } from "./DepthChartTable/types";
import { GameType } from "./types";

function createData(
  position: string,
  playerArray: {
    id: string;
    name: string;
  }[]
) {
  return {
    position,
    playerArray,
  };
}

const rows = [
  createData("QB", [
    {
      id: "1",
      name: "Tom Brady",
    },
    {
      id: "2",
      name: "Cam Newton",
    },
  ]),
  createData("WR", []),
  createData("RB", []),
  createData("TE", []),
  createData("K", []),
  createData("P", [
    {
      id: "1",
      name: "Tom Brady",
    },
    {
      id: "2",
      name: "Cam Newton",
    },
    {
      id: "3",
      name: "Wyatt Newton",
    },
    {
      id: "2",
      name: "Jasmine Newton",
    },
  ]),
  createData("KR", []),
  createData("PR", []),
];

function App() {
  const positionLabels = [
    PlayerPositionLabel.Starter,
    PlayerPositionLabel.Second,
    PlayerPositionLabel.Third,
    PlayerPositionLabel.Fourth,
  ];
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button>{GameType.NFL}</Button>
          <Button>{GameType.SOCCER}</Button>
        </ButtonGroup>
      </Box>
      <DepthChartTable positionLabels={positionLabels} rows={rows} />
    </>
  );
}

export default App;
