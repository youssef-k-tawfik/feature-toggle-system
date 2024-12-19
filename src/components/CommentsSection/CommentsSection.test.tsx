import { render, screen } from "@testing-library/react";
import CommentsSection from "./CommentsSection";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  mockStore,
  features,
  comments,
} from "@/redux/mockStore";

const renderWithProvider = (
  ui: React.ReactElement,
  store: ReturnType<typeof configureStore> = mockStore
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Comments Section component", () => {
  it("renders comments", () => {
    renderWithProvider(<CommentsSection />);
    expect(screen.getByText("Welcome to the team!")).toBeInTheDocument();
    expect(screen.getByText("Party time, Yaaaaaaaaay!")).toBeInTheDocument();
  });

  it("renders NewCommentInput when comment feature is enabled", () => {
    // the mockStore comment feature is enabled by default
    renderWithProvider(<CommentsSection />);
    expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument();
  });

  it("does not render NewCommentInput when comment feature is disabled", () => {
    const mockStoreWithDisabledCommentFeature = configureStore({
      reducer: {
        systemFeatures: (
          state = {
            features: features.map((f) =>
              f.name === "comment" ? { ...f, enabled: false } : f
            ),
          }
        ) => state,
        post: (state = { comments }) => state,
      },
    });
    renderWithProvider(
      <CommentsSection />,
      mockStoreWithDisabledCommentFeature
    );
    expect(
      screen.queryByPlaceholderText("Add a comment...")
    ).not.toBeInTheDocument();
  });
});
