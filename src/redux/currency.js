import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: { label: "USD", symbol: "$" },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      return { ...state, selectedCurrency: action.payload };
    },
  },
});

export { currencySlice };
