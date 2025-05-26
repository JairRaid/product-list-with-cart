import React, { useReducer } from "react";
import { CartContext } from "../store/cart-context";

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddProduct(product) {
    cartDispatch({ type: "ADD_PRODUCT", payload: product });
  }

  function handleRemoveProduct(indexToRemove) {
    cartDispatch({ type: "REMOVE_PRODUCT", payload: indexToRemove });
  }

  function handleIncrementItemQuantity(productName) {
    cartDispatch({ type: "INCREMENT", payload: productName });
  }

  function handleDecrementItemQuantity(productName) {
    cartDispatch({ type: "DECREMENT", payload: productName });
  }

  function handleRemoveAll() {
    cartDispatch({ type: "REMOVE_ALL" });
  }

  const ctxValue = {
    items: cartState.items,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    incrementQuantity: handleIncrementItemQuantity,
    decrementQuantity: handleDecrementItemQuantity,
    removeAll: handleRemoveAll,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}

function cartReducer(state, action) {
  const { type, payload } = action;

  if (type === "ADD_PRODUCT") {
    // if (state.items.some((item) => item.name === payload.name))
    //   console.log("item exist");
    let updatedState = { ...state };
    updatedState = {
      items: [...updatedState.items, { ...payload, quantity: 1 }],
    };

    return updatedState;
  }

  if (type === "REMOVE_PRODUCT") {
    let updatedState = { ...state };
    updatedState.items.splice(Number(payload), 1);
    return updatedState;
  }

  if (type === "INCREMENT") {
    let updatedState = { ...state };
    updatedState.items.map((item) => {
      if (item.name === payload) {
        return { ...item, quantity: (item.quantity += 1) };
      }
    });

    return updatedState;
  }

  if (type === "DECREMENT") {
    let updatedState = { ...state };
    updatedState.items.map((item) => {
      if (item.name === payload) {
        return {
          ...item,
          quantity: item.quantity === 1 ? item.quantity : (item.quantity -= 1),
        };
      }
    });

    return updatedState;
  }

  if (type === "REMOVE_ALL") {
    let updatedState = { ...state };
    let newState = { ...updatedState, items: [] };

    return newState;
  }

  return state;
}
