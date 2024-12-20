import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import FeaturesList from "./FeaturesList";
import { mockStore } from "@/redux/mockStore";
import "@testing-library/jest-dom";

describe("FeaturesList", () => {
  it("should list all provided features", () => {
    render(
      <Provider store={mockStore}>
        <FeaturesList />
      </Provider>
    );
 
    expect(screen.getByText("like")).toBeInTheDocument();
    expect(screen.getByText("comment")).toBeInTheDocument();
    expect(screen.getByText("share")).toBeInTheDocument();
  });
});
