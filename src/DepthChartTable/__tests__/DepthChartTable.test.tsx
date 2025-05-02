import { render, screen } from "@testing-library/react";
import { DepthChartTable } from "../DepthChartTable";
import { PlayerPositionLabel, DepthChartTableProps } from "../types";

const mockProps: DepthChartTableProps = {
  positionLabels: [
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
    render(<DepthChartTable {...mockProps} />);

    mockProps.positionLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("should render each position label", () => {
    render(<DepthChartTable {...mockProps} />);

    expect(screen.getByText("QB")).toBeInTheDocument();
    expect(screen.getByText("RB")).toBeInTheDocument();
  });

  it("should render player names", () => {
    render(<DepthChartTable {...mockProps} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Mike Ross")).toBeInTheDocument();
    expect(screen.getByText("Donna Paulsen")).toBeInTheDocument();
  });

  it("should render fallback '-' for missing players", () => {
    render(<DepthChartTable {...mockProps} />);

    // QB row has only 2 players, should have 2 "-"
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});
