import { render, screen } from "@testing-library/react";
import { AddPlayerToGameForm } from "../AddPlayerToGameForm";
import { GameType } from "../../types";
import userEvent from "@testing-library/user-event";

describe("AddPlayerToGameForm", () => {
  it("should render two selector and a button", () => {
    const mockAddPlayerToGame = vitest.fn();
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
      />
    );

    const playerSelect = screen.getByLabelText(/select player/i);
    const positionSelect = screen.getByLabelText(/select position/i);
    const spotSelect = screen.getByLabelText(/select spot/i);
    const addPlayerButton = screen.getByRole("button", {
      name: /add player to game/i,
    });
    expect(playerSelect).toBeInTheDocument();
    expect(positionSelect).toBeInTheDocument();
    expect(spotSelect).toBeInTheDocument();
    expect(addPlayerButton).toBeInTheDocument();
  });

  it("should disable add player button if no player is selected", () => {
    const mockAddPlayerToGame = vitest.fn();
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
      />
    );
    const addPlayerButton = screen.getByRole("button", {
      name: /add player to game/i,
    });
    expect(addPlayerButton).toBeDisabled();
  });

  it("should submit form with only player, position", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    render(
      <AddPlayerToGameForm
        gameType={GameType.SOCCER}
        addPlayerToGame={mockAddPlayerToGame}
      />
    );
    const playerSelect = screen.getByLabelText(/select player/i);
    await user.click(playerSelect);
    const options = await screen.findAllByRole("option");
    await user.click(options[0]);
    expect(
      screen.getByRole("button", {
        name: /add player to game/i,
      })
    ).toBeDisabled();

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = await screen.findAllByRole("option");
    await user.click(positionOptions[0]);
    expect(
      screen.getByRole("button", {
        name: /add player to game/i,
      })
    ).toBeEnabled();
    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);
    const spotOptions = await screen.findAllByRole("option");
    await user.click(spotOptions[0]);
    const submitButton = screen.getByRole("button", {
      name: /add player to game/i,
    });
    await user.click(submitButton);
    expect(mockAddPlayerToGame).toHaveBeenCalled();
    expect(mockAddPlayerToGame).toHaveBeenCalledWith({
      player: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
      }),
      position: "GK",
      spot: 0,
      gameType: GameType.SOCCER,
    });
  });
});
