import { fireEvent, screen } from "@testing-library/react";
import SettingsButton from "./SettingsFixedButton";
import "@testing-library/jest-dom";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";

describe("SettingsButton component", () => {
  it("renders the settings button", () => {
    renderWithProvider(<SettingsButton />);

    const button = screen.getByTestId("settings-button");
    expect(button).toBeInTheDocument();
  });

  it("shows the menu when the button is clicked", () => {
    renderWithProvider(<SettingsButton />);

    const button = screen.getByTestId("settings-button");
    fireEvent.click(button);

    const menu = screen.getByText("Features");
    expect(menu).toBeInTheDocument();
  });

  it("enables and disables features", () => {
    renderWithProvider(<SettingsButton />);

    const button = screen.getByTestId("settings-button");
    fireEvent.click(button);

    const featureCheckbox = screen.getByRole("checkbox", { name: /comment/i });
    fireEvent.click(featureCheckbox);
    expect(featureCheckbox.getAttribute("checked")).toEqual("");
  });
});
