import React, { useContext } from "react";
import { CartContext } from "../../state/context/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

interface CartProps {
  onCloseCart: () => void;
}

const Cart: React.FC<CartProps> = ({ onCloseCart }) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

  return (
    <Modal onCartClose={onCloseCart}>
      <ul className={classes["cart-items"]}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={onCloseCart} className={classes["button--alt"]}>
          Close
        </button>
        {items.length > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
