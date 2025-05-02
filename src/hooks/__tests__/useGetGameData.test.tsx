import { renderHook } from "@testing-library/react";
import { useGetGameData } from "../useGetGameData";
import { SportPositionMap } from "../types";
import { GameType } from "../../types";
import { PlayerPositionLabel } from "../../DepthChartTable/types";

describe("useGetGameData", () => {
  const supportedGameTypes = Object.keys(SportPositionMap) as GameType[];

  supportedGameTypes.forEach((gameType) => {
    it("should throw error for unsupported game type", () => {
      expect(() =>
        // @ts-expect-error testing invalid input
        renderHook(() => useGetGameData("cricket"))
      ).toThrowError("Unsupported game type: cricket");
    });

    it(`should return correct data for game type "${gameType}"`, () => {
      const { result } = renderHook(() => useGetGameData(gameType));

      const { gameData, spotLabels } = result.current;
      const expectedPositions = SportPositionMap[gameType];

      expect(gameData).toHaveLength(expectedPositions.length);

      gameData.forEach((row, index) => {
        expect(row.position).toBe(expectedPositions[index]);
        expect(row.playerArray).toHaveLength(0);
      });

      expect(spotLabels).toEqual([
        PlayerPositionLabel.Starter,
        PlayerPositionLabel.Second,
        PlayerPositionLabel.Third,
        PlayerPositionLabel.Fourth,
      ]);
    });
  });
});
