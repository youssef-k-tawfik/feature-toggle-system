"use client";
import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
