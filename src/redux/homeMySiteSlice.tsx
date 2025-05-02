import { createSlice } from "@reduxjs/toolkit";

interface HomeMySiteState {
  isChangelogBoxHovering: boolean;
  isMusicBoxHovering: boolean;
}

const initialState: HomeMySiteState = {
  isChangelogBoxHovering: false,
  isMusicBoxHovering: false,
};

const homeMySiteSlice = createSlice({
  name: "homeMySite",
  initialState,
  reducers: {
    setIsChangeLogBoxHovering: (state, action) => {
      state.isChangelogBoxHovering = action.payload;
    },
    setIsMusicBoxHovering: (state, action) => {
      state.isMusicBoxHovering = action.payload;
    },
  },
});

export const homeMySiteActions = homeMySiteSlice.actions;
export default homeMySiteSlice;
