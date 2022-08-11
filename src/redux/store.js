import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../redux/cart";
import { currencySlice } from "../redux/currency";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    currency: currencySlice.reducer,
  },
  devTools: true,
});
