import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addProduct: () => {},
  removeProduct: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeAll: () => {},
});
