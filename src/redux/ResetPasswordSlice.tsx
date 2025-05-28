import { createSlice } from "@reduxjs/toolkit";

interface ResetPasswordState {
  isShowModal?: boolean;
}

const initialState: ResetPasswordState = {
  isShowModal: false,
};
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
    },
  },
});


export const resetPasswordActions = resetPasswordSlice.actions;
export default resetPasswordSlice;
