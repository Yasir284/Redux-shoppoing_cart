import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";
import productSlice from "./products.slice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, product: productSlice.reducer },
});

export default store;
