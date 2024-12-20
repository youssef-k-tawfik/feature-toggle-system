"use client";
import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";
import FetchInitialData from "@/components/FetchInitialData";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <FetchInitialData />
      {children}
    </Provider>
  );
};

export default StoreProvider;
