import { describe } from "node:test";
import postReducer, { togglePostLike } from "./post";
import { comments as mockComments } from "@/libs/redux/mockStore";

const initialState = {
  liked: false,
  likesCount: 2,
  commentsCount: 2,
  comments: mockComments,
  sharesCount: 0,
};

describe("Redux: postReducer", () => {
  it("should return the initial state", () => {
    const action = { type: "" };
    const newState = postReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle like button toggle", () => {
    const action = togglePostLike();
    const newState = postReducer(initialState, action);
    expect(newState.liked).toBe(true);
  });
});
