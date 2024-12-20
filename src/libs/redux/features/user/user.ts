import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { parse, serialize } from "cookie";

interface UserState {
  userToken: string | null;
  isLoading?: boolean;
  isError?: string;
}

const initialState: UserState = {
  userToken:
    typeof window !== "undefined"
      ? parse(document.cookie).userToken || null
      : null,
};

export const login = createAsyncThunk(
  "user/login",
  async (
    { name, password }: { name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/login", {
        name,
        password,
      });
      const error = response.data.error;

      return error ? rejectWithValue(error) : response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userToken = null;
      document.cookie = serialize("userToken", "", {
        maxAge: -1,
        path: "/",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = "";
        state.userToken = parse(document.cookie).userToken || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = (action.payload as string) || "Login failed";
        state.userToken = null;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
