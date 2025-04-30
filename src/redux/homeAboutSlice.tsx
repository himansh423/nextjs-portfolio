import { createSlice } from "@reduxjs/toolkit";

interface HomeAboutState {
  isAboutHovering: boolean;
  isTechBoxHovering: boolean;
  isConnectionBoxHovering: boolean;
  isCallBoxHovering: boolean;
}

const initialState: HomeAboutState = {
  isAboutHovering: false,
  isTechBoxHovering: false,
  isConnectionBoxHovering: false,
  isCallBoxHovering: false,
};

const homeAboutSlice = createSlice({
  name: "homeAbout",
  initialState,
  reducers: {
    setIsAboutHovering: (state, action) => {
      state.isAboutHovering = action.payload;
    },
    setIsTechBoxHovering: (state, action) => {
      state.isTechBoxHovering = action.payload;
    },
    setIsConnectionBoxHovering: (state, action) => {
      state.isConnectionBoxHovering = action.payload;
    },
    setIsCallBoxHovering: (state, action) => {
      state.isCallBoxHovering = action.payload;
    },
  },
});

export const homeAboutActions = homeAboutSlice.actions;

export default homeAboutSlice;
