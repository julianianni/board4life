import { createReducer, createAction } from '@reduxjs/toolkit'

const initialState = ''

export const getQuery = createAction('getQuery');

export const productsReducer = createReducer(initialState, {
  [getQuery]: (state, action) => action.payload,
})
