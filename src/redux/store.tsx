import { configureStore } from "@reduxjs/toolkit";
import homeAboutSlice from "./homeAboutSlice";
import homeMySiteSlice from "./homeMySiteSlice";
import aboutMoreSlice from "./aboutMoreSlice";
import navbarSlice from "./navbarSlice";
import adminLoginSlice from "./AdminLoginSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";
import resetPasswordSlice from "./ResetPasswordSlice";
import loggedInSlice from "./LoggedInSlice";
import homeHeroSlice from "./homeHeroSlice";
import subscribeSlice from "./subscribeSlice";

export const store = configureStore({
  reducer: {
    homeAbout: homeAboutSlice.reducer,
    homeMySite: homeMySiteSlice.reducer,
    aboutMore: aboutMoreSlice.reducer,
    navbar: navbarSlice.reducer,
    adminLogin: adminLoginSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    loggedIn: loggedInSlice.reducer,
    homeHero: homeHeroSlice.reducer,
    subscribe: subscribeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
