import { createSlice } from "@reduxjs/toolkit";

interface HomeHeroState {
  picture: string | null; // Change this to allow null
}

const initialState: HomeHeroState = {
  picture: null, // Change this from "" to null
};

const homeHeroSlice = createSlice({
  name: "homeHero",
  initialState,
  reducers: {
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
  },
});

export const homeHeroActions = homeHeroSlice.actions;
export default homeHeroSlice;