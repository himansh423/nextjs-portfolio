import { createSlice } from "@reduxjs/toolkit";

interface HomeMySiteState {
  isChangelogBoxHovering: boolean;
}

const initialState: HomeMySiteState = {
  isChangelogBoxHovering: false,
};

const homeMySiteSlice = createSlice({
  name: "homeMySite",
  initialState,
  reducers: {
    setIsChangeLogBoxHovering: (state, action) => {
      state.isChangelogBoxHovering = action.payload;
    },
  },
});

export const homeMySiteActions = homeMySiteSlice.actions;
export default homeMySiteSlice;
