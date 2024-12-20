import { configureStore } from "@reduxjs/toolkit";
import systemFeaturesReducer from "./features/systemFeatures/systemFeatures";
import postReducer from "./features/post/post";
import userReducer from "./features/user/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    systemFeatures: systemFeaturesReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
