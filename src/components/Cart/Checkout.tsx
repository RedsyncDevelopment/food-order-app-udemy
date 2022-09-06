import React, { ReactNode } from "react";
import classes from "./Checkout.module.css";

interface CheckoutProps {
  children?: ReactNode;
  onCancel: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ children, onCancel }) => {
  const confirmHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ordering");
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city"></input>
      </div>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default Checkout;
