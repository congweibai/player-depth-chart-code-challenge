import { render, screen } from "@testing-library/react";
import { AddPlayerToGameForm } from "../AddPlayerToGameForm";
import { GameType } from "../../types";
import userEvent from "@testing-library/user-event";
import { useGetPlayers } from "../../hooks/useGetPlayers";
import { Mock } from "vitest";

vi.mock("../../hooks/useGetPlayers");
const mockUseGetPlayers = vi.fn();

describe("AddPlayerToGameForm", () => {
  beforeEach(() => {
    (useGetPlayers as Mock).mockReturnValue([
      { id: "1", name: "Player One" },
      { id: "2", name: "Player Two" },
      { id: "3", name: "Player Three" },
      { id: "4", name: "Player Four" },
    ]);
  });
  it("should render two selector and a button", () => {
    const mockAddPlayerToGame = vitest.fn();
    const mockGameData = [
      {
        position: "QB",
        playerArray: [],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
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
    const mockGameData = [
      {
        position: "QB",
        playerArray: [],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
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
    const mockGameData = [
      {
        position: "QB",
        playerArray: [],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.SOCCER}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
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

  it("should show all spot options if spot list is full ", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "QB",
        playerArray: [
          {
            id: "ad271761-2a94-4591-98b0-ac42322807a4",
            name: "Lee Harvey",
          },
          {
            id: "ba813bfb-1ed3-4c5e-8369-7abc18abcdef",
            name: "Amber Gislason",
          },
          {
            id: "40da055f-0ced-49ba-9bcd-367aa39f137f",
            name: "Marta Heller",
          },
          {
            id: "ecdf5d9b-14f4-4182-a6fa-14ea8f3f119b",
            name: "Hope Von DVM",
          },
        ],
      },
      {
        position: "WR",
        playerArray: [
          {
            id: "6ac7b725-c31d-4f71-ae39-8b552d3dabc8",
            name: "Duane Schulist",
          },
          {
            id: "d549e810-f3ea-4691-a190-d9739f5b6813",
            name: "Lyle Feest",
          },
          {
            id: "6083b329-5c2f-400c-8c0e-7528aac5bc5b",
            name: "Ben Hoeger",
          },
        ],
      },
      {
        position: "RB",
        playerArray: [
          {
            id: "0dac2110-fe60-4129-9394-540e596337ec",
            name: "Adrienne Barton",
          },
        ],
      },
      {
        position: "TE",
        playerArray: [
          {
            id: "0dac2110-fe60-4129-9394-540e596337ec",
            name: "Adrienne Barton",
          },
        ],
      },
      {
        position: "K",
        playerArray: [
          {
            id: "ecdf5d9b-14f4-4182-a6fa-14ea8f3f119b",
            name: "Hope Von DVM",
          },
        ],
      },
      {
        position: "P",
        playerArray: [],
      },
      {
        position: "KR",
        playerArray: [],
      },
      {
        position: "PR",
        playerArray: [],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /QB/i });
    await user.click(positionOptions);

    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);
    const starterOption = screen.getByRole("option", {
      name: /Starter/i,
    });
    expect(starterOption).toBeInTheDocument();

    const secondOption = screen.getByRole("option", {
      name: /Second/i,
    });
    expect(secondOption).toBeInTheDocument();

    const thirdOption = screen.getByRole("option", {
      name: /Third/i,
    });
    expect(thirdOption).toBeInTheDocument();

    const fourthOption = screen.getByRole("option", {
      name: /Fourth/i,
    });
    expect(fourthOption).toBeInTheDocument();
  });

  it("should show all spot options if spot list has three items", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "WR",
        playerArray: [
          {
            id: "ad271761-2a94-4591-98b0-ac42322807a4",
            name: "Lee Harvey",
          },
          {
            id: "ba813bfb-1ed3-4c5e-8369-7abc18abcdef",
            name: "Amber Gislason",
          },
          {
            id: "40da055f-0ced-49ba-9bcd-367aa39f137f",
            name: "Marta Heller",
          },
        ],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /WR/i });
    await user.click(positionOptions);

    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);
    const starterOption = screen.getByRole("option", {
      name: /Starter/i,
    });
    expect(starterOption).toBeInTheDocument();

    const secondOption = screen.getByRole("option", {
      name: /Second/i,
    });
    expect(secondOption).toBeInTheDocument();

    const thirdOption = screen.getByRole("option", {
      name: /Third/i,
    });
    expect(thirdOption).toBeInTheDocument();

    const fourthOption = screen.getByRole("option", {
      name: /Fourth/i,
    });
    expect(fourthOption).toBeInTheDocument();
  });

  it("should show three spot options if spot list has two items", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "PR",
        playerArray: [
          {
            id: "ad271761-2a94-4591-98b0-ac42322807a4",
            name: "Lee Harvey",
          },
          {
            id: "ba813bfb-1ed3-4c5e-8369-7abc18abcdef",
            name: "Amber Gislason",
          },
        ],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /PR/i });
    await user.click(positionOptions);

    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);

    const starterOption = screen.getByRole("option", {
      name: /Starter/i,
    });
    expect(starterOption).toBeInTheDocument();
    const secondOption = screen.getByRole("option", {
      name: /Second/i,
    });

    expect(secondOption).toBeInTheDocument();
    const thirdOption = screen.getByRole("option", {
      name: /Third/i,
    });
    expect(thirdOption).toBeInTheDocument();

    const fourthOption = screen.queryByRole("option", {
      name: /Fourth/i,
    });
    expect(fourthOption).toBeNull();
  });

  it("should show two spot options if spot list has one items", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "PR",
        playerArray: [
          {
            id: "ad271761-2a94-4591-98b0-ac42322807a4",
            name: "Lee Harvey",
          },
        ],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /PR/i });
    await user.click(positionOptions);

    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);
    const starterOption = screen.getByRole("option", {
      name: /Starter/i,
    });
    expect(starterOption).toBeInTheDocument();

    const secondOption = screen.getByRole("option", {
      name: /Second/i,
    });

    expect(secondOption).toBeInTheDocument();
    const thirdOption = screen.queryByRole("option", {
      name: /Third/i,
    });
    expect(thirdOption).toBeNull();

    const fourthOption = screen.queryByRole("option", {
      name: /Fourth/i,
    });
    expect(fourthOption).toBeNull();
  });

  it("should show only one spot option if spot list has no items", async () => {
    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "PR",
        playerArray: [],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /PR/i });
    await user.click(positionOptions);

    const spotSelect = screen.getByLabelText(/select spot/i);
    await user.click(spotSelect);
    const starterOption = screen.getByRole("option", {
      name: /Starter/i,
    });

    expect(starterOption).toBeInTheDocument();
    const secondOption = screen.queryByRole("option", {
      name: /Second/i,
    });
    expect(secondOption).toBeNull();

    const thirdOption = screen.queryByRole("option", {
      name: /Third/i,
    });
    expect(thirdOption).toBeNull();

    const fourthOption = screen.queryByRole("option", {
      name: /Fourth/i,
    });
    expect(fourthOption).toBeNull();
  });

  it("should hide player if player is already in the spot list", async () => {
    mockUseGetPlayers.mockReturnValue([
      { id: "1", name: "Player One" },
      { id: "2", name: "Player Two" },
      { id: "3", name: "Player Three" },
      { id: "4", name: "Player Four" },
    ]);

    const mockAddPlayerToGame = vitest.fn();
    const user = userEvent.setup();
    const mockGameData = [
      {
        position: "QB",
        playerArray: [{ id: "1", name: "Player One" }],
      },
    ];
    render(
      <AddPlayerToGameForm
        gameType={GameType.NFL}
        addPlayerToGame={mockAddPlayerToGame}
        gameData={mockGameData}
      />
    );

    const positionSelect = screen.getByLabelText(/select position/i);
    await user.click(positionSelect);
    const positionOptions = screen.getByRole("option", { name: /QB/i });
    await user.click(positionOptions);

    const playerSelect = screen.getByLabelText(/select player/i);
    await user.click(playerSelect);
    const playerOneOption = screen.queryByRole("option", {
      name: /Player One/i,
    });
    expect(playerOneOption).toBeNull();

    const playerTwoOption = screen.getByRole("option", {
      name: /Player Two/i,
    });
    expect(playerTwoOption).toBeInTheDocument();

    const playerThreeOption = screen.getByRole("option", {
      name: /Player Three/i,
    });
    expect(playerThreeOption).toBeInTheDocument();

    const playerFourOption = screen.getByRole("option", {
      name: /Player Four/i,
    });
    expect(playerFourOption).toBeInTheDocument();
  });
});
