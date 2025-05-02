import { PlayerPositionLabel } from "../DepthChartTable/types";
import { GameType, Player } from "../types";
import { SportPositionMap } from "./types";

function createDefaultData(position: string, playerArray: Player[]) {
  return {
    position,
    playerArray,
  };
}

const spotLabels = [
  PlayerPositionLabel.Starter,
  PlayerPositionLabel.Second,
  PlayerPositionLabel.Third,
  PlayerPositionLabel.Fourth,
];

export const useGetGameData = (gameType: GameType) => {
  const gamePositions = SportPositionMap[gameType];

  if (!SportPositionMap[gameType]) {
    throw new Error(`Unsupported game type: ${gameType}`);
  }

  const gameData = gamePositions.map((position) => {
    return createDefaultData(position, []);
  });

  return {
    gameData,
    spotLabels,
  };
};
