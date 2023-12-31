import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartCount = createSelector([selectCartReducer], (newCartItems) =>
  newCartItems.cartItems.reduce((acc, ele) => {
    return acc + ele.quantity;
  }, 0)
);
