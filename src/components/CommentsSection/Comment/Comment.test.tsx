import { render } from "@testing-library/react";
import Comment from "./Comment";
import { CommentType } from "@/types/commentType";

describe("Comment component", () => {
  const mockComment: CommentType = {
    id: 1,
    avatarSrc: "https://example.com/avatar.jpg",
    userProfileSrc: "https://example.com/user",
    username: "test_user",
    text: "This is a test comment",
  };

  it("renders the avatar with the correct src", () => {
    const { getByAltText } = render(<Comment comment={mockComment} />);
    const avatar = getByAltText("User Avatar");
    expect(avatar.getAttribute("src")).toBe(mockComment.avatarSrc);
  });

  it("renders the username with the correct link", () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    const usernameLink = getByText(mockComment.username);
    expect(usernameLink.getAttribute("href")).toBe(mockComment.userProfileSrc);
  });

  it("renders the comment text", () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    const commentText = getByText(mockComment.text);
    expect(commentText.textContent).toBe(mockComment.text);
  });
});
