import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const cartIsShown = useSelector(state => state.ui.cartIsShown);
  return (
    <Layout>
      {cartIsShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
