import { NFLPositions, SoccerPositions } from "../hooks/types";
import { Player } from "../types";

export enum PlayerPositionLabel {
  Starter = "Starter",
  Second = "Second",
  Third = "Third",
  Fourth = "Fourth",
}

type Row = {
  position: string;
  playerArray: Player[];
};

export type DepthChartTableProps = {
  spotLabels: PlayerPositionLabel[];
  rows: Row[];
  handleRemovePlayer: (
    playerIndexToRemove: number,
    position: NFLPositions | SoccerPositions
  ) => void;
};
