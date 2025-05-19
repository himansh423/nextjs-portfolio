import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  tab: string;
  IsMobNav:boolean;
}

const initialState: NavbarState = {
  tab: "/",
  IsMobNav:false,
};
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setIsMobNav:(state,action) => {
      state.IsMobNav = action.payload
    }
  },
});

export const navbarActions = navbarSlice.actions;

export default navbarSlice;
