import { configureStore } from "@reduxjs/toolkit";
import homeAboutSlice from "./homeAboutSlice";

export const store = configureStore({
  reducer: {
    homeAbout: homeAboutSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
