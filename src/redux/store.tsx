import { configureStore } from "@reduxjs/toolkit";
import homeAboutSlice from "./homeAboutSlice";
import homeMySiteSlice from "./homeMySiteSlice";

export const store = configureStore({
  reducer: {
    homeAbout: homeAboutSlice.reducer,
    homeMySite: homeMySiteSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
