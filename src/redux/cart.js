import { createSlice } from "@reduxjs/toolkit";
import compareObjects from "../helpers/compareObjects";

const initialState = {
  list: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let updatedList = [];

      const itemIndex = state.list.findIndex((el) => {
        return compareObjects(
          el.selectedAttributes,
          action.payload.selectedAttributes
        );
      });
      if (itemIndex !== -1) {
        updatedList = [
          ...state.list.slice(0, itemIndex),
          {
            ...state.list[itemIndex],
            quantity: state.list[itemIndex].quantity + 1,
          },
          ...state.list.slice(itemIndex + 1),
        ];
      } else {
        updatedList = [...state.list, action.payload];
      }

      return {
        ...state,
        list: updatedList,
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
  },
});

export { cartSlice };
