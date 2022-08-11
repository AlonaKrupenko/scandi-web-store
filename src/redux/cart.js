import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  count: 222,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    deleteItem: (state, action) => {
      const updatedArr = state.list.filter((el) => {
        return el.id !== action.payload;
      });

      return {
        ...state,
        list: updatedArr,
      };
    },

    changeQuantity: (state, action) => {
      const id = action.payload.id;
      const qnt = action.payload.quantity;

      const elemIndex = state.list.findIndex((el) => {
        return el.id === id;
      });

      const updatedList = [
        ...state.list.slice(0, elemIndex),
        { ...state.list[elemIndex], quantity: qnt },
        ...state.list.slice(elemIndex + 1),
      ];

      return {
        ...state,
        list: updatedList,
      };
    },

    changeAttributes: (state, action) => {
      const cartItemId = action.payload.cartItemId;
      const attributeId = action.payload.attributeId;
      const attributeValue = action.payload.attributeValue;

      const elemIndex = state.list.findIndex((el) => {
        return el.id === cartItemId;
      });

      const updatedEl = {
        ...state.list[elemIndex],
        selectedAttributes: {
          ...state.list[elemIndex].selectedAttributes,
          [attributeId]: attributeValue,
        },
      };

      const updatedList = [
        ...state.list.slice(0, elemIndex),
        updatedEl,
        ...state.list.slice(elemIndex + 1),
      ];

      return {
        ...state,
        list: updatedList,
      };
    },
  },
});

export { cartSlice };
