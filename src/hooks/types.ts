import { GameType } from "../types";

export enum NFLPositions {
  QB = "QB",
  WR = "WR",
  RB = "RB",
  TE = "TE",
  K = "K",
  P = "P",
  KR = "KR",
  PR = "PR",
}

export enum SoccerPositions {
  GK = "GK",
  RB = "RB",
  LB = "LB",
  CDM = "CDM",
  CAM = "CAM",
  RW = "RW",
  LW = "LW",
  SS = "SS",
  ST = "ST",
}

export const SportPositionMap = {
  [GameType.NFL]: Object.values(NFLPositions),
  [GameType.SOCCER]: Object.values(SoccerPositions),
} as const;
