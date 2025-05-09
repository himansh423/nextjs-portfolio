import { createSlice } from "@reduxjs/toolkit";

interface AboutMoreState {
  isMovieBoxEntered: boolean;
  isStatsBoxEntered: boolean;
  isExploringBoxEntered: boolean;
  isImageOneHovered: boolean;
  isImageTwoHovered: boolean;
  isImageThreeHovered: boolean;
  isImageFourHovered: boolean;
}

const initialState: AboutMoreState = {
  isMovieBoxEntered: false,
  isStatsBoxEntered: false,
  isExploringBoxEntered: false,
  isImageOneHovered: false,
  isImageTwoHovered: false,
  isImageThreeHovered: false,
  isImageFourHovered: false,
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
    setIsExploringBoxEntered: (state, action) => {
      state.isExploringBoxEntered = action.payload;
    },
    setIsImageOneHovered: (state, action) => {
      state.isImageOneHovered = action.payload;
    },
    setIsImageTwoHovered: (state, action) => {
      state.isImageTwoHovered = action.payload;
    },
    setIsImageThreeHovered: (state, action) => {
      state.isImageThreeHovered = action.payload;
    },
    setIsImageFourHovered: (state, action) => {
      state.isImageFourHovered = action.payload;
    },
  },
});

export const aboutMoreActions = aboutMoreSlice.actions;

export default aboutMoreSlice;
