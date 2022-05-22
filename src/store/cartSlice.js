import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialCartState = { items: [], itemCounter: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
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
          name: newitem.title,
        }); //must only used with redux toolkit(to prevent mutable states)
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newitem.price;
      }
    },
    removeFromCart(state, action) {
      const removedId = action.payload; //payload is the id
      const removedItem = state.items.find((item) => item.id === removedId);
      state.itemCounter--;
      if (removedItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removedId); //overrides the items array
      } else {
        removedItem.quantity--;
        removedItem.totalPrice -= removedItem.price;
      }
    },
  },
});

//action creator
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://food-order-app-37cbd-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success.",
          message: "Cart data sent successfully...",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!",
        })
      );
    }
  };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
