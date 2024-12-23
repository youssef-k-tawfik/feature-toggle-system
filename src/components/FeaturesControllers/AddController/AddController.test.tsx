import { screen, fireEvent } from "@testing-library/react";
import AddController from "./AddController";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import "@testing-library/jest-dom";

describe("AddController", () => {
  it("should render Add button", () => {
    renderWithProvider(<AddController />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should open modal on Add button click", () => {
    renderWithProvider(<AddController />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Adding new feature")).toBeInTheDocument();
  });
});
