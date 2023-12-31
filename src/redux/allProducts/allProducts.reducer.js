import { createSlice } from '@reduxjs/toolkit';
import { createContext } from 'react';

// this is the actual value you want to access
export const AllProductContext = createContext(
  // We have to pass here a default value of UserContext
  {
    allProducts: null,
    setAllProducts: () => null,
  }
);

const INITIAL_STATE = { allProducts: null };

export const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState: INITIAL_STATE,
  reducers: {
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
  },
});

export const { setAllProducts } = allProductsSlice.actions;

export const allProductReducer = allProductsSlice.reducer;
