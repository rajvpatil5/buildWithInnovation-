import { createSlice } from '@reduxjs/toolkit';

const removeCartItem = (cartItems, productToRemove) => {
  console.log('Removing item');
  // find if cartitem contains products to remove
  const indexToRemove = cartItems.findIndex((item) => item.id === productToRemove.id);

  // if found remove this item
  if (indexToRemove !== -1) {
    const newCartItems = [...cartItems];
    newCartItems.splice(indexToRemove, 1);
    return newCartItems;
  }
  return cartItems;
};

const addCartItem = (cartItems, productToAdd) => {
  // find if cartitem contains products to add
  const foundItem = cartItems.find((item) => item.id === productToAdd.id);
  // if found increase quantity
  if (foundItem) {
    return cartItems.map((item) => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
  }
  // if not - return new array with modified cart item / new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CART_INITIAL_STATE = {
  cartHidden: true,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    removeItemToCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
  },
});

export const { removeItemToCart } = cartSlice.actions;
export const { addItemToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
