import { configureStore } from "@reduxjs/toolkit";
import homeAboutSlice from "./homeAboutSlice";
import homeMySiteSlice from "./homeMySiteSlice";
import aboutMoreSlice from "./aboutMoreSlice";
import navbarSlice from "./navbarSlice";

export const store = configureStore({
  reducer: {
    homeAbout: homeAboutSlice.reducer,
    homeMySite: homeMySiteSlice.reducer,
    aboutMore: aboutMoreSlice.reducer,
    navbar: navbarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
