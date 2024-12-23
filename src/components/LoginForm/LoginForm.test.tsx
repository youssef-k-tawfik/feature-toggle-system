import { screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import "@testing-library/jest-dom";

describe("LoginForm", () => {
  it("renders the login form", () => {
    renderWithProvider(<LoginForm />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("shows error message on invalid login", () => {
    renderWithProvider(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText(/as username and password/)
    ).toBeInTheDocument();
  });
});
