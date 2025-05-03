export type Player = {
  id: string;
  name: string;
};

export enum GameType {
  NFL = "NFL",
  SOCCER = "Soccer",
}

export const gameTypeText = "Game type";

export type Spot = -1 | 0 | 1 | 2 | 3;
