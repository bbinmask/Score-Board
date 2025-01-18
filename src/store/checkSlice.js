import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
  name: "check",
  initialState: {
    isUserLoggedIn: false,
  },
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const { setUserLoggedIn } = checkSlice.actions;

export default checkSlice.reducer;
