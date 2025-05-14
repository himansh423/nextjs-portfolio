import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  tab: string;
}

const initialState: NavbarState = {
  tab: "/",
};
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const navbarActions = navbarSlice.actions;

export default navbarSlice;
