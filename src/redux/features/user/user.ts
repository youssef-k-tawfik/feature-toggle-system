"use client";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userToken: string | null;
}

const initialState: UserState = {
  userToken:
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      { payload: { username } }: { payload: { username: string } }
    ) => {
      state.userToken = username;
      localStorage.setItem("userToken", state.userToken);
    },
    logout: (state) => {
      state.userToken = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
