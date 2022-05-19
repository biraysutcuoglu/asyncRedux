import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsShown: false },
  reducers: {
    toggle(state) {
      state.cartIsShown = !state.cartIsShown;
      console.log(state.cartIsShown);
    }
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
