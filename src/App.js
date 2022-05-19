import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";

let initialLoading = true;

function App() {
  const cartIsShown = useSelector((state) => state.ui.cartIsShown);
  const notification = useSelector((state) => state.ui.notification);
  //whenever there is a state change, send db. request
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
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
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success.",
          message: "Cart data sent successfully...",
        })
      );
      const responseData = await response.json();
    };
    if(initialLoading){
      initialLoading = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data!",
        })
      );
    }); //to catch async. func. errors
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && !initialLoading && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {cartIsShown && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
