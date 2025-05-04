import { useState } from "react";
import { PlayerPositionLabel } from "../DepthChartTable/types";
import { GameType, Player, Spot } from "../types";
import { NFLPositions, SoccerPositions, SportPositionMap } from "./types";
import { insertWithMaxLength, removeItemAtIndex } from "./utils";

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
  const [gameWholeData, setGameWholeData] = useState({
    [GameType.NFL]: SportPositionMap[GameType.NFL].map((position) => {
      return createDefaultData(position, []);
    }),
    [GameType.SOCCER]: SportPositionMap[GameType.SOCCER].map((position) => {
      return createDefaultData(position, []);
    }),
  });

  if (!SportPositionMap[gameType]) {
    throw new Error(`Unsupported game type: ${gameType}`);
  }

  const gameData = gameWholeData[gameType];

  const addPlayerToGame = ({
    player,
    position,
    gameType,
    spot,
  }: {
    player: Player;
    position: NFLPositions | SoccerPositions;
    gameType: GameType;
    spot: Spot;
  }) => {
    const newGameData = gameWholeData[gameType].slice();
    const positionIndex = newGameData.findIndex(
      (row) => row.position === position
    );
    if (positionIndex === -1) {
      throw new Error(`Position not found: ${position}`);
    }
    const maxLength = spotLabels.length;
    newGameData[positionIndex].playerArray = insertWithMaxLength(
      newGameData[positionIndex].playerArray,
      player,
      spot,
      maxLength
    );
    setGameWholeData({ ...gameWholeData, [gameType]: newGameData });
  };

  const removePlayerFromGame = ({
    playerIndexToRemove,
    position,
    gameType,
  }: {
    playerIndexToRemove: number;
    position: NFLPositions | SoccerPositions;
    gameType: GameType;
  }) => {
    const newGameData = gameWholeData[gameType].slice();
    const positionIndex = newGameData.findIndex(
      (row) => row.position === position
    );
    if (positionIndex === -1) {
      throw new Error(`Position not found: ${position}`);
    }
    newGameData[positionIndex].playerArray = removeItemAtIndex(
      newGameData[positionIndex].playerArray,
      playerIndexToRemove
    );
    setGameWholeData({ ...gameWholeData, [gameType]: newGameData });
  };

  return {
    gameData,
    spotLabels,
    addPlayerToGame,
    removePlayerFromGame,
  };
};
