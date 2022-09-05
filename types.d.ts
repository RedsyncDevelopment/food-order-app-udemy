import { CartActionType } from "./src/state/context/CartProvider";

export interface MealInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}

export interface CartReducerState {
  items: MealInterface[];
  totalAmount: number;
}

export interface AddToCartReducerAction {
  type: CartActionType.ADD;
  payload: MealInterface;
}

export interface RemoveFromCartReducerAction {
  type: CartActionType.REMOVE;
  payload: string;
}

// Combining 2 different Cart Reducer Actions
export type CartReducerAction =
  | AddToCartReducerAction
  | RemoveFromCartReducerAction;
