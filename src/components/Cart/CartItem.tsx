import React, { useContext } from "react";
import { MealInterface } from "../../../types";
import { CartContext } from "../../state/context/cart-context";
import classes from "./CartItem.module.css";

interface CartItemProps {
  item: MealInterface;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addItem, removeItem } = useContext(CartContext);

  const onRemove = () => {
    removeItem(item.id);
  };

  const onAdd = () => {
    addItem({ ...item, amount: 1 });
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${item.price.toFixed(2)}`}</span>
          <span className={classes.amount}>x {item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
