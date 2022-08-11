import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../redux/cart";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  devTools: true,
});
