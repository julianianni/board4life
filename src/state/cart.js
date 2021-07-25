import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getCart = createAsyncThunk("getCart", (id, thunkAPI) => {
  const { user } = thunkAPI.getState();
  return axios
    .get(`http://localhost:3001/api/cart/${user.id}`)
    .then((res) => res.data)
    .then((cart) => cart[0])
    .catch((err) => console.log("error", err));
  
});

export const removeCart = createAction('removeCart');

export const addToCart = createAction("addToCart", (product) => {
  return {
    payload: product,
    quantity: product.quantity || 0,
  };
});

export const emptyCart = createAsyncThunk("emptyCart", (userId) => {
  return axios
    .delete(`http://localhost:3001/api/cart/vaciarcarrito`, {
      data: { userId },
    })
    .then((res) => res.data)
    .then((response) => {
      return response;
    });
});

export const deleteProducFromCart = createAsyncThunk(
  "deleteProducFromCart",
  (cart) => {
    return axios
      .delete(`http://localhost:3001/api/cart/remove`, {
        data: { userId: cart.userId, productid: cart.product.id },
      })
      .then((res) => res.data)
      .then((response) => {
        return response;
      });
  }
);

export const cartReducer = createReducer(initialState, {
  [getCart.fulfilled]: (state, action) => action.payload,
  [addToCart]: (state, action) => {
    state.Products.push(action.payload);
    return state;
  },
  [removeCart]: (state, action) => {return {}}
  // [deleteProducFromCart.fulfilled]: (state, action) => {
  //   console.log("Products actuales: ", state.Products);
  //   state.Products = [...state.Products].filter(!action.payload);
  //   return state;
  // },
});
