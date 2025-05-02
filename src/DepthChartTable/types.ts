import { Player } from "../types";

export enum PlayerPositionLabel {
  Starter = "Starter",
  Second = "2nd",
  Third = "3rd",
  Fourth = "4th",
}

type Row = {
  position: string;
  playerArray: Player[];
};

export type DepthChartTableProps = {
  spotLabels: PlayerPositionLabel[];
  rows: Row[];
};
