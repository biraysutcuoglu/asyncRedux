import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsShown: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsShown = !state.cartIsShown;
      console.log(state.cartIsShown);
    },
    showNotification(state, action) {
      state.notification = {
        statusKey: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
      
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
