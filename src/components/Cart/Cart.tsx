import axios from "axios";
import React, { useContext, useState } from "react";
import { UserDataInterface } from "../../../types";
import { CartContext } from "../../state/context/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

interface CartProps {
  onCloseCart: () => void;
}

const Cart: React.FC<CartProps> = ({ onCloseCart }) => {
  const { items, totalAmount, clearCart } = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: UserDataInterface) => {
    setIsSubmiting(true);
    const response = await axios.post(
      "https://food-order-app-udemy-23a1e-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      { user: userData, orderedItems: items }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    clearCart();
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

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button onClick={onCloseCart} className={classes["button"]}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCartClose={onCloseCart}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmittingModalContent}
      {didSubmit && !isSubmiting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
