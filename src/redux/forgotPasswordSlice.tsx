import { createSlice } from "@reduxjs/toolkit";
interface ForgotPasswordState {
  isShowModal: boolean;
}

const initialState: ForgotPasswordState = {
  isShowModal: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
    },
  },
});

export const forgotPasswordActions = forgotPasswordSlice.actions;
export default forgotPasswordSlice;
