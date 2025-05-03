import { faker } from "@faker-js/faker";
import { Player } from "../types";
import { useMemo } from "react";

export function createRandomPlayer(): Player {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  };
}

export const useGetPlayers = () => {
  const players = useMemo(
    () =>
      faker.helpers.multiple(createRandomPlayer, {
        count: 20,
      }),
    []
  );
  return players;
};
