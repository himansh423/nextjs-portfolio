import { createSlice } from "@reduxjs/toolkit";

interface HomeAboutState {
  isAboutHovering: boolean;
}

const initialState: HomeAboutState = {
  isAboutHovering: false,
};

const homeAboutSlice = createSlice({
  name: "homeAbout",
  initialState,
  reducers: {
    setIsAboutHovering: (state, action) => {
      state.isAboutHovering = action.payload;
    },
  },
});

export const homeAboutActions = homeAboutSlice.actions;

export default homeAboutSlice;
