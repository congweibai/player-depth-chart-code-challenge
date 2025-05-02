import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { GameType } from "../types";

describe("Player Depth Chart APP", () => {
  it("should show game type select", () => {
    render(<App />);
    const gameSelector = screen.getByRole("combobox", { name: /Game type/i });
    expect(gameSelector).toBeInTheDocument();
  });

  it("should switch game type after selecting", async () => {
    const user = userEvent.setup();
    render(<App />);
    const gameSelector = screen.getByRole("combobox", { name: /Game type/i });

    expect(gameSelector).toHaveTextContent(GameType.NFL);
    expect(gameSelector).not.toHaveTextContent(GameType.SOCCER);

    await user.click(gameSelector);
    const soccerOption = await screen.findByRole("option", { name: /Soccer/i });
    const nflOption = await screen.findByRole("option", { name: /NFL/i });
    expect(soccerOption).toBeVisible();
    expect(nflOption).toBeVisible();
    await user.click(soccerOption);

    expect(gameSelector).toHaveTextContent(GameType.SOCCER);
    expect(gameSelector).not.toHaveTextContent(GameType.NFL);
  });
});
