import React, { useContext } from "react";
import { CartContext } from "../../../state/context/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
interface MealItemProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

const MealItem: React.FC<MealItemProps> = ({
  name,
  description,
  price,
  id,
}) => {
  const formatedPrice = `$${price.toFixed(2)}`;
  const { addItem } = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    addItem({ id, description, name, price, amount });
  };

  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{name}</h3>
          <p className={classes.description}>{description}</p>
          <div className={classes.price}>{formatedPrice}</div>
        </div>
        <div>
          <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </>
  );
};

export default MealItem;
