import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
  },

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          name: newItem.name,
          tinyImage: newItem.tinyImage,
          productColor: newItem.productColor,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity += 1;
    },

    removeItem(state, action) {
      const itemToRemove = state.itemsList.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove.quantity === 1) {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        itemToRemove.totalPrice -= itemToRemove.price;
        itemToRemove.quantity--;
      }
      state.totalQuantity--;
    },

    removeProduct(state, action) {
      state.totalQuantity -= state.itemsList.find(
        (item) => item.id === action.payload.id
      ).quantity;

      state.itemsList = state.itemsList.filter(
        (item) => item.id !== action.payload.id
      );
    },

    butProduct(state) {
      state.itemsList = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
