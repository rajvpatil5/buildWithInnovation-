import { combineReducers } from '@reduxjs/toolkit';
import { BWICoreApi } from './services/BWICore';
import { userReducer } from './user/user.reducer';
import { cartReducer } from './cart/cart.reducer';
import { allProductReducer } from './allProducts/allProducts.reducer';
import { searchProductReducer } from './searchProducts/searchProducts.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  allProducts: allProductReducer,
  searchProducts: searchProductReducer,
  [BWICoreApi.reducerPath]: BWICoreApi.reducer,
});
