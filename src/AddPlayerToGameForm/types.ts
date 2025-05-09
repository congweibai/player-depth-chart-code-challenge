import { PlayerPositionLabel } from "../DepthChartTable/types";
import { NFLPositions, SoccerPositions } from "../hooks/types";
import { GameType, Player, Spot } from "../types";

export type AddPlayerToGameFormInputs = {
  spot: Spot;
  position: NFLPositions | SoccerPositions;
  player: Player | null;
};

export type PositionOption = {
  label: NFLPositions | SoccerPositions;
  value: NFLPositions | SoccerPositions;
};

export type PlayerOption = {
  label: string;
  value: Player;
};

export const spotLabelPair = [
  PlayerPositionLabel.Starter,
  PlayerPositionLabel.Second,
  PlayerPositionLabel.Third,
  PlayerPositionLabel.Fourth,
];

export type SpotOption = {
  label: string;
  value: Spot;
};

export type AddPlayerToGameFormProps = {
  gameType: GameType;
  addPlayerToGame: ({
    player,
    position,
    gameType,
    spot,
  }: {
    player: Player;
    position: NFLPositions | SoccerPositions;
    gameType: GameType;
    spot: Spot;
  }) => void;
  gameData: {
    position: string;
    playerArray: Player[];
  }[];
};
