import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import EditController from "./EditController";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("EditController", () => {
  it("should open edit modal on Edit button click", () => {
    renderWithProvider(<EditController />);
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Edit a feature")).toBeInTheDocument();
  });

  it("should close edit modal on close button click", () => {
    renderWithProvider(<EditController />);
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByTestId("close-edit-modal"));
    expect(screen.queryByText("Edit a feature")).not.toBeInTheDocument();
  });

  it("should switch to editing form on Edit button click", () => {
    renderWithProvider(<EditController />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.click(screen.getAllByText("Edit")[1]);
    expect(screen.getByPlaceholderText("feature name...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("feature description...")
    ).toBeInTheDocument();
  });
});
