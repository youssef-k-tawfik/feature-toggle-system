import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SettingsButton from "./SettingsFixedButton";
import { configureStore } from "@reduxjs/toolkit";
import { mockStore } from "@/redux/mockStore";
import "@testing-library/jest-dom";

const renderWithProvider = (
  ui: React.ReactElement,
  store: ReturnType<typeof configureStore> = mockStore
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

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
