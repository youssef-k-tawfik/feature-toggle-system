import { screen } from "@testing-library/react";
import FilteredFeatures from "./FilteredFeatures";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import "@testing-library/jest-dom";

describe("FilteredFeatures", () => {
  it("renders enabled features", () => {
    renderWithProvider(<FilteredFeatures enabled={true} />);

    expect(screen.getByText(/like/i)).toBeInTheDocument();
    expect(screen.queryByText(/comment/i)).toBeInTheDocument();
  });

  it("renders 'None' when no features match the filter", () => {
    renderWithProvider(<FilteredFeatures enabled={false} />);

    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
