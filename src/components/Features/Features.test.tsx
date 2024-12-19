import { render, screen } from "@testing-library/react";
import Features from "./Features";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { mockStore, features, comments } from "@/redux/mockStore";

const renderWithProvider = (
  ui: React.ReactElement,
  store: ReturnType<typeof configureStore> = mockStore
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Features component", () => {
  it("renders all features", () => {
    renderWithProvider(<Features />);
    features?.forEach((feature) => {
      expect(screen.getByText(feature.name)).toBeInTheDocument();
    });
  });

  it("disables button when feature is not enabled", () => {
    const disabledFeatures = features?.map((f) => ({
      ...f,
      enabled: !f.enabled,
    }));
    const mockStoreWithDisabledFeatures = configureStore({
      reducer: {
        post: (state = { comments }) => state,
        systemFeatures: (state = { features: disabledFeatures }) => state,
      },
    });
    renderWithProvider(<Features />, mockStoreWithDisabledFeatures);
    disabledFeatures?.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeDisabled();
    });
  });

  // it("calls togglePostLike when like button is clicked", () => {
  //   renderWithProvider(<Features />);
  //   const likeButton = screen.getByText("like");
  //   fireEvent.click(likeButton);
  //   TODO: Add assertion to check if like button was clicked
  // });

  // it("calls focusInputComment when comment button is clicked", () => {
  //   renderWithProvider(<Features />);
  //   const commentButton = screen.getByText("comment");
  //   fireEvent.click(commentButton);
  //   TODO: Add assertion to check if focusInputComment was called
  // });

  // it("shows tooltip when share button is clicked", () => {
  //   renderWithProvider(<Features />);
  //   const shareButton = screen.getByText("share");
  //   fireEvent.click(shareButton);
  //   TODO: Add assertion to check if share was clicked
  // });

  // TODO: !!! element wasn't found in the DOM
  // it("hides tooltip after 2 seconds", () => {
  //   jest.useFakeTimers();
  //   renderWithProvider(<Features />);
  //   const shareButton = screen.getByText("share");
  //   fireEvent.click(shareButton);
  //   expect(screen.getByText("Copied!")).toBeInTheDocument();
  //   jest.advanceTimersByTime(2000);
  //   expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
  // });
});
