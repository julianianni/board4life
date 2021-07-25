import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = 0;

export const counterProducts = createAction(
  "counterProducts"
  //   (sizeProducts) => sizeProducts
);

export const counterReducer = createReducer(initialState, {
  [counterProducts]: (state, action) => action.payload,
});
