import { createSlice } from "@reduxjs/toolkit";

interface HomeHeroState {
  picture: string | null;
  loading: boolean;
}

const initialState: HomeHeroState = {
  picture: null,
  loading: false,
};

const homeHeroSlice = createSlice({
  name: "homeHero",
  initialState,
  reducers: {
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const homeHeroActions = homeHeroSlice.actions;
export default homeHeroSlice;
