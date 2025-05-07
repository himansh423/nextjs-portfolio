import { createSlice } from "@reduxjs/toolkit";

interface AboutMoreState {
  isMovieBoxEntered: boolean;
}

const initialState: AboutMoreState = {
  isMovieBoxEntered: false,
};
const aboutMoreSlice = createSlice({
  name: "aboutMoreSlice",
  initialState,
  reducers: {
    setIsMovieBoxEntered: (state, action) => {
      state.isMovieBoxEntered = action.payload;
    },
  },
});

export const aboutMoreActions = aboutMoreSlice.actions;

export default aboutMoreSlice;
