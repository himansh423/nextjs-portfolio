import { createSlice } from "@reduxjs/toolkit";
interface AdminLoginState {
  adminEmail?: string;
  message?: string;
}

const initialState: AdminLoginState = {
  adminEmail: "",
  message: "",
};
const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setAdminEmail: (state, action) => {
      state.adminEmail = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const adminLoginActions = adminLoginSlice.actions;
export default adminLoginSlice;
