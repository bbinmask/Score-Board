"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { matchStore } from "./index";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = matchStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
