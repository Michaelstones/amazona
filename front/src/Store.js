import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const ItemExist = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = ItemExist
        ? state.cart.cartItems.map((item) =>
            item._id === ItemExist._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGNIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_SIGNOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
};
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
