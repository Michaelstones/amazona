import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
};
const initialState = {
  cart: {
    cartItems: [],
  },
};

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
