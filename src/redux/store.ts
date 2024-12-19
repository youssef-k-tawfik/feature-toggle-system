import { configureStore } from "@reduxjs/toolkit";
import systemFeaturesReducer from "./features/systemFeatures/systemFeatures";
import postReducer from "./features/post/post";

const store = configureStore({
  reducer: { systemFeatures: systemFeaturesReducer, post: postReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
