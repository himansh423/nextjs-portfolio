import { createSlice } from "@reduxjs/toolkit";

interface SubscribeState {
  message: string | null;
}

const initialState: SubscribeState = {
  message: null,
};
const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    setMessage(state, action) {
      const { data } = action.payload;
      state.message = data;
    },
  },
});

export const subscribeAction = subscribeSlice.actions;
export default subscribeSlice;
