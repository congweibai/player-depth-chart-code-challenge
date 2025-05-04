import { render, screen } from "@testing-library/react";
import { DepthChartTable } from "../DepthChartTable";
import { PlayerPositionLabel, DepthChartTableProps } from "../types";
import { userEvent } from "@testing-library/user-event";

const mockProps: Pick<DepthChartTableProps, "spotLabels" | "rows"> = {
  spotLabels: [
    PlayerPositionLabel.Starter,
    PlayerPositionLabel.Second,
    PlayerPositionLabel.Third,
    PlayerPositionLabel.Fourth,
  ],
  rows: [
    {
      position: "QB",
      playerArray: [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ],
    },
    {
      position: "RB",
      playerArray: [
        { id: "3", name: "Mike Ross" },
        { id: "4", name: "Harvey Specter" },
        { id: "5", name: "Rachel Zane" },
        { id: "6", name: "Donna Paulsen" },
      ],
    },
  ],
};

describe("DepthChartTable", () => {
  it("should render the header labels", () => {
    render(<DepthChartTable {...mockProps} handleRemovePlayer={vitest.fn()} />);

    mockProps.spotLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("should render each position label", () => {
    render(<DepthChartTable {...mockProps} handleRemovePlayer={vitest.fn()} />);

    expect(screen.getByText("QB")).toBeInTheDocument();
    expect(screen.getByText("RB")).toBeInTheDocument();
  });

  it("should render player names", () => {
    render(<DepthChartTable {...mockProps} handleRemovePlayer={vitest.fn()} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Mike Ross")).toBeInTheDocument();
    expect(screen.getByText("Donna Paulsen")).toBeInTheDocument();
  });

  it("should render fallback '-' for missing players", () => {
    render(<DepthChartTable {...mockProps} handleRemovePlayer={vitest.fn()} />);

    // QB row has only 2 players, should have 2 "-"
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });

  it("should render player names with delete icon", () => {
    render(<DepthChartTable {...mockProps} handleRemovePlayer={vitest.fn()} />);

    const deleteIcons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteIcons.length).toBeGreaterThanOrEqual(4);
  });

  it("should show confirmation modal after delete icon is clicked and call handleRemovePlayer when confirm button is clicked", async () => {
    const handleRemovePlayer = vitest.fn();
    const user = userEvent.setup();
    render(
      <DepthChartTable {...mockProps} handleRemovePlayer={handleRemovePlayer} />
    );

    const deleteIcons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteIcons[0]);
    const confirmButton = screen.getByRole("button", { name: /yes/i });
    await user.click(confirmButton);
    expect(handleRemovePlayer).toHaveBeenCalledWith(0, "QB");
  });

  it("should not call handleRemovePlayer after delete icon is clicked and cancel button is clicked", async () => {
    const handleRemovePlayer = vitest.fn();
    const user = userEvent.setup();
    render(
      <DepthChartTable {...mockProps} handleRemovePlayer={handleRemovePlayer} />
    );

    const deleteIcons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteIcons[0]);
    const confirmButton = screen.getByRole("button", { name: /no/i });
    await user.click(confirmButton);
    expect(handleRemovePlayer).not.toHaveBeenCalled();
  });
});
