import { renderWithProvider } from "@/utils/RenderWithProviderTestUtil";
import LogoutButton from "./LogoutButton";
import "@testing-library/jest-dom";
import { mockStore } from "@/libs/redux/mockStore";

describe("LogoutButton", () => {
  // Token is provided by default in mockStore.ts
  it("should render the button when token is provided", () => {
    const { container } = renderWithProvider(<LogoutButton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render nothing when userToken is null", () => {
    const mockStoreWithNullToken = {
      ...mockStore,
      initialState: {
        ...mockStore.getState(),
        user: {
          userToken: null,
        },
      },
    };

    const { container } = renderWithProvider(
      <LogoutButton />,
      mockStoreWithNullToken
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
