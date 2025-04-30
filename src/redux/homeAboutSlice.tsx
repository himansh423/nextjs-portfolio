import { createSlice } from "@reduxjs/toolkit";

interface HomeAboutState {
  isAboutHovering: boolean;
  isTechBoxHovering: boolean;
}

const initialState: HomeAboutState = {
  isAboutHovering: false,
  isTechBoxHovering: false,
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
  },
});

export const homeAboutActions = homeAboutSlice.actions;

export default homeAboutSlice;
