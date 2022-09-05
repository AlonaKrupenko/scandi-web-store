import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "../redux/cart";
import { currencySlice } from "../redux/currency";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  cart: cartSlice.reducer,
  currency: currencySlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

persistStore(store);
