import { createSlice } from "@reduxjs/toolkit";
import { IAllBooksData } from "../types/booksTypes";

interface InitialStateProps {
  queryString: string;
  updatedBook: IAllBooksData | null;
  errorMessage: null | string;
  successMessage: null | string;
}

const initialState: InitialStateProps = {
  queryString: "",
  updatedBook: null,
  errorMessage: null,
  successMessage: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    updateQueryString: (state, action) => {
      state.queryString = action.payload;
    },
    setUpdatedBook: (state, action) => {
      state.updatedBook = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

export const {
  updateQueryString,
  setUpdatedBook,
  setErrorMessage,
  setSuccessMessage,
} = booksSlice.actions;
export default booksSlice.reducer;
