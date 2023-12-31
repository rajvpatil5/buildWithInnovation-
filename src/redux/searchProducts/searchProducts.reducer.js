import { createSlice } from '@reduxjs/toolkit';
import { createContext } from 'react';

// this is the actual value you want to access
export const SearchProductContext = createContext(
  // We have to pass here a default value of UserContext
  {
    searchProducts: null,
    setSearchProducts: () => null,
  }
);

const INITIAL_STATE = { searchProducts: null };

export const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchProducts(state, action) {
      state.searchProducts = action.payload;
    },
  },
});

export const { setSearchProducts } = searchProductsSlice.actions;

export const searchProductReducer = searchProductsSlice.reducer;
