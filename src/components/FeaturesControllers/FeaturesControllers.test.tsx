import { screen } from "@testing-library/react";
import FeaturesControllers from "./FeaturesControllers";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import "@testing-library/jest-dom";

describe("FeaturesControl", () => {
  test("renders AddController, DeleteController, and EditController", () => {
    renderWithProvider(<FeaturesControllers />);

    expect(screen.getByText(/Add/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });
});
