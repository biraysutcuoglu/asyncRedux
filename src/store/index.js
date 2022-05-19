import cartReducer from './cartSlice';
import uiReducer from './uiSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {ui: uiReducer, cart: cartReducer}
});

export default store;
