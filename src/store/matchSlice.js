import { createSlice } from "@reduxjs/toolkit";

export const matchSlice = createSlice({
  name: "teams",
  initialState: {
    teamFirst: [],
    teamSecond: [],
  },
  reducers: {
    setTeamFirst: (state, action) => {
      state.teamFirst = action.payload;
    },
    setTeamSecond: (state, action) => {
      state.teamSecond = action.payload;
    },
  },
});

export const { setTeamFirst, setTeamSecond } = matchSlice.actions;

export default matchSlice.reducer;
