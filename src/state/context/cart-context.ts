import React from "react";
import { MealInterface } from "../../../types";

export interface CartContextInterface {
  items: MealInterface[];
  totalAmount: number;
  addItem: (item: MealInterface) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const defaultState: CartContextInterface = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
};

export const CartContext =
  React.createContext<CartContextInterface>(defaultState);
