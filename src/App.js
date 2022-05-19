import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cartIsShown = useSelector((state) => state.ui.cartIsShown);
  //whenever there is a state change, send db. request
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch('https://food-order-app-37cbd-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {cartIsShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
