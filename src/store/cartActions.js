import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

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

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      //get request
      const response = await fetch(
        "https://food-order-app-37cbd-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetching cart data failed.");
      }
      const data = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          itemCounter: data.itemCounter,
        })
      );
      return data;
    };
    try {
      await fetchRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch cart data!",
        })
      );
    }
  };
};
