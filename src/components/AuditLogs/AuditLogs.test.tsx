import { screen } from "@testing-library/react";
import AuditLogs from "./AuditLogs";
import "@testing-library/jest-dom";
import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";

describe("AuditLogs Component", () => {
  it("renders Audit Logs component", () => {
    renderWithProvider(<AuditLogs />);

    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });
});
