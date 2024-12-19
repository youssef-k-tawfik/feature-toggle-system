import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { Provider } from "react-redux";
import { mockStore } from "@/redux/mockStore";
import { configureStore } from "@reduxjs/toolkit";

const renderWithProvider = (
  ui: React.ReactElement,
  store: ReturnType<typeof configureStore> = mockStore
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Home component", () => {
  it("renders without crashing", () => {
    renderWithProvider(<Home />);
  });

  it("renders the avatars", () => {
    renderWithProvider(<Home />);
    const avatars = screen.getAllByRole("img", { name: /user avatar/i });
    expect(avatars.length).toEqual(4);
  });

  it("renders the link with a valid href", () => {
    renderWithProvider(<Home />);
    const link = screen.getByRole("link", { name: /youssef tawfik/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://www.linkedin.com/")
    );
  });

  it("renders the post time correctly", () => {
    renderWithProvider(<Home />);
    const postTime = screen.getByText(/\d+ (seconds|minutes|hours|days) ago/i);
    expect(postTime).toBeInTheDocument();
  });

  it("renders the post body with at least one character", () => {
    renderWithProvider(<Home />);
    const postBody = screen.getByTestId("post-body");
    expect(postBody).toBeInTheDocument();
    expect(postBody.textContent).toMatch(/.+/);
  });

  it("renders the post image", () => {
    renderWithProvider(<Home />);
    const postImage = screen.getByAltText("Post Image");
    expect(postImage).toBeInTheDocument();
  });

  it("renders the PostStatistics component", () => {
    renderWithProvider(<Home />);
    const likesStatistic = screen.getByText(/likes/i);
    expect(likesStatistic).toBeInTheDocument();
  });

  it("renders the Features component", () => {
    renderWithProvider(<Home />);
    const likeButtonFeature = screen.getByRole("button", { name: /like/i });
    expect(likeButtonFeature).toBeInTheDocument();
  });

  it("renders the SettingsButton component", () => {
    renderWithProvider(<Home />);
    const settingsButton = screen.getByTestId("settings-button");
    expect(settingsButton).toBeInTheDocument();
  });
});
