import { createSlice } from "@reduxjs/toolkit";

interface LoggedInState {
  isAdminLoggedIn: boolean;
  isUserLoggedIn: boolean;
}

const initialState: LoggedInState = {
  isAdminLoggedIn: false,
  isUserLoggedIn: false,
};
const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    setIsAdminLoggedIn: (state, action) => {
      state.isAdminLoggedIn = action.payload;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    resetLoggedInState: () => initialState,
  },
});


export const LoggedInActions = loggedInSlice.actions;
export default loggedInSlice
