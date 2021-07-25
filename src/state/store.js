import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { userReducer } from "./user";
import { productsReducer } from "./products";
import { counterReducer } from "./Counter";

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    query: productsReducer,
    counter: counterReducer,
  },
});
