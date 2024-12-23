import { screen, fireEvent } from "@testing-library/react";
import DeleteController from "./DeleteController";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import "@testing-library/jest-dom";

describe("DeleteController", () => {
  it("should open and close the delete modal", () => {
    renderWithProvider(<DeleteController />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Deleting features")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-delete-modal");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Deleting features")).not.toBeInTheDocument();
  });

  it("should show confirmation message when deleting features", () => {
    renderWithProvider(<DeleteController />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    const featureCheckbox = screen.getByLabelText(/like/i);
    fireEvent.click(featureCheckbox);

    const modalDeleteButton = screen.getAllByText("Delete")[1];
    fireEvent.click(modalDeleteButton);

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should close the modal after confirming deletion", () => {
    renderWithProvider(<DeleteController />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    const featureCheckbox = screen.getByLabelText(/like/i);
    fireEvent.click(featureCheckbox);

    const modalDeleteButton = screen.getAllByText("Delete")[1];
    fireEvent.click(modalDeleteButton);

    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);

    expect(screen.queryByText("Deleting features")).not.toBeInTheDocument();
  });
});
