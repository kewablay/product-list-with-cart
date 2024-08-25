import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../models/product.model';
import {
  addToCart,
  clearCart,
  decreaseItemQuantity,
  removeFromCart,
} from '../actions/cart.actions';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';

export interface CartState {
  cart: CartItem[];
  total: number;
}

const localStorageService = new LocalStorageService();

export const initialState: CartState = {
  cart: localStorageService.getItem('cart') || [],
  total: localStorageService.getItem('cartTotal') || 0,
};

const addItemToCart = (
  state: CartState,
  { cartItem }: { cartItem: CartItem }
) => {
  // get the item index
  const itemIndex = state.cart.findIndex(
    (singleCartItem) => singleCartItem.id === cartItem.id
  );
  let newTotal = state.total + cartItem.price;

  // if item does not exist then add the item to cart
  if (itemIndex === -1) {
    return {
      ...state,
      cart: [...state.cart, cartItem],
      total: newTotal,
    };
  } else {
    // else increment the quantity and total price of the item in cart
    const updatedItem = {
      ...state.cart[itemIndex],
      quantity: state.cart[itemIndex].quantity + 1,
      itemTotalPrice: state.cart[itemIndex].itemTotalPrice + cartItem.price,
    };
    return {
      ...state,
      cart: state.cart.map((singleCartItem, index) =>
        index === itemIndex ? updatedItem : singleCartItem
      ),
      total: newTotal,
    };
  }
};

const removeItemFromCart = (
  state: CartState,
  { cartItem }: { cartItem: CartItem }
) => {
  const updatedCart = state.cart.filter(
    (singleCartItem) => cartItem.id !== singleCartItem.id
  );

  const itemTotalPrice =
    state.cart.find((singleCartItem) => cartItem.id === singleCartItem.id)
      ?.itemTotalPrice || 0;

  return {
    ...state,
    cart: updatedCart,
    total: state.total - itemTotalPrice, // Update total
  };
};

const decreaseCartItemQuantity = (
  state: CartState,
  {productName}: {productName: string}
) => {
  // Find the item in the cart

  const item = state.cart.find((singleCartItem) => singleCartItem.name === productName)
  console.log("Decreasing quantity of :", item)

  // If the item is not found in the cart, return the current state
  if (!item) {
    return state;
  }

  // If the quantity is 1, remove the item from the cart
  if (item.quantity === 1) {
    const updatedCart = state.cart.filter(
      (singleCartItem) => singleCartItem.name !== item.name
    );

    return {
      ...state,
      cart: updatedCart,
      total: state.total - item.itemTotalPrice,
    };
  } else {
    // Decrease the quantity and update the total price
    const updatedItem = {
      ...item,
      quantity: item.quantity - 1,
      itemTotalPrice: item.itemTotalPrice - item.price,
    };

    return {
      ...state,
      cart: state.cart.map((singleCartItem) =>
        singleCartItem.name === productName ? updatedItem : singleCartItem
      ),
      total: state.total - item.price,
    };
  }
};



const clearCartItems = (state: CartState) => {
  localStorageService.removeItem('cart');
  return { ...state, cart: [], total: 0 };
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, addItemToCart),
  on(removeFromCart, removeItemFromCart),
  on(clearCart, clearCartItems),
  on(decreaseItemQuantity, decreaseCartItemQuantity), 
);
