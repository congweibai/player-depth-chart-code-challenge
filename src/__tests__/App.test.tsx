import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Player Depth Chart APP", () => {
  it("should soccer game type", () => {
    render(<App />);
    const gameButton = screen.getByRole("button", { name: /Soccer/i });
    expect(gameButton).toBeInTheDocument();
  });

  it("should NFL game type", () => {
    render(<App />);
    const gameButton = screen.getByRole("button", { name: /NFL/i });
    expect(gameButton).toBeInTheDocument();
  });
});
