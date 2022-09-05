import React, { ReactNode, useReducer } from "react";
import {
  CartReducerAction,
  CartReducerState,
  MealInterface,
} from "../../../types";
import { CartContext, defaultState } from "./cart-context";

export enum CartActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

interface CartContextProviderProps {
  children: ReactNode;
}

const cartReducer = (
  state: CartReducerState,
  action: CartReducerAction
): CartReducerState => {
  const { type, payload } = action;

  switch (type) {
    case CartActionType.ADD: {
      const updatedTotalAmount =
        state.totalAmount + payload?.price * payload?.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem?.amount + payload?.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case CartActionType.REMOVE: {
      const existingCartItemRemove = state.items.findIndex(
        (item) => item.id === payload
      );
      const existingItem = state.items[existingCartItemRemove];
      const updatedAmount = state.totalAmount - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemRemove] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }

    default:
      return defaultState;
  }
};

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (item: MealInterface) => {
    dispatchCartAction({
      type: CartActionType.ADD,
      payload: item,
    });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({
      type: CartActionType.REMOVE,
      payload: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
