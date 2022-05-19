import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart); //entire cart
  const { title, price, description, id } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const newtotalQuantity = cart.itemCounter + 1; //create a new constant to avoid mutating

    const updatedItems = cart.items.slice(); //create copy of the slice to avoid mutating
    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem }; //new object + exisiting properties
      updatedItem.quantity++;
      updatedItem.price = updatedItem.price + price;
      const existingItemIndex = updatedItems.find((item) => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      //push brand new object
      updatedItems.push({
        id,
        price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }
    const newCart = { itemCounter: newtotalQuantity, items: updatedItems };
    dispatch(cartActions.replaceCart(newCart));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
