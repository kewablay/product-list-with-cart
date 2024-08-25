import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../models/product.model';
import { addToCart, clearCart, removeFromCart } from '../actions/cart.actions';
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

  const itemTotalPrice = state.cart.find(
    (singleCartItem) => cartItem.id === singleCartItem.id
  )?.itemTotalPrice || 0;

  return {
    ...state,
    cart: updatedCart,
    total: state.total - itemTotalPrice,  // Update total
  };
}

const clearCartItems = (state: CartState) => {
  localStorageService.removeItem('cart');
  return { ...state, cart: [], total: 0 };
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, addItemToCart),
  on(removeFromCart, removeItemFromCart),
  on(clearCart, clearCartItems)
);
