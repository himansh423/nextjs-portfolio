import { configureStore } from "@reduxjs/toolkit";
import homeAboutSlice from "./homeAboutSlice";
import homeMySiteSlice from "./homeMySiteSlice";
import aboutMoreSlice from "./aboutMoreSlice";

export const store = configureStore({
  reducer: {
    homeAbout: homeAboutSlice.reducer,
    homeMySite: homeMySiteSlice.reducer,
    aboutMore: aboutMoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
