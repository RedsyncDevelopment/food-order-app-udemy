import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../state/context/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = ({ onClick }) => {
  const { items } = useContext(CartContext);
  const [btnIsHighlightet, setBtnIsHighlightet] = useState<boolean>(false);

  const btnClasses = `${classes.button} ${
    btnIsHighlightet ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlightet(true);
    const timerId = setTimeout(() => {
      setBtnIsHighlightet(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [items]);

  return (
    <button onClick={onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {items.reduce((currentNumber, item) => {
          return currentNumber + item.amount!;
        }, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
