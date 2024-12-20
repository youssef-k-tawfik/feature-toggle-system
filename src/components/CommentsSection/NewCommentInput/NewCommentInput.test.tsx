import { render, screen } from "@testing-library/react";
import NewCommentInput from "./NewCommentInput";
import "@testing-library/jest-dom";

describe("NewCommentInput component", () => {
  it("renders correctly", () => {
    render(<NewCommentInput />);
    expect(screen.getByText("Signed-in username")).toBeInTheDocument();
  });

  it("renders Avatar component", () => {
    render(<NewCommentInput />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
