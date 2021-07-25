import { createReducer, createAction } from '@reduxjs/toolkit'

const initialState = {}

export const getUser = createAction('getUser');
export const removeUser = createAction('removeUser');

export const userReducer = createReducer(initialState, {
  [getUser]: (state, action) => action.payload,
  [removeUser]: (state, action) => {return {}}
})
