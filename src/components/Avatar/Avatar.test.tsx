import { render } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar component", () => {
  it("renders with the provided src", () => {
    const { getByAltText } = render(
      <Avatar src="https://example.com/avatar.jpg" />
    );
    const image = getByAltText("User Avatar");
    expect(image.getAttribute("src")).toBe("https://example.com/avatar.jpg");
  });

  it("renders with the default src when no src is provided", () => {
    const { getByAltText } = render(<Avatar />);
    const image = getByAltText("User Avatar");
    expect(image.getAttribute("src")).toBe(
      "https://wakaw.ca/wp-content/uploads/2020/11/facebook-default-no-profile-pic-300x300-1.jpg"
    );
  });
});
