import { createSlice } from "@reduxjs/toolkit";

interface AboutMoreState {
  isMovieBoxEntered: boolean;
  isStatsBoxEntered:boolean;
}

const initialState: AboutMoreState = {
  isMovieBoxEntered: false,
  isStatsBoxEntered:false,
};
const aboutMoreSlice = createSlice({
  name: "aboutMoreSlice",
  initialState,
  reducers: {
    setIsMovieBoxEntered: (state, action) => {
      state.isMovieBoxEntered = action.payload;
    },
    setIsStatsBoxEntered: (state, action) => {
      state.isStatsBoxEntered = action.payload;
    },
  },
});

export const aboutMoreActions = aboutMoreSlice.actions;

export default aboutMoreSlice;
