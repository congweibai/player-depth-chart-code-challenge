import { renderHook } from "@testing-library/react";
import { useGetPlayers } from "../useGetPlayers";

describe("useGetPlayers", () => {
  it("should return an array of players", () => {
    const { result } = renderHook(() => useGetPlayers());
    expect(result.current).toBeDefined();
    expect(result.current.length).toBe(20);
  });
});
