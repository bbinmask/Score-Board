import { configureStore } from "@reduxjs/toolkit";

import { matchSlice } from "@/store/matchSlice";
import { currentMatchSlice } from "@/store/currentMatch";
import { checkSlice } from "./checkSlice";
export const matchStore = () => {
  return configureStore({
    reducer: {
      teams: matchSlice.reducer,
      currentMatch: currentMatchSlice.reducer,
      check: checkSlice.reducer,
    },
  });
};
