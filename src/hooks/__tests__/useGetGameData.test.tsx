import { renderHook } from "@testing-library/react";
import { useGetGameData } from "../useGetGameData";
import { NFLPositions, SportPositionMap } from "../types";
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

  it("should add player to game", () => {
    const { result } = renderHook(() => useGetGameData(GameType.NFL));
    const { addPlayerToGame } = result.current;
    addPlayerToGame({
      player: { id: "1", name: "John Doe" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 0,
    });
    const { gameData } = result.current;
    const expectedPositions = SportPositionMap[GameType.NFL];
    expect(gameData).toHaveLength(expectedPositions.length);
    expect(gameData[0].playerArray).toHaveLength(1);
    expect(gameData[0].playerArray[0].id).toBe("1");
    expect(gameData[0].playerArray[0].name).toBe("John Doe");

    addPlayerToGame({
      player: { id: "2", name: "Jane Doe" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 0,
    });
    expect(gameData[0].playerArray).toHaveLength(2);
    expect(gameData[0].playerArray[0].id).toBe("2");
    expect(gameData[0].playerArray[0].name).toBe("Jane Doe");
    expect(gameData[0].playerArray[1].id).toBe("1");
    expect(gameData[0].playerArray[1].name).toBe("John Doe");

    addPlayerToGame({
      player: { id: "3", name: "Wyatt Bai" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 3,
    });
    expect(gameData[0].playerArray).toHaveLength(3);
    expect(gameData[0].playerArray[0].id).toBe("2");
    expect(gameData[0].playerArray[0].name).toBe("Jane Doe");
    expect(gameData[0].playerArray[1].id).toBe("1");
    expect(gameData[0].playerArray[1].name).toBe("John Doe");
    expect(gameData[0].playerArray[2].id).toBe("3");
    expect(gameData[0].playerArray[2].name).toBe("Wyatt Bai");
  });

  it("should remove player from game", () => {
    const { result } = renderHook(() => useGetGameData(GameType.NFL));
    const { addPlayerToGame, removePlayerFromGame } = result.current;
    addPlayerToGame({
      player: { id: "1", name: "John Doe" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 0,
    });
    addPlayerToGame({
      player: { id: "2", name: "Jane Doe" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 1,
    });
    addPlayerToGame({
      player: { id: "3", name: "Wyatt Bai" },
      position: NFLPositions.QB,
      gameType: GameType.NFL,
      spot: 3,
    });
    const { gameData } = result.current;
    expect(gameData[0].playerArray).toHaveLength(3);
    expect(gameData[0].playerArray[0].id).toBe("1");
    expect(gameData[0].playerArray[0].name).toBe("John Doe");
    expect(gameData[0].playerArray[1].id).toBe("2");
    expect(gameData[0].playerArray[1].name).toBe("Jane Doe");
    expect(gameData[0].playerArray[2].id).toBe("3");
    expect(gameData[0].playerArray[2].name).toBe("Wyatt Bai");

    removePlayerFromGame({
      playerIndexToRemove: 0,
      position: NFLPositions.QB,
      gameType: GameType.NFL,
    });
    expect(gameData[0].playerArray).toHaveLength(2);
    expect(gameData[0].playerArray[0].id).toBe("2");
    expect(gameData[0].playerArray[0].name).toBe("Jane Doe");
    expect(gameData[0].playerArray[1].id).toBe("3");
    expect(gameData[0].playerArray[1].name).toBe("Wyatt Bai");

    removePlayerFromGame({
      playerIndexToRemove: 0,
      position: NFLPositions.QB,
      gameType: GameType.NFL,
    });
    expect(gameData[0].playerArray).toHaveLength(1);
    expect(gameData[0].playerArray[0].id).toBe("3");
    expect(gameData[0].playerArray[0].name).toBe("Wyatt Bai");
  });
});
