import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockStore } from "@/libs/redux/mockStore";

export const renderWithProvider = (
  ui: React.ReactElement,
  store: ReturnType<typeof configureStore> = mockStore
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};
