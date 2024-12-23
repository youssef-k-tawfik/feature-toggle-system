import { screen } from "@testing-library/react";
import CommentsSection from "./CommentsSection";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { features, comments } from "@/libs/redux/mockStore";
import { FeatureType } from "@/types/featureType";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";

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
            features: features.map((f: FeatureType) =>
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
