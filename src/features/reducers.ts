import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { booksApi } from "./api/booksApi";
import booksSlice from "./booksSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
  booksSlice: booksSlice,
});

export default rootReducer;
