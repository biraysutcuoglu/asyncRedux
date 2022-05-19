import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], itemCounter: 0};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state,action){
      state.itemCounter = action.payload.itemCounter;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find((item) => item.id === newitem.id);
      state.itemCounter++;
      if (!existingItem) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name: newitem.title
        }); //must only used with redux toolkit(to prevent mutable states)
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newitem.price;
      }
    },
    removeFromCart(state, action){
      const removedId = action.payload; //payload is the id
      const removedItem = state.items.find((item) => item.id === removedId);
      state.itemCounter--;
      if(removedItem.quantity === 1){
        state.items = state.items.filter(item => item.id !== removedId); //overrides the items array
      }else{
        removedItem.quantity--;
        removedItem.totalPrice -= removedItem.price;
      }
    }
  },
});
export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
