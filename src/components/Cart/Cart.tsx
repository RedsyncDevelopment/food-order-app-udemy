import React, { useContext, useState } from "react";
import { CartContext } from "../../state/context/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

interface CartProps {
  onCloseCart: () => void;
}

const Cart: React.FC<CartProps> = ({ onCloseCart }) => {
  const { items, totalAmount } = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={onCloseCart} className={classes["button--alt"]}>
        Close
      </button>
      {items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

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
      {isCheckout && <Checkout onCancel={onCloseCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
