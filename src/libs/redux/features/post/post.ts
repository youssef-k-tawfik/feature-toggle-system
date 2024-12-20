import CommentType from "@/types/commentType";
import { createSlice } from "@reduxjs/toolkit";
import { comments as mockComments } from "../../mockStore";

interface PostState {
  liked: boolean;
  likesCount: number;
  commentsCount: number;
  comments: CommentType[];
  sharesCount: number;
}

// Using dummy data for preview
const initialState: PostState = {
  liked: false,
  likesCount: 2,
  commentsCount: 2,
  comments: mockComments,
  sharesCount: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    togglePostLike(state) {
      state.liked = !state.liked;
      state.likesCount += state.liked ? 1 : -1;
    },
  },
});

export const { togglePostLike } = postSlice.actions;

export default postSlice.reducer;
