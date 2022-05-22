import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cartSlice";


let initialLoading = true;

function App() {
  const cartIsShown = useSelector((state) => state.ui.cartIsShown);
  const notification = useSelector((state) => state.ui.notification);
  //whenever there is a state change, send db. request
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
      if(initialLoading){
        initialLoading = false;
        return;
      }
      dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && !initialLoading && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsShown && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
